import { Setting_item } from "@/pages/Settings/components/Setting_item";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Localstorage from '@/lib/localstorage';
import { appWindow } from "@tauri-apps/api/window";

export const Short_cut = () => {
    const { t } = useTranslation()
    const inputRef = useRef<HTMLInputElement>(null)
    const [border_color, set_border_color] = useState('black')
    const [short_cut, set_short_cut] = useState<string>(Localstorage.getItem("short_cut") || "Alt+l")
    const [pre_short_cut, set_pre_short_cut] = useState<string>("")
    useEffect(() => {
        if (!short_cut) return;
        if (pre_short_cut) {
            unregister(pre_short_cut)
        }
        register(short_cut, async () => {
            const is_vissible = await appWindow.isVisible()
            if (is_vissible) {
                appWindow.hide()
            } else {
                appWindow.show()
            }
        })
        Localstorage.setItem("short_cut", short_cut)
        return
    }, [short_cut, pre_short_cut])
    const handle_input = useCallback((e: KeyboardEvent) => {
        e.preventDefault()
        if (e.ctrlKey && e.key != "Control") {
            const keys = "Control" + '+' + e.key
            if (keys != Localstorage.getItem("short_cut")) {
                set_pre_short_cut(Localstorage.getItem("short_cut")!)
                set_short_cut(keys)
                inputRef.current?.blur()
            }
        }
        if (e.altKey && e.key != "Alt") {
            const keys = "Alt" + '+' + e.key
            if (keys != Localstorage.getItem("short_cut")) {
                set_pre_short_cut(Localstorage.getItem("short_cut")!)
                set_short_cut(keys)
                inputRef.current?.blur()
            }
        }
        if (e.shiftKey && e.key != "Shift") {
            const keys = "Shift" + '+' + e.key
            if (keys != Localstorage.getItem("short_cut")) {
                set_pre_short_cut(Localstorage.getItem("short_cut")!)
                set_short_cut(keys)
                inputRef.current?.blur()
            }
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