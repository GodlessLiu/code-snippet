import { createContext } from "react"
export interface Font_family {
    name: string
    value: string
}
export interface Setting {
    font_family: Font_family
    change_font: (font_name: string) => void
    font_familys: Font_family[]
}

export const SettingContext = createContext<Setting>({
    "font_family": {
        name: "",
        value: ""
    },
    "font_familys": [

    ],
    "change_font": (_font) => void 0
})