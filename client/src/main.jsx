import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Evertale from "./routes/Evertale";
import EvertaleCharList from "./routes/EvertaleCharList";
import EvertaleStoryList from "./routes/EvertaleStoryList";
import AdminAddChar from "./routes/AdminAddChar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Evertale",
    element: <Evertale />,
  },
  {
    path: "/Evertale/CharList",
    element: <EvertaleCharList />,
  },
  {
    path: "/Evertale/StoryList",
    element: <EvertaleStoryList />,
  },
  {
    path: "/Admin/Evertale/Add/Char",
    element: <AdminAddChar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
