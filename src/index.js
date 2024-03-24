import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./Routes/NYCSchoolsHome";
import routes from "./shared/routes/routes";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom"; // Application Routing
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "text-encoding";

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
