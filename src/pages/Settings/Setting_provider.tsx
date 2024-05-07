import Localstorage from "@/lib/localstorage"
import { LanguageContext, Local, locals } from "@/pages/Settings/contexts/Language_context"
import { Font_family, SettingContext } from "@/pages/Settings/contexts/Setting_context"
import { FC, PropsWithChildren, useState } from "react"
import { useTranslation } from "react-i18next"

export const Setting_wrapper: FC<PropsWithChildren> = ({ children }) => {
    const font_familys: Font_family[] = [
        {
            name: "默认字体",
            value: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
        },
        {
            name: "微软雅黑",
            value: "Microsoft YaHei, 微软雅黑, SimHei, 黑体, sans-serif"
        },
        {
            name: "monospace",
            value: "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace"
        }
    ]
    const [font, setFont] = useState<Font_family>(font_familys.find(i => i.name === Localstorage.getItem("setting_font")) || {
        name: "默认字体",
        value: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
    })
    const { i18n } = useTranslation();
    console.log(locals.find(i => i.name === Localstorage.getItem("language")));

    const [lang, set_lang] = useState<Local>(locals.find(i => i.name === Localstorage.getItem("language")) || {
        name: "English",
        value: "en"
    })
    const change_local = (lang_name: string) => {
        const i = locals.find(i => i.name === lang_name)
        set_lang(i || { name: "English", value: "en" })
        i18n.changeLanguage(i?.value || "en")
        Localstorage.setItem("language", JSON.stringify(lang_name || "English"))
    }
    const change_font = (font: string) => {
        Localstorage.setItem('setting_font', JSON.stringify(font))
        setFont({
            name: font,
            value: font_familys.find(i => i.name === font)?.value || "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
        })
    }

    return <SettingContext.Provider value={{ font_family: font, change_font: change_font, font_familys: font_familys }}>
        <LanguageContext.Provider value={{ local: lang, set_local: change_local, locals: locals }}>
            {children}
        </LanguageContext.Provider>
    </SettingContext.Provider>


}

