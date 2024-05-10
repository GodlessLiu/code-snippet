import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { FontContext } from "@/pages/Settings/contexts/Font_context";
import { ThemeContext } from "@/pages/Settings/contexts/theme_context";
function App() {
  const { local_font: font_family } = useContext(FontContext)
  const { theme: local, themes } = useContext(ThemeContext)

  return (
    <div className="rounded-lg border shadow-md w-full h-[384px] bg-cover" style={{ backgroundImage: `url('${themes[local].app_bg}')`, fontFamily: font_family }}>
      <div className="h-full bg-white bg-opacity-80">
        <Outlet />
      </div>
    </div>
  );
}
export default App;