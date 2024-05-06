import Options from "@/components/Options";
import { Command_view_file } from "@/lib/file";
import { use_code_snippets_store } from "@/stores/code_snippets";
import { listen } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { useRef, useCallback, useEffect, useState } from "react";
import { watch } from 'tauri-plugin-fs-watch-api';
import { invoke } from "@tauri-apps/api";
import { writeText } from "@tauri-apps/api/clipboard";
import { read_data_file_to_view_file } from "@/hooks/use_view_file";
import { data_snippets_path } from "@/lib/path";
import Iyuan from "@/assets/images/iyuan.png";
import labelBg from "@/assets/images/label_bg.png";
import { TitleBar } from "@/components/TitleBar";
import { useTranslation } from "react-i18next";

export function Command_view() {
    const { t } = useTranslation()
    const searh_input_ref = useRef<HTMLInputElement>(null);
    const [group, set_group] = useState<Command_view_file[]>([]);
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
        data_snippets_path().then((path) => {
            watch(
                path,
                (_: any) => {
                    read_data_file_to_view_file().then(({ entries, command_view_file, copy_view_file }) => {
                        set_file_entries(entries, command_view_file, copy_view_file);
                        set_group(command_view_file);
                    })
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
    function format_name(name: string) {
        return name.slice(0, -3)
    }
    return (
        <Command>
            <TitleBar />
            <Options />
            <CommandInput placeholder={t("home.search_text")} ref={searh_input_ref} value={query} onValueChange={set_query} />
            <CommandList className='list outline-none'>
                <CommandEmpty>{t("home.snippet_not_find")}</CommandEmpty>
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
                                                            <CommandItem onSelect={() => handleSelect(child.content!)} key={child.name}>
                                                                <span className='inline-block h-[20px] w-[20px] mr-1 bg-cover' style={{ backgroundImage: `url('${Iyuan}')` }}></span> <span>{format_name(child.name)}</span>
                                                                <span className='ml-2 text-xs bg-gray-50 px-1 absolute right-2 border-2'>
                                                                    {child.label}
                                                                    <span className="inline-block bg-cover h-5 w-5 absolute -top-[10px]" style={{ backgroundImage: `url(${labelBg})` }}></span>
                                                                </span>
                                                            </CommandItem>
                                                        )
                                                    })
                                                }
                                            </CommandGroup>
                                            < CommandSeparator />
                                        </> : <CommandItem className='ml-1' onSelect={() => handleSelect(item.content!)} key={item.name!}>
                                            <span className='inline-block h-[20px] w-[20px] mr-1 bg-cover' style={{ backgroundImage: `url('${Iyuan}')` }}></span> <span>{format_name(item.name)}</span>
                                            <span className='ml-2 text-xs bg-gray-50 px-1 absolute right-3 border-2'>
                                                {item.label}
                                                <span className="inline-block bg-cover h-5 w-5 absolute -top-[10px]" style={{ backgroundImage: `url(${labelBg})` }}></span>
                                            </span>
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



