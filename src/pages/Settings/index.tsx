import { MdiKeyboardReturn } from "@/components/icons/return";
import { useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SettingContext } from "@/pages/Settings/Setting_provider";
import { useContext } from "react";
export const Settings = () => {
    const navigate = useNavigate();
    function handle_return() {
        navigate('/');
    }
    const { font_familys, font_family, change_font } = useContext(SettingContext)
    const handle_value_change = (e: string) => {
        change_font(e)
    }
    return <div className="settings px-2">
        <p className=" justify-end flex pt-1"><MdiKeyboardReturn className="cursor-pointer" onClick={handle_return} /></p>
        <div className="setting_content pt-2">
            <div className="flex justify-between items-center">
                <span className="font-bold">
                    系统字体：
                </span>
                <Select value={font_family.name} onValueChange={(e: string) => handle_value_change(e)}>
                    <SelectTrigger className="w-[90px]">
                        <SelectValue placeholder={font_family.name} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            font_familys?.map(font => {
                                return <SelectItem key={font.name} value={font.name}>{font.name}</SelectItem>
                            })
                        }
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
}