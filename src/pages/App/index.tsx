import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { SettingContext } from "@/pages/Settings/contexts/Setting_context";
import { ThemeContext } from "@/pages/Settings/contexts/theme_context";
function App() {
  const { font_family } = useContext(SettingContext)
  const { local, themes } = useContext(ThemeContext)

  return (
    <div className="rounded-lg border shadow-md w-full h-[384px] bg-cover" style={{ backgroundImage: `url('${themes[local].app_bg}')`, fontFamily: font_family.value }}>
      <div className="h-full bg-white bg-opacity-80">
        <Outlet />
      </div>
    </div>
  );
}
export default App;