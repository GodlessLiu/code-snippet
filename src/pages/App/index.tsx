import app_bg from '@/assets/images/app_bg.jpeg';
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { SettingContext } from "@/pages/Settings/Setting_provider";
function App() {
  const { font_family } = useContext(SettingContext)

  return (
    <div className="rounded-lg border shadow-md w-full h-[384px] bg-cover" style={{ backgroundImage: `url(${app_bg})`, fontFamily: font_family.value }}>
      <div className="h-full bg-white bg-opacity-80">
        <Outlet />
      </div>
    </div>
  );
}
export default App;