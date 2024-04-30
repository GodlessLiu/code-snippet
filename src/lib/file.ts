import { FileEntry, readTextFile } from "@tauri-apps/api/fs";
import jsYaml from 'js-yaml';

export interface Command_view_file {
    is_dir: boolean,
    name: string,
    label?: string,
    children?: Command_view_file[],
    content?: string
}
interface MetaInfo {
    label: string
}

export async function generate_commad_view_file(entries: FileEntry[]): Promise<Command_view_file[]> {
    const command_view_file: Command_view_file[] = [];
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (entry.children?.length) {
            command_view_file.push({
                is_dir: true,
                name: entry.name!,
                children: await generate_commad_view_file(entry.children)
            })
        } else {
            const _content = await readTextFile(entry.path);
            const content = _content.replace(/(---[\s\n\t]*.*[\s\n\t]*---[\s\n\t]*)/, '');
            console.log(content);
            const [meta, _] = jsYaml.loadAll(_content) as [MetaInfo, string];
            command_view_file.push({
                is_dir: false,
                name: entry.name!.slice(0, -3),
                label: meta.label,
                content: content
            })
        }
    }
    return command_view_file;
}








