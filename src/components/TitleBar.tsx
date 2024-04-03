import { appWindow } from "@tauri-apps/api/window";

export function TitleBar() {
    function handleDoubleClick() {
        appWindow.hide();
    }
    return (
        <div data-tauri-drag-region className="h-[16px] rounded-lg bg-gray-200" onDoubleClick={handleDoubleClick}>
        </div>
    )
}