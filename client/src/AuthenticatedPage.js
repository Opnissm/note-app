import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import { useAuth } from "./context/auth-context";
import TinyEditor from "./components/TinyEditor";

function AuthenticatedPage() {
  const { auth } = useAuth();
  const [notes, setNotes] = useState([]);

  // useEffect(() => {

  // }, []);
  console.log(auth);
  if (!auth.isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="w-full bg-slate-50 h-screen">
      <div className="w-[85vw] mx-auto">
        <div className="flex flex-row w-full h-[600px]">
          <NavigationBar notes={notes} />
          <TinyEditor />
        </div>
      </div>
    </div>
  );
}

export default AuthenticatedPage;
