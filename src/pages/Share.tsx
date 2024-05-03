import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Command_view_file } from "@/lib/file"
import { BaseDirectory, createDir, exists, writeTextFile } from "@tauri-apps/api/fs"

const prefix = "snippets\\"

export function Share() {
    const [value, setValue] = useState<string>("")

    const [process, setProcess] = useState<number>(0)
    function download(value: string) {
        if (!value) return
        setProcess(0)
        const _value = JSON.parse(value)
        let cur = 0;
        const length = _value.length
        _value.forEach(async (element: Command_view_file) => {
            if (element.is_dir) {
                if (!await exists(prefix + element.name, { dir: BaseDirectory.AppData })) {
                    await createDir(prefix + element.name, { dir: BaseDirectory.AppData })
                }
                element.children?.forEach(async (child: Command_view_file) => {
                    if (await exists(prefix + element.name + '\\' + child.name + '.md', { dir: BaseDirectory.AppData })) return
                    await writeTextFile(prefix + element.name + '\\' + child.name + '.md', child.rawContent!, { dir: BaseDirectory.AppData })
                })
                cur++;
                setProcess(cur / length * 500)
                return
            }
            if (await exists(prefix + element.name, { dir: BaseDirectory.AppData })) {
                cur++;
                setProcess(cur / length * 500)
                return
            }
            await writeTextFile(prefix + element.name, element.rawContent!, { dir: BaseDirectory.AppData })
            cur++;
            setProcess(cur / length * 500)
            return
        });
    }

    return <div className="h-[400px] w-[500px]">
        <span className="inline-block h-[4px] bg-red-300 absolute top-0" style={{ width: process }}></span>
        <Textarea className=" h-[360px] w-full" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button variant="outline" size='sm' onClick={() => download(value)}>导入</Button>
    </div>
}