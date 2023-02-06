import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useAuth } from "../context/auth-context";
import api from "../axios_config/api";
import { useDispatch, useSelector } from "react-redux";
import { addNote, getNotes } from "../features/note/noteSlice";

function AuthenticatedPage() {
  const [noteIdDelete, setNoteIdDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const data = useSelector((state) => {
    return state.note;
  });
  const dispatch = useDispatch();
  function handleNoteDeleting(booleanVal) {
    setIsDeleting(booleanVal);
  }
  async function onAddNoteClick() {
    try {
      const { notes } = await dispatch(addNote()).unwrap();
      if (notes.length === 1) {
        const firstNoteId = notes[0]._id;
        navigate(`/note/${firstNoteId}`, { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (!isAuthenticated) return navigate("/", { replace: true });

    async function fetchNotes() {
      try {
        const { notes } = await dispatch(getNotes(user.userId)).unwrap();
        if (!notes.length) return;
        const firstNoteId = notes[0]._id;
        navigate(`/note/${firstNoteId}`, { replace: true });
      } catch (err) {
        navigate("/", { replace: true });
      } finally {
      }
    }

    fetchNotes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  return isAuthenticated ? (
    <div className="w-[80vw] mx-auto h-[600px] max-w-[63.125rem] flex flex-row">
      <NavigationBar
        setNoteIdDelete={setNoteIdDelete}
        handleNoteDeleting={handleNoteDeleting}
      />
      <div className="flex flex-col bg-white w-[78%] rounded-t-md border relative">
        {data.notes.length && data.status === "resolved" ? (
          <Outlet
            context={{
              isDeleting,
              noteIdDelete,
            }}
          />
        ) : !data.notes.length && data.status === "resolved" ? (
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
  ) : null;
}

export default AuthenticatedPage;
