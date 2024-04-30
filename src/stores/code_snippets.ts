import { FileEntry } from '@tauri-apps/api/fs';
import { create } from 'zustand';

interface UseCodeSnippetsStore {
    fileEntry: FileEntry[],
    init_code_snippets_store: (fileEntry: FileEntry[], command_view_file: any) => void,
    command_view_file: any
}

export const use_code_snippets_store = create<UseCodeSnippetsStore>((set) => ({
    fileEntry: [],
    command_view_file: [],
    init_code_snippets_store: (fileEntry: FileEntry[], command_view_file: any) => set({ fileEntry, command_view_file }),
}))