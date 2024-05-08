import Localstorage from "@/lib/localstorage"
import { LanguageContext, Local_language, language_locals } from "@/pages/Settings/contexts/Language_context"
import { Local_position, PositionContext, position_locals } from "@/pages/Settings/contexts/Position_context"
import { Font_family, SettingContext } from "@/pages/Settings/contexts/Setting_context"
import { ThemeContext, Themes } from "@/pages/Settings/contexts/theme_context"
import { FC, PropsWithChildren, useState } from "react"
import { useTranslation } from "react-i18next"

export const Setting_wrapper: FC<PropsWithChildren> = ({ children }) => {
    const { t } = useTranslation();
    const themes: Themes = {
        'conan': {
            name: t("themes_name.conan"),
            app_bg: "conan/app_bg.jpeg",
            share_editor_bg: "conan/share_editor_bg.webp",
            command_item_icon: "conan/command_item_icon.png",
            command_item_label: "conan/command_item_label.png"
        },
        'yuanshen': {
            name: t("themes_name.yuanshen"),
            app_bg: "yuanshen/app_bg.png",
            share_editor_bg: "yuanshen/share_editor_bg.png",
            command_item_icon: "yuanshen/command_item_icon.png",
            command_item_label: "yuanshen/command_item_label.png"
        },
        'qiyuanzui': {
            name: t("themes_name.qiyuanzui"),
            app_bg: "qiyuanzui/app_bg.png",
            share_editor_bg: "qiyuanzui/share_editor_bg.png",
            command_item_icon: "qiyuanzui/command_item_icon.png",
            command_item_label: "qiyuanzui/command_item_label.png"
        },
        "lol": {
            name: t("themes_name.lol"),
            app_bg: "lol/app_bg.png",
            share_editor_bg: "lol/share_editor_bg.png",
            command_item_icon: "lol/command_item_icon.png",
            command_item_label: "lol/command_item_label.png"
        },
        "pure": {
            name: t("themes_name.pure"),
            app_bg: "linear-gradient(white, transparent)",
            share_editor_bg: "linear-gradient(white, transparent)",
            command_item_icon: "linear-gradient(white, transparent)",
            command_item_label: "linear-gradient(white, transparent)"
        }
    };

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

    const [lang, set_lang] = useState<Local_language>(language_locals.find(i => i.name === Localstorage.getItem("language")) || {
        name: "English",
        value: "en"
    })
    const [position, set_position] = useState<Local_position>(position_locals.find(i => i.value === Localstorage.getItem("position")) || {
        name: "右上",
        value: "tr"
    })
    const [theme, set_theme] = useState<string>(Localstorage.getItem("theme", false) || 'conan')
    const change_local_language = (lang_name: string) => {
        const i = language_locals.find(i => i.name === lang_name)
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
    const change_local_position = (position_value: string) => {
        const i = position_locals.find(i => i.value === position_value)
        set_position(i || { name: "右上", value: "tr" })
        Localstorage.setItem("position", JSON.stringify(position_value || "tr"))
    }
    const change_theme = (theme: string) => {
        set_theme(theme)
        Localstorage.setItem("theme", JSON.stringify(theme))
    }

    return <SettingContext.Provider value={{ font_family: font, change_font: change_font, font_familys: font_familys }}>
        <ThemeContext.Provider value={{ themes, local: theme, set_theme: change_theme }}>
            <LanguageContext.Provider value={{ local: lang, set_local: change_local_language, locals: language_locals }}>
                <PositionContext.Provider value={{ local: position, locals: position_locals, set_local: change_local_position }}>
                    {children}
                </PositionContext.Provider>
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    </SettingContext.Provider>


}

