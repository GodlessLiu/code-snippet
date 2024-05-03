import { Command_view_file } from '@/lib/file';
import { FileEntry } from '@tauri-apps/api/fs';
import { create } from 'zustand';

interface UseCodeSnippetsStore {
    fileEntry: FileEntry[],
    init_code_snippets_store: (fileEntry: FileEntry[], command_view_file: Command_view_file[], copy_view_file: Command_view_file[]) => void,
    command_view_file: Command_view_file[],
    copy_view_file: Command_view_file[]
}

export const use_code_snippets_store = create<UseCodeSnippetsStore>((set) => ({
    fileEntry: [],
    command_view_file: [],
    copy_view_file: [],
    init_code_snippets_store: (fileEntry: FileEntry[], command_view_file: Command_view_file[], copy_view_file: Command_view_file[]) => set({ fileEntry, command_view_file, copy_view_file }),
}))