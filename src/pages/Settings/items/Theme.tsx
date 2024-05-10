import { Setting_item } from "@/pages/Settings/components/Setting_item";
import { ThemeContext } from "@/pages/Settings/contexts/theme_context";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export const Theme = () => {
    const { set_theme, themes, theme } = useContext(ThemeContext)
    const { t } = useTranslation()
    return <Setting_item title={t('setting.theme') + ":"}>
        <Select defaultValue={theme} onValueChange={set_theme}>
            <SelectTrigger className="w-[90px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {
                    Object.keys(themes)?.map(theme_name => {
                        return <SelectItem key={theme_name} value={theme_name}>{themes[theme_name].name}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    </Setting_item>
}