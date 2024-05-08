// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
extern crate winapi;
use winapi::um::winuser::{keybd_event, KEYEVENTF_KEYUP, VK_CONTROL};

mod payload;
use std::{fs, path::PathBuf, process::Command};
use tauri::{
    api::path::{resolve_path, BaseDirectory},
    CustomMenuItem, Env, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
};
use tauri_plugin_autostart::MacosLauncher;

fn get_snippet_data_path() -> PathBuf {
    let context: tauri::Context<tauri::utils::assets::EmbeddedAssets> =
        tauri::generate_context!("tauri.conf.json");
    let snippet_data_path = resolve_path(
        context.config(),
        context.package_info(),
        &Env::default(),
        "snippets",
        Some(BaseDirectory::AppData),
    )
    .expect("failed to resolve path");
    snippet_data_path
}
fn init_snippet_data_dir() {
    // create log file if not exists
    let binding = get_snippet_data_path();
    let data_dir = binding.to_str().unwrap();
    if let Err(_) = fs::read_dir(data_dir) {
        fs::create_dir_all(data_dir).expect("failed to create log file");
    }
}

#[tauri::command]
fn open_explore(path: String) {
    let _ = Command::new("explorer.exe").arg(path).spawn();
}

#[tauri::command]
fn ctrl_v() {
    unsafe {
        keybd_event(VK_CONTROL as u8, 0, 0, 0); // 按下Ctrl键
        keybd_event('V' as u8, 0, 0, 0); // 按下V键
        keybd_event('V' as u8, 0, KEYEVENTF_KEYUP, 0); // 释放V键
        keybd_event(VK_CONTROL as u8, 0, KEYEVENTF_KEYUP, 0); // 释放Ctrl键
    }
}

fn main() {
    let restart = CustomMenuItem::new("restart".to_string(), "重启");
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let tray_menu = SystemTrayMenu::new().add_item(restart).add_item(quit);
    let system_tray = SystemTray::new().with_menu(tray_menu);
    tauri::Builder::default()
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                let window = app.get_window("main").unwrap();
                if let Ok(e) = window.is_visible() {
                    if e {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                        let _ = window.emit(
                            "handle_show",
                            payload::Payload {
                                msg: "handle show ".to_string(),
                            },
                        );
                    }
                }
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "restart" => {
                    app.restart();
                }
                _ => {}
            },
            _ => {}
        })
        .plugin(tauri_plugin_fs_watch::init())
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec!["--flag1", "--flag2"]),
        ))
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .setup(|app| {
            init_snippet_data_dir();
            let window = app.get_window("main").unwrap();
            window.hide().unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![open_explore, ctrl_v])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
