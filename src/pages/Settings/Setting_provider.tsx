import { Font_wrapper } from "@/pages/Settings/contexts/Font_context"
import { Language_wrapper } from "@/pages/Settings/contexts/Language_context"
import { Position_wrapper } from "@/pages/Settings/contexts/Position_context"
import { Theme_wrapper } from "@/pages/Settings/contexts/theme_context"
import { FC, PropsWithChildren } from "react"

export const Setting_wrapper: FC<PropsWithChildren> = ({ children }) => {
    return <Font_wrapper>
        <Theme_wrapper>
            <Language_wrapper>
                <Position_wrapper>
                    {children}
                </Position_wrapper>
            </Language_wrapper>
        </Theme_wrapper>
    </Font_wrapper>
}

