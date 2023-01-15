import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthenticatedPage from "./AuthenticatedPage";
import MainContentWrapper from "./components/MainContentWrapper";
import { AuthProvider } from "./context/auth-context";
import UnauthenticatedPage from "./UnauthenticatedPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route path="/" element={<UnauthenticatedPage />} />
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
