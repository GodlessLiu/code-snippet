import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";
import LocalStorage from "@/lib/localstorage";
export async function useAutoStart() {
    const isAutoStartEnabled = await isEnabled();
    if (!isAutoStartEnabled && LocalStorage.getItem("auto_start", false) === "true") {
        await enable();
        return
    }
    await disable()
    return
}