import React from "react";
import ReactDOM from "react-dom/client";

import { CookiesProvider } from "react-cookie";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./context/auth-context";
import AuthenticatedPage from "./AuthenticatedPage";
import App from "./App";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route path="/" element={<App />} />
      <Route path="/note" element={<AuthenticatedPage />} />
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
