import { createContext } from "react"

export type Local = {
    name: string,
    value: string
}
export interface Language_type {
    locals?: Local[]
    local: Local
    set_local: (lang: string) => void
}
export const locals: Local[] = [{
    name: 'English',
    value: 'en'
}, {
    name: "简体中文",
    value: 'zh-CN'
}]
export const LanguageContext = createContext<Language_type>({
    locals: locals,
    local: {
        name: "English",
        value: 'en'
    },
    set_local: (_lang) => void 0
})


