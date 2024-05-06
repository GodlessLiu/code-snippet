import { MdiFileMoveOutline } from "@/components/icons/explore";
import { use_code_snippets_store } from "@/stores/code_snippets";
import { invoke } from "@tauri-apps/api";
import { writeText } from "@tauri-apps/api/clipboard";
import { message } from '@tauri-apps/api/dialog';
import { PhDownloadSimpleFill } from "@/components/icons/download";
import { MaterialSymbolsIosShareSharp } from "@/components/icons/share";
import { WebviewWindow, getAll } from "@tauri-apps/api/window";
import { data_snippets_path } from "@/lib/path";
import { MaterialSymbolsSettingsOutline } from "@/components/icons/setting";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
export default function Options() {
    function handle_explore() {
        data_snippets_path().then((path) => {
            invoke("open_explore", { path: path });
        })
    }
    const copy_view_file = use_code_snippets_store((state) => state.copy_view_file);
    async function hadnle_export() {
        writeText(JSON.stringify(copy_view_file, null, 2));
        await message(t("share.export_message"), 'code-snippets')
    }
    async function handle_share() {
        const all = getAll();
        const share_window = all.filter((item) => item.label === 'share');
        if (share_window.length) {
            let window = share_window[0]
            if (await window.isMinimized) {
                window.unminimize();
                return
            }
        } else {
            new WebviewWindow('share', {
                url: '/share',
                width: 500,
                height: 400,
                resizable: false,
                title: t("share.window_title")
            });
        }
    }
    const navigate = useNavigate();
    function handle_setting() {
        navigate('/settings');
    }
    return (
        <div className="options h-8 py-1 flex justify-end items-center px-2 gap-2 text-xl text-gray-500 border-b">
            <PhDownloadSimpleFill className="cursor-pointer" onClick={handle_share} />
            <MdiFileMoveOutline className="cursor-pointer" onClick={handle_explore} />
            <MaterialSymbolsSettingsOutline className="cursor-pointer" onClick={handle_setting} />
            <MaterialSymbolsIosShareSharp className="cursor-pointer" onClick={hadnle_export} />
        </div>
    )
}
