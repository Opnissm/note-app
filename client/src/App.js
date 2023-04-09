import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Notes from "./pages/Notes";
import MainContentWrapper from "./pages/Notes/components/MainContentWrapper";
import { AuthProvider } from "./context/auth-context";
import Index from "./pages/Index";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import UnauthenticatedPageLayout from "./layouts/UnauthenticatedPageLayout";
import AuthenticatedPageLayout from "./layouts/AuthenticatedPageLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route element={<UnauthenticatedPageLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
      </Route>
      <Route element={<AuthenticatedPageLayout />}>
        <Route path="/notes" element={<Notes />}>
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
