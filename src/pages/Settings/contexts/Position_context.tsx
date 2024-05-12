import { constants } from "@/constant"
import { Localstorage } from "@/lib/localstorage"
import { FC, PropsWithChildren, createContext, useState } from "react"

export type Local_position = {
    name: string,
    value: string
}
export interface Language_type {
    positions?: Local_position[]
    position: string
    set_position: (lang: string) => void
}
export const position_locals: Local_position[] = [
    {
        name: '右下',
        value: 'br'
    }, {
        name: '左上',
        value: 'tl'
    }, {
        name: '右上',
        value: 'tr'
    }, {
        name: '左下',
        value: 'bl'
    }
]
export const PositionContext = createContext<Language_type>({
    positions: [],
    position: "",
    set_position: (_lang) => void 0
})


export const Position_wrapper: FC<PropsWithChildren> = ({ children }) => {
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