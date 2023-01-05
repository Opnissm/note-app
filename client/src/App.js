import { Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/auth-context";
import UnauthenticatedPage from "./UnauthenticatedPage";

function App() {
  const { auth } = useAuth();
  return (
    <div className="w-screen h-screen bg-slate-50">
      {auth.isAuthenticated ? (
        <Navigate to="/note" replace={true} />
      ) : (
        <UnauthenticatedPage />
      )}
    </div>
  );
}
export default App;
