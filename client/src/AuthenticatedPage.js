import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { useAuth } from "./context/auth-context";
import axios from "./axiosConfig/axiosConfig";
import Wrapper from "./components/Wrapper";
import { useCookies } from "react-cookie";

function AuthenticatedPage() {
  const [notes, setNotes] = useState({
    data: [],
    status: "idle",
  });
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { user } = auth;

  console.log(notes, "from parent component");
  useEffect(() => {
    if (!auth.isAuthenticated) return navigate("/", { replace: true });
    setNotes({
      status: "loading",
      data: [],
    });

    axios
      .get("/notes", {
        params: { userId: user.userId },
      })
      .then(({ data }) => {
        if (!data.notes.length)
          return setNotes({ data: data.notes, status: "resolved" });

        const firstNoteId = data.notes[0]._id;
        setNotes({ data: data.notes, status: "resolved" });
        navigate(`/note/${firstNoteId}`, { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated, user]);
  console.log(auth, "rendering authenticated page");

  return (
    <Wrapper>
      {auth.isAuthenticated ? (
        <div className="w-[80vw] mx-auto max-w-[51rem] h-[600px] flex flex-row">
          <NavigationBar notes={notes} setNotes={setNotes} />
          <div className="flex flex-col bg-white w-full rounded-t-md border">
            {notes.data.length && notes.status === "resolved" ? (
              <Outlet
                context={{
                  notes: notes.data,
                  setNotes,
                }}
              />
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
}

export default AuthenticatedPage;
