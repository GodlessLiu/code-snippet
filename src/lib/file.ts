import { readDir, BaseDirectory, readTextFile, FileEntry } from "@tauri-apps/api/fs";

export type MFileEntry = Pick<FileEntry, 'path' | 'name'> & { is_dir: boolean, label: string, children?: MFileEntry[] }

interface MetaInfo {
    label: string
    name: string
}

function get_meta_info_by_name(name: string): MetaInfo {
    if (!name.endsWith(".rss")) return { label: 'default', name: '输入符合系统规则的名字' };
    const _name = name.split(".");
    const meta = {
        label: _name[1] != 'rss' ? _name[1] : 'default',
        name: _name[0]
    }
    return meta
}

export function useFile() {
    async function read_data_dir(): Promise<MFileEntry[]> {
        const dir = await readDir('snippets', { dir: BaseDirectory.AppData, recursive: true });
        return format_file_dir(dir);
    }
    async function read_file(path: string) {
        return await readTextFile(path);
    }
    function format_file_dir(dir: FileEntry[]): MFileEntry[] {
        return dir.map((item) => {
            if (item.children) {
                return {
                    path: item.path,
                    is_dir: true,
                    children: format_file_dir(item.children),
                    name: item.name!,
                    label: item.name!
                }
            }
            return {
                path: item.path,
                is_dir: false,
                ...get_meta_info_by_name(item.name!)
            }
        })
    }
    return {
        read_data_dir,
        read_file,
    }
}