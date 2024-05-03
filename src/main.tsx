import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "../app/globals.css";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { Share } from "@/pages/Share";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/share',
    element: <Share />
  }
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
