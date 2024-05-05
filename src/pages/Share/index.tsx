import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Command_view_file, create_snippet_dir, snippet_exist, write_snippet_file } from "@/lib/file";
import { JsonEditor } from "@/pages/Share/JsonEditor";
import { Loader2 } from "lucide-react";
export function Share() {
    const [value, setValue] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    function download(value: string) {
        if (!value) return
        setLoading(true)
        const _value = JSON.parse(value)
        _value.forEach(async (element: Command_view_file) => {
            if (element.is_dir) {
                if (!await snippet_exist(element.name)) {
                    await create_snippet_dir(element.name)
                }
                element.children?.forEach(async (child: Command_view_file) => {
                    if (await snippet_exist(element.name + '\\' + child.name)) return
                    await write_snippet_file(element.name + '\\' + child.name, child.rawContent!)
                })
                return
            }
            if (await snippet_exist(element.name)) {
                return
            }
            await write_snippet_file(element.name, element.rawContent!)
            return
        });
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }

    return <div className="h-[400px] w-[500px]">
        <JsonEditor value={value} setValue={setValue} />
        <Button onClick={() => download(value)} variant="ghost" size='sm' className="float-right mr-2 mt-1">
            {
                loading ? <Loader2 className="animate-spin text-gray-500" fontSize={12} /> : '导入'
            }
        </Button>
    </div>
}