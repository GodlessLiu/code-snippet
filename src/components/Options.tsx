import { MdiFileMoveOutline } from "@/components/icons/explore";
import { use_code_snippets_store } from "@/stores/code_snippets";
import { invoke } from "@tauri-apps/api";
import { writeText } from "@tauri-apps/api/clipboard";
import { message } from '@tauri-apps/api/dialog';
import { PhDownloadSimpleFill } from "@/components/icons/download";
import { MaterialSymbolsIosShareSharp } from "@/components/icons/share";
import { WebviewWindow } from "@tauri-apps/api/window";
import { data_snippets_path } from "@/lib/path";
export default function Options() {
    function handle_explore() {
        data_snippets_path().then((path) => {
            invoke("open_explore", { path: path });
        })
    }
    const copy_view_file = use_code_snippets_store((state) => state.copy_view_file);
    async function hadnle_export() {
        writeText(JSON.stringify(copy_view_file, null, 2));
        await message('The exported data has been copied to the clipboard!!', 'code-snippets')
    }
    async function handle_share() {
        new WebviewWindow('share', {
            url: '/share',
            width: 500,
            height: 400,
            resizable: false,
            title: "share"
        });
    }
    return (
        <div className="options h-8 py-1 flex justify-end items-center px-2 gap-2 text-xl text-gray-500 border-b">
            <PhDownloadSimpleFill className=" cursor-pointer" onClick={handle_share} />
            <MdiFileMoveOutline className="bg-gray-50  cursor-pointer" onClick={handle_explore} />
            <MaterialSymbolsIosShareSharp className="cursor-pointer" onClick={hadnle_export} />
        </div>
    )
}

