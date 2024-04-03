import { listen } from "@tauri-apps/api/event";
import { appWindow, PhysicalPosition } from "@tauri-apps/api/window";
import { useEffect } from "react";
import LocalStorage from "@/lib/localstorage";


export function use_state_windows() {
    useEffect(() => {
        listen("tauri://move", (e) => {
            LocalStorage.setItem("position", JSON.stringify(e.payload));
        })
    }, [])
    const { x, y } = LocalStorage.getItem("position");
    appWindow.setPosition(new PhysicalPosition(x, y));
}