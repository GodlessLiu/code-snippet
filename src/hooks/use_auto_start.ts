import { enable, isEnabled } from "tauri-plugin-autostart-api";

export async function useAutoStart() {
    const isAutoStartEnabled = await isEnabled();
    if (!isAutoStartEnabled) {
        await enable();
    }
}