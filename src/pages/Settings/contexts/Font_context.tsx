import { constants } from "@/constant"
import { Localstorage } from "@/lib/localstorage"
import { FC, PropsWithChildren, createContext, useState } from "react"
export interface Font_family {
    name: string
    value: string
}
export interface Setting {
    local_font: string
    fonts: Font_family[]
    set_font: (font_name: string) => void
}

export const FontContext = createContext<Setting>({
    "local_font": "",
    "fonts": [],
    "set_font": (_font) => void 0
})


export const Font_wrapper: FC<PropsWithChildren> = ({ children }) => {
    const fonts: Font_family[] = [
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
    const [font, setFont] = useState<string>(Localstorage.getItemWithDefault('font', constants.default_font))

    const change_font = (font_name: string) => {
        Localstorage.runFnWithLocalStorage('font', font_name, () => setFont(font_name))
    }
    return <FontContext.Provider value={{ fonts, local_font: font, set_font: change_font }}>{children}</FontContext.Provider>
}