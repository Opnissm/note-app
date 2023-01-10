import { CookiesProvider } from "react-cookie";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/auth-context";
import AuthenticatedPage from "./AuthenticatedPage";
import "./index.css";
import App from "./App";
import TinyEditor from "./components/TinyEditor";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route path="/" element={<App />} />
      <Route path="/note" element={<AuthenticatedPage />}>
        <Route path=":noteId" element={<TinyEditor />} />
      </Route>
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
