import { useMemo, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import TinyEditor from "./Editor/TinyEditor";
import NoteTitle from "./NoteTitle";
import { findNote } from "../utilities/utils";
import api from "../axios_config/api";
import Banner from "./Banner";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../features/note/noteSlice";

function MainContentWrapper() {
  const { isDeleting, noteIdDelete } = useOutletContext();
  const [isSaving, setIsSaving] = useState(false);
  const [editorRef, setEditorRef] = useState(null);
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const { notes, status } = useSelector((state) => state.note);

  const note = useMemo(() => findNote(notes, noteId), [notes, noteId]);

  async function handleOnSave(currentNoteId) {
    if (!editorRef) return;
    setIsSaving(true);
    try {
      await dispatch(
        updateNote({
          noteId: currentNoteId,
          content: editorRef.getContent(),
        })
      ).unwrap();
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaving(false);
    }
  }

  function handleEditorRef(editor) {
    setEditorRef(editor);
  }

  return (
    <>
      <NoteTitle
        title={note?.title}
        isSaving={isSaving}
        handleOnSave={handleOnSave}
        editorRef={editorRef}
        currentNoteId={note?._id}
      />
      <TinyEditor
        noteContent={note?.content}
        handleEditorRef={handleEditorRef}
        isDeleting={isDeleting}
      />
      {isDeleting && noteIdDelete === noteId ? (
        <Banner
          message="Deleting"
          className="text-center top-[10%] absolute bg-red-500 text-white w-full z-10"
        />
      ) : null}
    </>
  );
}

export default MainContentWrapper;
