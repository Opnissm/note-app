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
  const [noteIdDelete, setNoteIdDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  function handleNoteDeleting(booleanVal) {
    setIsDeleting(booleanVal);
  }

  async function onAddNoteClick() {
    api
      .post("/notes")
      .then(({ data }) => {
        setNotes({ data: data.notes, status: "resolved" });
        if (data.notes.length === 1) {
          const firstNoteId = data.notes[0]._id;
          navigate(`/note/${firstNoteId}`, { replace: true });
        }
      })
      .catch((err) => console.log(err));
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

  console.log(notes);
  return (
    <Wrapper>
      {isAuthenticated ? (
        <div className="w-[80vw] mx-auto h-[600px] max-w-[63.125rem] flex flex-row">
          <NavigationBar
            notes={notes}
            setNotes={setNotes}
            setNoteIdDelete={setNoteIdDelete}
            handleNoteDeleting={handleNoteDeleting}
            onAddNoteClick={onAddNoteClick}
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
            ) : null}

            {!notes.data.length && notes.status === "resolved" ? (
              <div className="flex flex-col items-center pt-20">
                <h1 className="text-2xl font-semibold">You don't have notes</h1>
                <button
                  className="underline text-amber-400"
                  onClick={onAddNoteClick}
                >
                  Create one
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
}

export default AuthenticatedPage;
