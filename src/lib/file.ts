import { BaseDirectory, FileEntry, createDir, exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { default as matter } from 'gray-matter';

export interface Command_view_file {
    is_dir: boolean,
    name: string,
    label?: string,
    children?: Command_view_file[],
    content?: string,
    rawContent?: string
}

interface Generate_commad_view_file_return {
    command_view_file: Command_view_file[],
    copy_view_file: Command_view_file[]
}

export async function generate_commad_view_file(entries: FileEntry[]): Promise<Generate_commad_view_file_return> {
    const command_view_file: Command_view_file[] = [];
    const copy_view_file: Command_view_file[] = [];
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (entry.children) {
            const data = {
                is_dir: true,
                name: entry.name!,
                children: await generate_commad_view_file(entry.children)
            }
            command_view_file.push({
                ...data,
                children: data.children.command_view_file
            })
            copy_view_file.push({
                ...data,
                children: data.children.copy_view_file
            })
        } else {
            const _content = await readTextFile(entry.path);
            const { content, data: meta } = matter(_content)
            const data = {
                is_dir: false,
                name: entry.name!,
                label: meta.label,
                content: content,
                rawContent: _content
            }
            command_view_file.push(data)
            if (!meta.is_private) {
                copy_view_file.push({
                    ...data
                })
            }
        }
    }
    return {
        command_view_file,
        copy_view_file
    };
}


export const prefix = "snippets\\"

export function snippet_exist(sub_path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        exists(prefix + sub_path, { dir: BaseDirectory.AppData }).then((exist) => {
            resolve(exist)
        }).catch(e => {
            reject(e)
        })
    })
}


export function create_snippet_dir(sub_path: string): Promise<void> {
    return new Promise((resolve, reject) => {
        createDir(prefix + sub_path, { dir: BaseDirectory.AppData }).then(() => {
            resolve()
        }).catch(e => {
            reject(e)
        })
    })
}

export function write_snippet_file(sub_path: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
        writeTextFile(prefix + sub_path, content, { dir: BaseDirectory.AppData }).then(() => {
            resolve()
        }).catch(e => {
            reject(e)
        })
    })
}