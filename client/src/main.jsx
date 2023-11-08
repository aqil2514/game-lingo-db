import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Evertale from "./routes/Evertale";
import EvertaleCharList from "./routes/EvertaleCharList";
import EvertaleAddChar from "./routes/EvertaleAddChar";
import EvertaleStoryList from "./routes/EvertaleStoryList";
import EvertaleChar from "./routes/EvertaleChar";
import Details from "./routes/Details";

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
    path: "/Evertale/Char/Details/:charName",
    element: <Details />,
  },
  {
    path: "/Evertale/Char",
    element: <EvertaleChar />,
  },
  {
    path: "/evertale/char/add",
    element: <EvertaleAddChar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
