
export interface Snippet {
    name: string,
    dir: string,
    content: string
}


// export async function export_snippets(): Promise<Snippet[]> {
//     const snippets: Snippet[] = [];
//     const entries = await readDir('snippets', { dir: BaseDirectory.AppData, recursive: true });
//     for (let i = 0; i < entries.length; i++) {
//         const entry = entries[i];
//         if (entry.children?.length) {
//             for (let j = 0; j < entry.children.length; j++) {
//                 const child = entry.children[j];
//                 const content = await readTextFile(child.path);
//                 snippets.push({
//                     dir: entry.name!,
//                     name: child.name!,
//                     content
//                 })
//             }
//         } else {
//             const content = await readTextFile(entry.path);
//             snippets.push({
//                 name: entry.name!,
//                 dir: '-1',
//                 content
//             })
//         }
//     }
//     return snippets;
// }   