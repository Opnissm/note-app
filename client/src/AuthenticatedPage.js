import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { useAuth } from "./context/auth-context";
import api from "./axiosConfig/axiosConfig";
import Wrapper from "./components/Wrapper";
import { useCookies } from "react-cookie";

function AuthenticatedPage() {
  const [notes, setNotes] = useState({
    data: [],
    status: "idle",
  });
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [noteIdDelete, setNoteIdDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleNoteDeleting(booleanVal) {
    setIsDeleting(booleanVal);
  }

  useEffect(() => {
    if (!isAuthenticated) return navigate("/", { replace: true });
    setNotes({
      status: "loading",
      data: [],
    });

    api
      .get("/notes", {
        params: { userId: user.userId },
      })
      .then(({ data }) => {
        if (!data.notes.length)
          return setNotes({ data: [], status: "resolved" });
        setNotes({ data: data.notes, status: "resolved" });
        const firstNoteId = data.notes[0]._id;
        navigate(`/note/${firstNoteId}`, { replace: true });
      })
      .catch(() => {
        navigate("/", { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  return (
    <Wrapper>
      {isAuthenticated ? (
        <div className="w-[80vw] mx-auto h-[600px] max-w-[63.125rem] flex flex-row">
          <NavigationBar
            notes={notes}
            setNotes={setNotes}
            setNoteIdDelete={setNoteIdDelete}
            handleNoteDeleting={handleNoteDeleting}
          />
          <div className="flex flex-col bg-white w-[78%] rounded-t-md border relative">
            {notes.data.length && notes.status === "resolved" ? (
              <Outlet
                context={{
                  notes: notes.data,
                  setNotes,
                  isDeleting,
                  noteIdDelete,
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
