import { Setting_item } from "@/pages/Settings/components/Setting_item"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import { constants } from "@/constant"
import { useLocalStorage } from "react-use"

export const Auto_start = () => {
    const { t } = useTranslation()
    const [auto_start, set_auto_start] = useLocalStorage<boolean>('auto_start',
        constants.default_auto_start,
        {
            raw: false,
            serializer: (value: boolean) => value.toString(),
            deserializer: (value: string) => value === "true"
        })
    useEffect(() => {
        set_auto_start(auto_start)
    }, [auto_start])
    return <Setting_item title={t('setting.auto_start') + ":"}>
        <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" checked={auto_start} onCheckedChange={set_auto_start} />
        </div>
    </Setting_item>
}