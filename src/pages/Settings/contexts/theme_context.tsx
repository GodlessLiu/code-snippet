import { constants } from "@/constant"
import { FC, PropsWithChildren, createContext } from "react"
import { useTranslation } from "react-i18next"
import { useLocalStorage } from "react-use"


export interface ThemeAsset {
    name: string
    app_bg: string
    share_editor_bg: string
    command_item_icon: string
    command_item_label: string
}
export type Themes = Record<string, ThemeAsset>

interface ThemeContextType {
    themes: Record<string, ThemeAsset>
    theme: string
    set_theme: (assets: string) => void
}


export const ThemeContext = createContext<ThemeContextType>({
    themes: {},
    theme: 'conan',
    set_theme: (_assets) => void 0
})

export const Theme_wrapper: FC<PropsWithChildren> = ({ children }) => {
    const { t } = useTranslation();
    // TODO: 修改这个为网络地址
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
    const [theme, set_theme] = useLocalStorage<string>('theme', constants.default_theme, { raw: true })
    return <ThemeContext.Provider value={{ themes: themes, theme: theme!, set_theme }}>
        {children}
    </ThemeContext.Provider>
}


