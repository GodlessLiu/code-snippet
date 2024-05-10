import { Setting_item } from "@/pages/Settings/components/Setting_item"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { Localstorage } from '@/lib/localstorage'
import { useAutoStart } from "@/hooks/use_auto_start"
import { constants } from "@/constant"

export const Auto_start = () => {
    const { t } = useTranslation()
    const [auto_start, set_auto_start] = useState<boolean>(Localstorage.getItemWithDefault("auto_start", constants.default_auto_start) === "true")
    useEffect(() => {
        Localstorage.runFnWithLocalStorage("auto_start", auto_start.toString(), () => useAutoStart(auto_start))
    }, [auto_start])
    return <Setting_item title={t('setting.auto_start') + ":"}>
        <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" checked={auto_start} onCheckedChange={set_auto_start} />
        </div>
    </Setting_item>
}