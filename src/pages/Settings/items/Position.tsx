import { Setting_item } from "@/pages/Settings/components/Setting_item"
import { PositionContext } from "@/pages/Settings/contexts/Position_context"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useContext } from "react"
import { useTranslation } from "react-i18next"

export const Position = () => {
    const { position, set_position, positions } = useContext(PositionContext)
    const { t } = useTranslation()
    return <Setting_item title={t("setting.position")}>
        <Select defaultValue={position} onValueChange={set_position}>
            <SelectTrigger className="w-[90px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {
                    positions?.map(p => {
                        return <SelectItem key={p.value} value={p.value}>{p.name}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    </Setting_item>
}