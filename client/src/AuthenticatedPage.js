import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import { useAuth } from "./context/auth-context";
import TinyEditor from "./components/TinyEditor";
import axios from "./axiosConfig/axiosConfig";
import NoteTitle from "./components/NoteTitle";
import Wrapper from "./components/Wrapper";

function AuthenticatedPage() {
  const { auth } = useAuth();
  const { user } = auth;
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(0);

  useEffect(() => {
    if (!user?.userId) return;

    axios
      .get("/notes", {
        params: { userId: user.userId },
      })
      .then(({ data }) => setNotes(data.notes))
      .catch((err) => console.error(err));
  }, []);

  if (!auth.isAuthenticated) return <Navigate to="/" />;

  return (
    <Wrapper>
      <div className="w-[85vw] mx-auto max-w-7xl h-[600px] flex flex-row">
        <NavigationBar notes={notes} currentNote={currentNote} />
        <div className="flex flex-col bg-white w-full rounded-t-md border">
          <NoteTitle title="title" />
          <TinyEditor />
        </div>
      </div>
    </Wrapper>
  );
}

export default AuthenticatedPage;
