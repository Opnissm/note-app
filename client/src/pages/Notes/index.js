import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { useAuth } from "../../context/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { addNote, getNotes } from "../../features/note/noteSlice";

function AuthenticatedPage() {
  const [isInvalidNoteId, setIsInvalidNoteId] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, setAuth } = useAuth();
  const data = useSelector((state) => {
    return state.note;
  });
  const dispatch = useDispatch();
  const { noteId: noteIdParam } = useParams();

  async function onAddNoteClick() {
    try {
      const { notes, errorMsg } = await dispatch(addNote()).unwrap();

      console.log(errorMsg);
      if (notes.length === 1) {
        const firstNoteId = notes[0]._id;
        navigate(`/notes/${firstNoteId}`, { replace: true });
      }
    } catch (err) {
      console.log(err.message.contains("401"));
      if (err.message.contains("401")) {
        setAuth({ user: null, isAuthenticated: false, status: "resolved" });
        navigate("/", { replace: true });
      }
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return navigate("/", { replace: true });
    async function fetchNotes() {
      try {
        const { notes } = await dispatch(getNotes(user.userId)).unwrap();

        if (noteIdParam === undefined) {
          if (notes.length) {
            const firstNoteId = notes[0]._id;
            navigate(`/notes/${firstNoteId}`, { replace: true });
          }
          setIsInvalidNoteId(false);
          return;
        }
        if (notes.findIndex((note) => note._id === noteIdParam) === -1) {
          setIsInvalidNoteId(true);
          return;
        }
      } catch (err) {
        navigate("/", { replace: true });
      } finally {
      }
    }

    fetchNotes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);
  useEffect(() => {
    if (
      data.notes.length &&
      data.notes.findIndex((note) => note._id === noteIdParam) === -1
    ) {
      setIsInvalidNoteId(true);
      return;
    }
    setIsInvalidNoteId(false);
  }, [noteIdParam]);
  return isAuthenticated ? (
    <div className="w-[80vw] mx-auto h-[600px] max-w-[63.125rem] flex flex-row">
      <NavigationBar />
      <div className="flex flex-col bg-white w-[78%] rounded-t-md border relative">
        {!isInvalidNoteId && data.notes.length && data.status === "resolved" ? (
          <Outlet />
        ) : !isInvalidNoteId &&
          !data.notes.length &&
          data.status === "resolved" ? (
          <div className="flex flex-col items-center pt-20">
            <h1 className="text-2xl font-semibold">You don't have notes</h1>
            <button
              className="underline text-amber-400"
              onClick={onAddNoteClick}
            >
              Create one
            </button>
          </div>
        ) : isInvalidNoteId && data.status === "resolved" ? (
          <div className="flex flex-col items-center pt-20">
            <h1 className="text-2xl font-semibold">Can't find note</h1>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
}

export default AuthenticatedPage;
