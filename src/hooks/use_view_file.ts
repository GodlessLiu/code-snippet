import { Command_view_file, generate_commad_view_file } from "@/lib/file";
import { readDir, BaseDirectory, FileEntry } from "@tauri-apps/api/fs";


interface Read_data_file_to_view_file_return {
    entries: FileEntry[],
    command_view_file: Command_view_file[],
    copy_view_file: Command_view_file[]
}
// 读取Data文件夹下的文件并且生成相应的文件信息
export function read_data_file_to_view_file(): Promise<Read_data_file_to_view_file_return> {
    return new Promise((resolve, reject) => {
        readDir('snippets', { dir: BaseDirectory.AppData, recursive: true }).then(async (entries) => {
            const { command_view_file, copy_view_file } = await generate_commad_view_file(entries);
            resolve({ entries, command_view_file, copy_view_file })
        }).catch(e => {
            reject(e)
        })
    })
}