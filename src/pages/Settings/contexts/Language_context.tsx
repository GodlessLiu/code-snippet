import { Localstorage } from "@/lib/localstorage"
import { FC, PropsWithChildren, createContext, useState } from "react"
import { constants } from "@/constant"
import { useTranslation } from "react-i18next"
export type Local_language = {
    name: string,
    value: string
}
export interface Language_type {
    languages?: Local_language[]
    language: string
    set_language: (lang: string) => void
}
export const language_locals: Local_language[] = [{
    name: 'English',
    value: 'en'
}, {
    name: "简体中文",
    value: 'zh-CN'
}]
export const LanguageContext = createContext<Language_type>({
    languages: [],
    language: '',
    set_language: (_lang) => void 0
})

export const Language_wrapper: FC<PropsWithChildren> = ({ children }) => {
    const [language, set_language] = useState<string>(Localstorage.getItemWithDefault('language', constants.default_lang))

    const { i18n } = useTranslation();
    const set_local = (lang: string) => {
        Localstorage.runFnWithLocalStorage('language', lang, () => {
            set_language(lang)
            i18n.changeLanguage(lang)
        })
    }
    return <LanguageContext.Provider value={{ languages: language_locals, language: language, set_language: set_local }}>
        {children}
    </LanguageContext.Provider>
}

