import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import { useAuth } from "./context/auth-context";
import TinyEditor from "./components/TinyEditor";

function AuthenticatedPage() {
  const { auth } = useAuth();
  const [notes, setNotes] = useState([]);

  if (!auth.isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="w-full bg-slate-50 h-screen">
      <div className="w-[85vw] mx-auto max-w-7xl h-[600px] flex flex-row">
        <NavigationBar notes={notes} />
        <TinyEditor />
      </div>
    </div>
  );
}

export default AuthenticatedPage;
