import { PhysicalPosition, currentMonitor, getAll } from '@tauri-apps/api/window';
import { Localstorage } from '@/lib/localstorage';
export function use_window_position() {
    let physicalPosition;
    currentMonitor().then((monitor) => {
        const windows = getAll();
        switch (Localstorage.getItem("position")) {
            case "tl":
                physicalPosition = new PhysicalPosition(10, 10);
                break;
            case "tr":
                physicalPosition = new PhysicalPosition(monitor?.size.width! - 400, 10);
                break;
            case "bl":
                physicalPosition = new PhysicalPosition(10, monitor?.size.height! - 500);
                break;
            case "br":
                physicalPosition = new PhysicalPosition(monitor?.size.width! - 400, monitor?.size.height! - 500);
                break;
            default:
                physicalPosition = new PhysicalPosition(monitor?.size.width! - 400, 10);
                break;
        }
        windows.find((window) => window.label === "main")?.setPosition(physicalPosition);
    })
}