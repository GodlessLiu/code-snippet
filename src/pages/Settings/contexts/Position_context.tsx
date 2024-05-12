import { constants } from "@/constant"
import { Localstorage } from "@/lib/localstorage"
import { FC, PropsWithChildren, createContext, useState } from "react"
import { useTranslation } from "react-i18next"

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
    const [position, set_position] = useState<string>(Localstorage.getItemWithDefault('position', constants.default_position))
    function change_position(position: string) {
        Localstorage.runFnWithLocalStorage('position', position, () => set_position(position))
    }
    return <PositionContext.Provider value={{
        positions: position_locals,
        position: position,
        set_position: change_position
    }}>{children}</PositionContext.Provider>
}