import { constants } from "@/constant"
import { FC, PropsWithChildren, createContext } from "react"
import { useTranslation } from "react-i18next"
import { useLocalStorage } from "react-use"

export type Local_position = {
    name: string,
    value: string
}
export interface Language_type {
    positions?: Local_position[]
    position: string
    set_position: (lang: string) => void
}

export const PositionContext = createContext<Language_type>({
    positions: [],
    position: "",
    set_position: (_lang) => void 0
})


export const Position_wrapper: FC<PropsWithChildren> = ({ children }) => {
    const { t } = useTranslation()
    const position_locals: Local_position[] = [
        {
            name: t('position.bottom_right'),
            value: 'br'
        }, {
            name: t('position.top_left'),
            value: 'tl'
        }, {
            name: t('position.top_right'),
            value: 'tr'
        }, {
            name: t('position.bottom_left'),
            value: 'bl'
        }
    ]
    const [position, set_position] = useLocalStorage<string>('position', constants.default_position, { raw: true })

    return <PositionContext.Provider value={{
        positions: position_locals,
        position: position!,
        set_position
    }}>{children}</PositionContext.Provider>
}