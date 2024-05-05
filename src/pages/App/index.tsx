import { Command_view } from "@/pages/App/command_view";
import { Setup } from "@/process/Setup";
import app_bg from '@/assets/images/app_bg.jpeg';
function App() {
  // invoke("handle_winodw_show", { label: 'main' })
  return (
    <Setup>
      <div className="rounded-lg border shadow-md w-full h-[384px] bg-cover" style={{ backgroundImage: `url(${app_bg})` }}>
        <div className="h-full bg-white bg-opacity-80">
          <Command_view />
        </div>
      </div>
    </Setup>

  );
}
export default App;