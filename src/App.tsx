import { Command_view } from "@/pages/command_view";
import { TitleBar } from "./components/TitleBar";
import { useAutoStart } from "@/hooks/use_auto_start";
import { use_code_snippets_store } from "@/stores/code_snippets";
import { readDir, BaseDirectory } from "@tauri-apps/api/fs";
import { useEffect } from "react";
import { generate_commad_view_file } from "@/lib/file";
function App() {
  const set_file_entries = use_code_snippets_store((state) => state.init_code_snippets_store);

  // init store
  useEffect(() => {
    readDir('snippets', { dir: BaseDirectory.AppData, recursive: true }).then(async entries => {
      const command_view_file = await generate_commad_view_file(entries);
      set_file_entries(entries, command_view_file);
    });
  }, [])
  // 开机自启动
  useAutoStart();
  // useEffect(() => {
  //   function fn(e: MouseEvent) {
  //     e.preventDefault();
  //   }
  //   document.addEventListener('contextmenu', fn);
  //   return () => document.removeEventListener('contextmenu', fn);
  // }, [])
  return (
    <div>
      <TitleBar />
      <Command_view />
    </div>
  );
}
export default App;


