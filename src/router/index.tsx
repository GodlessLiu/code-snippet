import { createBrowserRouter } from "react-router-dom";
import App from "../";
import { Settings } from "@/pages/Settings";
import { Command_view } from "@/pages/App/command_view";
import { Share } from "@/pages/Share";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Command_view />,
            },
            {
                path: '/settings',
                element: <Settings />
            }
        ]
    },
    {
        path: '/share',
        element: <Share />
    }
]);