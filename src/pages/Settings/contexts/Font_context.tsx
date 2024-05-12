import { constants } from "@/constant"
import { FC, PropsWithChildren, createContext } from "react"
import { useLocalStorage } from 'react-use'
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
    const [font, set_font] = useLocalStorage<string>("font", constants.default_font, { raw: true })

    return <FontContext.Provider value={{ fonts, local_font: font!, set_font }}>{children}</FontContext.Provider>
}