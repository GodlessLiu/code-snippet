import { SettingContext } from "@/pages/Settings/contexts/Setting_context"
import { Setting_item } from "@/pages/Settings/components/Setting_item"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useContext } from "react"
import { t } from "i18next"

export const Font_family = () => {
    const { font_familys, font_family, change_font } = useContext(SettingContext)
    const handle_value_change = (e: string) => {
        change_font(e)
    }
    return <Setting_item title={t("setting.font_family") + ':'}>
        <Select value={font_family.name} onValueChange={(e: string) => handle_value_change(e)}>
            <SelectTrigger className="w-[90px]">
                <SelectValue placeholder={font_family.name} />
            </SelectTrigger>
            <SelectContent>
                {
                    font_familys?.map(font => {
                        return <SelectItem key={font.name} value={font.name}>{font.name}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    </Setting_item>
}