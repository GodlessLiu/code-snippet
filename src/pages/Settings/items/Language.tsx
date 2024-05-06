import { Setting_item } from "@/pages/Settings/components/Setting_item"
import { LanguageContext } from "@/pages/Settings/contexts/Language_context"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { t } from "i18next"
import { useContext } from "react"

export const Language = () => {
    const { local, locals, set_local } = useContext(LanguageContext)

    return <Setting_item title={t("setting.language") + ":"}>
        <Select value={local.name} onValueChange={(e: string) => set_local(e)}>
            <SelectTrigger className="w-[90px]">
                <SelectValue placeholder={local.name} />
            </SelectTrigger>
            <SelectContent>
                {
                    locals?.map(local => {
                        return <SelectItem key={local.value} value={local.name}>{local.name}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    </Setting_item>
}