import { Setting_item } from "@/pages/Settings/components/Setting_item"
import { useTranslation } from "react-i18next"

export const Theme = () => {
    const { t } = useTranslation()
    return <Setting_item title={t('setting.theme') + ":"}>
        TODO
    </Setting_item>
}