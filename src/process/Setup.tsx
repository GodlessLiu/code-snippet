import { TitleBar } from "@/components/TitleBar";
import { useAutoStart } from "@/hooks/use_auto_start";
import { use_state_windows } from "@/hooks/use_state_window";
import { read_data_file_to_view_file } from "@/hooks/use_view_file";
import { use_code_snippets_store } from "@/stores/code_snippets";
import { FC, PropsWithChildren, useEffect, useState } from "react";

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
    // 开机自启动
    useAutoStart();
    // 阻止鼠标右键
    useEffect(() => {
        function fn(e: MouseEvent) {
            e.preventDefault();
        }
        document.addEventListener('contextmenu', fn);
        return () => document.removeEventListener('contextmenu', fn);
    }, [])
    // 记录主window位置 
    use_state_windows();
    return <>
        <TitleBar />
        {loading ? <p className="rounded-lg border shadow-md bg-white indent-2 py-1">loading...</p> : children}
    </>
}