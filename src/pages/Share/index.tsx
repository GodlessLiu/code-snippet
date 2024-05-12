import { Button } from "@/components/ui/button";
import { useState } from "react";
import { import_snippets_from_json } from "@/lib/file";
import { JsonEditor } from "@/pages/Share/JsonEditor";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
export function Share() {
    const { t } = useTranslation()
    const [value, setValue] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    function download(value: string) {
        if (!value) return
        setLoading(true)
        const _value = JSON.parse(value)
        import_snippets_from_json(_value)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }

    return <div className="h-[400px] w-[500px]">
        <JsonEditor value={value} setValue={setValue} />
        <Button onClick={() => download(value)} variant="ghost" size='sm' className="float-right mr-2 mt-1">
            {
                loading ? <Loader2 className="animate-spin text-gray-500" fontSize={12} /> : t("share.import")
            }
        </Button>
    </div>
}