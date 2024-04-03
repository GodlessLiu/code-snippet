import { Command_view } from "@/pages/command_view";
import { TitleBar } from "./components/TitleBar";
import { useAutoStart } from "@/hooks/use_auto_start";
import { MaterialSymbolsDriveFileMoveOutline } from "@/components/icons/explore";
import { invoke } from "@tauri-apps/api/tauri";
import { appDataDir } from "@tauri-apps/api/path";
import { useEffect } from "react";
function App() {
  // 开机自启动
  useAutoStart();
  function handle_to_explore() {
    appDataDir().then((dir) => {
      invoke("open_explore", { path: dir + 'snippets' });
    })
  }
  useEffect(() => {
    function fn(e: MouseEvent) {
      e.preventDefault();
    }
    document.addEventListener('contextmenu', fn);
    return () => document.removeEventListener('contextmenu', fn);
  }, [])
  return (
    <div>
      <TitleBar />
      <Command_view />
      <MaterialSymbolsDriveFileMoveOutline className="bg-gray-50 absolute bottom-3 right-4 text-3xl text-gray-500 cursor-pointer" onClick={handle_to_explore} />
    </div>
  );
}
export default App;
