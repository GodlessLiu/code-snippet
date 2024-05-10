import { FontContext } from "@/pages/Settings/contexts/Font_context"
import { Setting_item } from "@/pages/Settings/components/Setting_item"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useContext } from "react"
import { useTranslation } from "react-i18next"

export const Font_family = () => {
    const { fonts, set_font, local_font } = useContext(FontContext)
    const { t } = useTranslation();
    return <Setting_item title={t("setting.font_family") + ':'}>
        <Select defaultValue={local_font} onValueChange={set_font}>
            <SelectTrigger className="w-[98px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {
                    fonts?.map(font => {
                        return <SelectItem key={font.value} value={font.value}>{font.name}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    </Setting_item>
}