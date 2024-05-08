import { enable, disable } from "tauri-plugin-autostart-api";
import LocalStorage from "@/lib/localstorage";
export async function useAutoStart() {
    if (LocalStorage.getItem("auto_start") === "true") {
        await enable();
        return
    }
    await disable();
}