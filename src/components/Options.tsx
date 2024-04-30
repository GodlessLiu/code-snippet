import { MaterialSymbolsDriveFileMoveOutline } from "@/components/icons/explore";
import { PhExport } from "@/components/icons/export";
import { use_code_snippets_store } from "@/stores/code_snippets";
import { invoke } from "@tauri-apps/api";
import { writeText } from "@tauri-apps/api/clipboard";
import { appDataDir } from "@tauri-apps/api/path";

export default function Options() {
    function handle_to_explore() {
        appDataDir().then((dir) => {
            invoke("open_explore", { path: dir + 'snippets' });
        })
    }
    const command_view_file = use_code_snippets_store((state) => state.command_view_file);
    function hadnle_export() {
        writeText(JSON.stringify(command_view_file));
    }
    return (
        <div className="options h-8 py-1 flex justify-end items-center px-2 gap-1 text-xl text-gray-500 border-b">
            <PhExport className="cursor-pointer" onClick={hadnle_export} />
            <MaterialSymbolsDriveFileMoveOutline className="bg-gray-50  cursor-pointer" onClick={handle_to_explore} />
        </div>
    )
}

