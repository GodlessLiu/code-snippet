import { read_data_file_to_view_file } from "@/hooks/use_view_file";
import { Setting_wrapper } from "@/pages/Settings/Setting_provider";
import { use_code_snippets_store } from "@/stores/code_snippets";
import { register } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { getItemWithDefault } from "@/lib/localstorage";
import { use_window_position } from "@/hooks/use_state_window";
import { constants } from "@/constant";
export const Setup: FC<PropsWithChildren> = ({ children }) => {
    const [loading, set_loading] = useState(true);
    const set_file_entries = use_code_snippets_store((state) => state.init_code_snippets_store);
    // 初始化zustand 代码片段数据
    useEffect(() => {
        read_data_file_to_view_file().then(({ entries, command_view_file, copy_view_file }) => {
            set_file_entries(entries, command_view_file, copy_view_file);
            set_loading(false);
        })
    }, [])
    // 阻止鼠标右键
    useEffect(() => {
        function fn(e: MouseEvent) {
            e.preventDefault();
        }
        document.addEventListener('contextmenu', fn);
        return () => document.removeEventListener('contextmenu', fn);
    }, [])
    // 阻止快捷键刷新
    useEffect(() => {
        function fn(e: KeyboardEvent) {
            if (e.key == "F5" || (e.ctrlKey && e.key == "r")) {
                e.preventDefault();
            }
        }
        document.addEventListener('keydown', fn);
        return () => document.removeEventListener('keydown', fn);
    }, [])
    // 注册快捷键
    useEffect(() => {
        register(getItemWithDefault("short_cut", constants.default_short_cut), async () => {
            const is_vissible = await appWindow.isVisible()
            if (is_vissible) {
                appWindow.hide()
            } else {
                appWindow.show()
            }
        })
    }, [])
    // 保持窗口位置
    use_window_position();
    return <Setting_wrapper>
        {loading ? <p className="rounded-lg border shadow-md bg-white indent-2 py-1">loading...</p> : children}
    </Setting_wrapper>


}
