import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";

// ROUTES EVERTALE
import Evertale from "./routes/Evertale";
import EvertaleCharList from "./routes/EvertaleCharList";
import EvertaleAddChar from "./routes/EvertaleAddChar";
import EvertaleStoryList from "./routes/EvertaleStoryList";
import EvertaleChar from "./routes/EvertaleChar";
import EvertaleConjures from "./routes/EvertaleConjures";
import EvertaleEditConjures from "./routes/EvertaleEditConjures.jsx";
import EvertaleAddConjures from "./routes/EvertaleAddConjures";
import EvertaleCharDetails from "./routes/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/evertale",
    element: <Evertale />,
  },
  {
    path: "/evertale/charlist",
    element: <EvertaleCharList />,
  },
  {
    path: "/evertale/storylist",
    element: <EvertaleStoryList />,
  },
  {
    path: "/evertale/char/details/:charName",
    element: <EvertaleCharDetails />,
  },
  {
    path: "/evertale/char",
    element: <EvertaleChar />,
  },
  {
    path: "/evertale/conjures",
    element: <EvertaleConjures />,
  },
  {
    path: "/evertale/conjures/edit/:name",
    element: <EvertaleEditConjures />,
  },
  {
    path: "/evertale/char/add",
    element: <EvertaleAddChar />,
  },
  {
    path: "/evertale/conjures/add",
    element: <EvertaleAddConjures />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
