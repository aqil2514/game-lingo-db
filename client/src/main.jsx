import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Register from "./routes/Register.jsx";
import Admin from "./routes/Admin.jsx";

// ROUTES EVERTALE
import Evertale from "./routes/evertale/Evertale.jsx";
import EvertaleCharList from "./routes/evertale/EvertaleCharList.jsx";
import EvertaleAddChar from "./routes/evertale/EvertaleAddChar.jsx";
import EvertaleStoryList from "./routes/evertale/EvertaleStoryList.jsx";
import EvertaleChar from "./routes/evertale/EvertaleChar.jsx";
import EvertaleConjures from "./routes/evertale/EvertaleConjures.jsx";
import EvertaleEditConjures from "./routes/evertale/EvertaleEditConjures.jsx";
import EvertaleAddConjures from "./routes/evertale/EvertaleAddConjures.jsx";
import EvertaleCharDetails from "./routes/evertale/Details.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <Admin />,
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
