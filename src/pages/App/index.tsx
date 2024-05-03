import { Command_view } from "@/pages/App/command_view";
import { Setup } from "@/process/Setup";
function App() {
  return (
    <Setup>
      <div className="rounded-lg border shadow-md bg-white w-full h-[384px]">
        <Command_view />
      </div>
    </Setup>

  );
}
export default App;