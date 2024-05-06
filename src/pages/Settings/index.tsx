import { MdiKeyboardReturn } from "@/components/icons/return";
import { useNavigate } from "react-router-dom";
import { Font_family } from "@/pages/Settings/items/Font_family";
import { TitleBar } from "@/components/TitleBar";
import { Language } from "@/pages/Settings/items/Language";
import { Short_cut } from "@/pages/Settings/items/Short_cut";
export const Settings = () => {
    const navigate = useNavigate();
    function handle_return() {
        navigate('/');
    }
    return <div className="settings">
        <TitleBar />
        <div className="px-2">
            <p className=" justify-end flex pt-1"><MdiKeyboardReturn className="cursor-pointer" onClick={handle_return} /></p>
            <div className="setting_content pt-2">
                <Font_family />
                <Language />
                <Short_cut />
            </div>
        </div>

    </div>
}