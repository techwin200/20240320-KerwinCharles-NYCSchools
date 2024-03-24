import React from "react";
import { RouteObject, Navigate } from "react-router-dom";
import App from "../../App";
import Home from "../../Routes/NYCSchoolsHome";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
];

export default routes;
