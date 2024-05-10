import ReactDOM from "react-dom/client";
import "../app/globals.css";
import { Setup } from "@/process/Setup";
import { init_i18n } from "@/process/i18n";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

init_i18n();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Setup>
    <RouterProvider router={router} />
  </Setup>
);
