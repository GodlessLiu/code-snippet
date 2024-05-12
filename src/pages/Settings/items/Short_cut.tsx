import { Setting_item } from "@/pages/Settings/components/Setting_item";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Localstorage } from '@/lib/localstorage';
import { constants } from "@/constant";

export const Short_cut = () => {
    const { t } = useTranslation()
    const inputRef = useRef<HTMLInputElement>(null)
    const [border_color, set_border_color] = useState('black')
    function save_short_cut(keys: string) {
        if (keys != Localstorage.getItem("short_cut")) {
            Localstorage.runFnWithLocalStorage("short_cut", keys, () => {
                set_short_cut(keys)
                inputRef.current?.blur()
            })
        }
    }
    const [short_cut, set_short_cut] = useState<string>(Localstorage.getItemWithDefault("short_cut", constants.default_short_cut));
    const handle_input = useCallback((e: KeyboardEvent) => {
        e.preventDefault()
        if (e.ctrlKey && e.key != "Control") {
            const keys = "Control" + '+' + e.key
            save_short_cut(keys)
        }
        if (e.altKey && e.key != "Alt") {
            const keys = "Alt" + '+' + e.key
            save_short_cut(keys)
        }
        if (e.shiftKey && e.key != "Shift") {
            const keys = "Shift" + '+' + e.key
            save_short_cut(keys)
        }
    }, [])
    function handle_focus() {
        set_border_color("blue")
        inputRef.current?.addEventListener("keydown", handle_input)
    }
    function hanler_blur() {
        set_border_color("black")
        inputRef.current?.removeEventListener("keydown", handle_input)
    }
    return <Setting_item title={t("setting.short_cut") + ":"}>
        <input value={short_cut} readOnly className="inline-block border-2 w-[120px] p-1 h-[28px] text-center outline-none" ref={inputRef} style={{ borderColor: border_color }} onBlur={hanler_blur} onFocus={handle_focus} />
    </Setting_item>
}