import { MdiKeyboardReturn } from "@/components/icons/return";
import { useNavigate } from "react-router-dom";
import { Font_family } from "@/pages/Settings/items/Font_family";
import { TitleBar } from "@/components/TitleBar";
import { Language } from "@/pages/Settings/items/Language";
import { Short_cut } from "@/pages/Settings/items/Short_cut";
import { Theme } from "@/pages/Settings/items/Theme";
import { Auto_start } from "@/pages/Settings/items/Auto_start";
import { Position } from "@/pages/Settings/items/Position";
import { useTranslation } from "react-i18next";
export const Settings = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
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
                <Auto_start />
                <Position />
                <Theme />
                <p className="mt-2 text-xs text-red-600">{t("setting.recommendation")}</p>
            </div>
        </div>

    </div>
}