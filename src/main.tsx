import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "../app/globals.css";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { Share } from "@/pages/Share";
import { Settings } from "@/pages/Settings";
import { Command_view } from "@/pages/App/command_view";
import { Setup } from "@/process/Setup";
import { init_i18n } from "@/process/i18n";
const router = createBrowserRouter([
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
init_i18n();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Setup>
    <RouterProvider router={router} />
  </Setup>
);
