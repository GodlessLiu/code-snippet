import Options from "@/components/Options";
import { use_state_windows } from "@/hooks/use_state_window";
import { Command_view_file, generate_commad_view_file } from "@/lib/file";
import { use_code_snippets_store } from "@/stores/code_snippets";
import { listen } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { useRef, useCallback, useEffect, useState } from "react";
import { BaseDirectory, appDataDir } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/api/fs";
import { watch } from 'tauri-plugin-fs-watch-api';
import { invoke } from "@tauri-apps/api";
import { writeText } from "@tauri-apps/api/clipboard";

export function Command_view() {
    const searh_input_ref = useRef<HTMLInputElement>(null);
    const [group, set_group] = useState<Command_view_file[]>([]);
    // 保存窗口x，y位置
    use_state_windows();
    const [query, set_query] = useState<string>('');
    const search_input_focus = useCallback(() => {
        if (searh_input_ref.current) {
            searh_input_ref.current.focus();
        }
    }, [])

    const command_view_file = use_code_snippets_store((state) => state.command_view_file);
    const set_file_entries = use_code_snippets_store((state) => state.init_code_snippets_store);
    useEffect(() => {
        set_group(command_view_file);
    }, [])

    useEffect(() => {
        search_input_focus();
        appWindow.setFocus();
        listen("handle_show", async (_) => {
            search_input_focus();
        })
    }, [])
    useEffect(() => {
        appDataDir().then((dir) => {
            watch(
                dir + '/snippets',
                (_: any) => {
                    readDir('snippets', { dir: BaseDirectory.AppData, recursive: true }).then(async entries => {
                        const command_view_file = await generate_commad_view_file(entries);
                        set_file_entries(entries, command_view_file);
                        set_group(command_view_file);
                    });
                },
                { recursive: true },
            );
        })
    }, [])
    async function handleSelect(content: string) {
        await writeText(content);
        appWindow.hide();
        setTimeout(() => {
            invoke("ctrl_v");
        }, 100);
        clear();
    }
    function clear() {
        set_query('');
    }
    return (
        <Command className="rounded-lg border shadow-md w-full h-[384px] overflow-auto">
            <Options />
            <CommandInput placeholder="Type a snippet name to search..." ref={searh_input_ref} value={query} onValueChange={set_query} />
            <CommandList className='list outline-none'>
                <CommandEmpty>No results found.</CommandEmpty>
                {
                    group.length > 0 && group.map((item) => {
                        return (
                            <>
                                {
                                    item.is_dir ?
                                        <>
                                            <CommandGroup heading={item.name} key={item.name}>
                                                {
                                                    item.children && item.children.length > 0 && item.children!.map((child) => {
                                                        return (
                                                            <CommandItem onSelect={() => handleSelect(child.content!)}>
                                                                <span className='inline-block h-[9px] w-[9px] rotate-45 mr-2 bg-red-600'></span> <span>{child.name}</span>
                                                                <span className='ml-2 text-xs bg-gray-50 px-1 absolute right-2 border-2'>{child.label}</span>
                                                            </CommandItem>
                                                        )
                                                    })
                                                }
                                            </CommandGroup>
                                            < CommandSeparator />
                                        </> : <CommandItem className='ml-1' onSelect={() => handleSelect(item.content!)}>
                                            <span className='inline-block h-[9px] w-[9px] rotate-45 mr-2 bg-red-600'></span> <span>{item.name}</span>
                                            <span className='ml-2 text-xs bg-gray-50 px-1 absolute right-2 border-2'>{item.label}</span>
                                        </CommandItem>
                                }

                            </>

                        )
                    })
                }
            </CommandList>
        </Command>
    )
}