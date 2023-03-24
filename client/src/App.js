import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthenticatedPage from "./pages/AuthenticatedPage";
import MainContentWrapper from "./pages/Main/components/MainContentWrapper";
import { AuthProvider } from "./context/auth-context";
import Start from "./pages/Start";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import UnauthenticatedPageLayout from "./layouts/UnauthenticatedPageLayout";
import AuthenticatedPageLayout from "./layouts/AuthenticatedPageLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route element={<UnauthenticatedPageLayout />}>
        <Route path="/" element={<Start />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
      </Route>
      <Route element={<AuthenticatedPageLayout />}>
        <Route path="/note" element={<AuthenticatedPage />}>
          <Route path=":noteId" element={<MainContentWrapper />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
