import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthenticatedPage from "./pages/AuthenticatedPage";
import MainContentWrapper from "./components/MainContentWrapper";
import { AuthProvider } from "./context/auth-context";
import UnauthenticatedPageLayout from "./pages/layouts/UnauthenticatedPageLayout";
import PasswordReset from "./components/Form/PasswordReset";
import AuthenticatedPageLayout from "./pages/layouts/AuthenticatedPageLayout";
import Start from "./pages/Start";
import ForgotPassword from "./pages/ForgotPassword";

console.log(Start);
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
