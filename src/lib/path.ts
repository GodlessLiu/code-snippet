import { appDataDir } from "@tauri-apps/api/path";

export function data_snippets_path(): Promise<string> {
    return new Promise((resolve, reject) => {
        appDataDir().then((dir) => {
            resolve(dir + 'snippets');
        }).catch(e => {
            reject(e)
        })
    })
}