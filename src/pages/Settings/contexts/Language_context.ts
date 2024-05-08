import { createContext } from "react"

export type Local_language = {
    name: string,
    value: string
}
export interface Language_type {
    locals?: Local_language[]
    local: Local_language
    set_local: (lang: string) => void
}
export const language_locals: Local_language[] = [{
    name: 'English',
    value: 'en'
}, {
    name: "简体中文",
    value: 'zh-CN'
}]
export const LanguageContext = createContext<Language_type>({
    locals: language_locals,
    local: {
        name: "English",
        value: 'en'
    },
    set_local: (_lang) => void 0
})


