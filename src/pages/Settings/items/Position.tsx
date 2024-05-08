import { Setting_item } from "@/pages/Settings/components/Setting_item"
import { PositionContext } from "@/pages/Settings/contexts/Position_context"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useContext } from "react"
import { useTranslation } from "react-i18next"

export const Position = () => {
    const { local, set_local, locals } = useContext(PositionContext)
    const { t } = useTranslation()
    return <Setting_item title={t("setting.position")}>
        <Select onValueChange={(e: string) => set_local(e)}>
            <SelectTrigger className="w-[90px]">
                <SelectValue placeholder={local.name} />
            </SelectTrigger>
            <SelectContent>
                {
                    locals?.map(local => {
                        return <SelectItem key={local.value} value={local.value}>{local.name}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    </Setting_item>
}