import { constants } from '@/constant';
import { PhysicalPosition, currentMonitor, getAll } from '@tauri-apps/api/window';
export function use_window_position() {
    let physicalPosition;
    currentMonitor().then((monitor) => {
        let pyhsocalAppWidth = constants.app_width * monitor?.scaleFactor!;
        let pyhsocalAppHeight = constants.app_height * monitor?.scaleFactor!;
        const windows = getAll();
        switch (localStorage.getItem("position")) {
            case "tl":
                physicalPosition = new PhysicalPosition(10, 10);
                break;
            case "tr":
                physicalPosition = new PhysicalPosition(monitor?.size.width! - pyhsocalAppWidth, 10);
                break;
            case "bl":
                physicalPosition = new PhysicalPosition(10, monitor?.size.height! - pyhsocalAppHeight);
                break;
            case "br":
                physicalPosition = new PhysicalPosition(monitor?.size.width! - pyhsocalAppWidth, monitor?.size.height! - pyhsocalAppHeight);
                break;
            default:
                physicalPosition = new PhysicalPosition(monitor?.size.width! - pyhsocalAppWidth, 10);
                break;
        }
        windows.find((window) => window.label === "main")?.setPosition(physicalPosition);
    })
}