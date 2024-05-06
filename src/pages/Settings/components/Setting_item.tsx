import { FC, PropsWithChildren } from "react";

interface Props {
    title: string
}
export const Setting_item: FC<PropsWithChildren<Props>> = ({ children, title }) => {
    return <><div className="flex justify-between items-center">
        <span className="font-bold">
            {title}
        </span>
        {children}
    </div>
    </>
}