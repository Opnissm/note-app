import React from "react";
import ReactDOM from "react-dom/client";

import { CookiesProvider } from "react-cookie";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthenticatedApp from "./AuthenticatedApp";
// import { AuthProvider } from "./context/auth-context";

import { AuthProvider } from "./context/auth-context";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route path="/" element={<App />} />
      <Route path="/note" element={<AuthenticatedApp />} />
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </RouterProvider>
);
