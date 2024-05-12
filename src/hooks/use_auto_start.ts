import { enable, disable } from "tauri-plugin-autostart-api";
export async function useAutoStart(auto_start: boolean) {
    if (!auto_start) {
        await disable();
        return
    }
    await enable();
}