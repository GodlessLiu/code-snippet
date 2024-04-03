import { listen } from '@tauri-apps/api/event';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { useCallback, useEffect, useRef, useState } from "react";
import { MFileEntry, useFile } from "@/lib/file";
import { appWindow } from '@tauri-apps/api/window';
import { watch } from "tauri-plugin-fs-watch-api";
import { appDataDir } from '@tauri-apps/api/path';
import { use_state_windows } from '@/hooks/use_state_window';
import { invoke } from '@tauri-apps/api';
import { writeText } from '@tauri-apps/api/clipboard';

export function Command_view() {
    const searh_input_ref = useRef<HTMLInputElement>(null);
    const { read_data_dir, read_file } = useFile();
    const [group, set_group] = useState<MFileEntry[]>([]);
    const generate_group = useCallback(() => {
        read_data_dir().then((data) => {
            set_group(data);
        })
    }, [])
    // 保存窗口x，y位置
    use_state_windows();
    const [query, set_query] = useState<string>('');
    const search_input_focus = useCallback(() => {
        if (searh_input_ref.current) {
            searh_input_ref.current.focus();
        }
    }, [])
    useEffect(() => {
        search_input_focus();
        appWindow.setFocus();
        listen("handle_show", async (_) => {
            search_input_focus();
        })
    }, [])
    useEffect(() => {
        generate_group();
        appDataDir().then((dir) => {
            watch(
                dir + '/snippets',
                (_: any) => {
                    generate_group();
                },
                { recursive: true },
            );
        })
    }, [])
    async function handleSelect(path: string) {
        const data = await read_file(path);
        await writeText(data);
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
                                                            <CommandItem onSelect={() => handleSelect(child.path)} key={child.path}>
                                                                <span className='inline-block h-[9px] w-[9px] rotate-45 mr-2 bg-red-600'></span> <span>{child.name}</span>
                                                                <span className='ml-2 text-xs bg-gray-50 px-1 absolute right-2 border-2'>{child.label}</span>
                                                            </CommandItem>
                                                        )
                                                    })
                                                }
                                            </CommandGroup>
                                            < CommandSeparator />
                                        </> : <CommandItem onSelect={() => handleSelect(item.path)} key={item.path} className=' ml-1'>
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