import { createContext } from "react"

export type Local_position = {
    name: string,
    value: string
}
export interface Language_type {
    locals?: Local_position[]
    local: Local_position
    set_local: (lang: string) => void
}
export const position_locals: Local_position[] = [{
    name: '左上',
    value: 'tl'
}, {
    name: '右上',
    value: 'tr'
}, {
    name: '左下',
    value: 'bl'
}, {
    name: '右下',
    value: 'br'

}]
export const PositionContext = createContext<Language_type>({
    locals: position_locals,
    local: {
        name: '右上',
        value: 'tr'
    },
    set_local: (_lang) => void 0
})
