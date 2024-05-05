import Localstorage from "@/lib/localstorage"
import { createContext, FC, PropsWithChildren, useState } from "react"


interface Font_family {
    name: string
    value: string
}

interface Setting {
    font_family: Font_family
    change_font: (font: string) => void
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

export const Setting_wrapper: FC<PropsWithChildren> = ({ children }) => {
    const font_familys: Font_family[] = [
        {
            name: "默认字体",
            value: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
        },
        {
            name: "微软雅黑",
            value: "Microsoft YaHei, 微软雅黑, SimHei, 黑体, sans-serif"
        }
    ]
    const [font, setFont] = useState<Font_family>(font_familys.find(i => i.name === Localstorage.getItem("setting_font")) || {
        name: "默认字体",
        value: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
    })
    const change_font = (font: string) => {
        Localstorage.setItem('setting_font', JSON.stringify(font))
        setFont({
            name: font,
            value: font_familys.find(i => i.name === font)?.value || "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
        })
    }

    return <SettingContext.Provider value={{ font_family: font, change_font: change_font, font_familys: font_familys }}>
        {children}
    </SettingContext.Provider>
}

