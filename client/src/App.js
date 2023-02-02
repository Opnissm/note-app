import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthenticatedPage from "./components/pages/AuthenticatedPage";
import MainContentWrapper from "./components/MainContentWrapper";
import { AuthProvider } from "./context/auth-context";
import UnauthenticatedPage from "./components/pages/UnauthenticatedPage";
import UnauthenticatedPageWrapper from "./components/pages/wrappers/UnauthenticatedPageWrapper";
import ForgotPassword from "./components/Form/ForgotPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route element={<UnauthenticatedPageWrapper />}>
        <Route path="/" element={<UnauthenticatedPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/note" element={<AuthenticatedPage />}>
        <Route path=":noteId" element={<MainContentWrapper />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
