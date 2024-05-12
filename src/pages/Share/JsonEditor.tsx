import { FC, useContext } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import { ThemeContext } from "@/pages/Settings/contexts/theme_context";
interface Props {
    value: string;
    setValue: (value: string) => void;
}

export const JsonEditor: FC<Props> = ({ value, setValue }) => {
    const { themes, theme: local } = useContext(ThemeContext)
    return <AceEditor
        mode="json"
        theme="github"
        height="360px"
        value={value}
        onChange={setValue}
        name="code_share"
        fontSize={14}
        className=" bg-cover"
        style={{
            backgroundImage: `url(${themes[local].share_editor_bg})`,
            backgroundColor: "rgba(255,255,255,0.8)"
        }}
        lineHeight={19}
        setOptions={{
            tabSize: 2
        }}
        editorProps={{ $blockScrolling: true }}
    />
}

