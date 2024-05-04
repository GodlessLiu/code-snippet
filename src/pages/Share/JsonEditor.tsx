import { FC } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

interface Props {
    value: string;
    setValue: (value: string) => void;
}

export const JsonEditor: FC<Props> = ({ value, setValue }) => {
    return <AceEditor
        mode="json"
        theme="github"
        height="360px"
        value={value}
        onChange={setValue}
        name="code_share"
        fontSize={14}
        lineHeight={19}
        setOptions={{
            tabSize: 2
        }}
        editorProps={{ $blockScrolling: true }}
    />
}

