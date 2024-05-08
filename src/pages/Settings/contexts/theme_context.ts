import { createContext } from "react"


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
    local: keyof Themes
    set_theme: (assets: string) => void
}


export const ThemeContext = createContext<ThemeContextType>({
    themes: {},
    local: 'conan',
    set_theme: (_assets) => void 0
})


