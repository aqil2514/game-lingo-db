import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";

// GENERAL ROUTES
import Home from "./routes/general/Home.jsx";
import Register from "./routes/general/Register.jsx";
import Admin from "./routes/general/Admin.jsx";
import Dashboard from "./routes/general/Dashboard.jsx";

// General Admin Routes
import DataUsers from "./routes/general-admin/DataUsers.jsx";
// import DetailUser from "./routes/general-admin/DetailUser.jsx";

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

const EvertaleRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Evertale />} />
      <Route path="charlist" element={<EvertaleCharList />} />
      <Route path="storylist" element={<EvertaleStoryList />} />
      <Route path="char/details/:charName" element={<EvertaleCharDetails />} />
      <Route path="char" element={<EvertaleChar />} />
      <Route path="conjures" element={<EvertaleConjures />} />
      <Route path="conjures/edit/:name" element={<EvertaleEditConjures />} />
      <Route path="char/add" element={<EvertaleAddChar />} />
      <Route path="conjures/add" element={<EvertaleAddConjures />} />
    </Routes>
  );
};

const General = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

const GeneralAdmin = () => {
  return (
    <Routes>
      <Route path="/data-users" element={<DataUsers />} />
      {/* <Route path="/data-users/:id" element={<DetailUser />} /> */}
    </Routes>
  );
};

const router = createBrowserRouter([
  {
    path: "/*",
    element: <General />,
  },
  {
    path: "/evertale/*",
    element: <EvertaleRoutes />,
  },
  {
    path: "/forbidden/*",
    element: <GeneralAdmin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
