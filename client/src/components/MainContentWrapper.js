import { useMemo, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import TinyEditor from "./TinyEditor";
import NoteTitle from "./NoteTitle";
import { findNote } from "../utilities/utils";
import api from "../axiosConfig/axiosConfig";

function MainContentWrapper() {
  const { notes, setNotes } = useOutletContext();
  const [isSaving, setIsSaving] = useState(false);
  const [editorRef, setEditorRef] = useState(null);
  const { noteId } = useParams();

  const note = useMemo(() => findNote(notes, noteId), [notes, noteId]);

  function handleOnSave(currentNoteId) {
    if (!editorRef) return;
    setIsSaving(true);
    api
      .put("/notes", {
        noteId: currentNoteId,
        content: editorRef.getContent(),
        updateField: "content",
      })
      .then(({ data }) => {
        setNotes({ data: data.notes, status: "resolved" });
        setIsSaving(false);
      })
      .catch((err) => console.log(err));
  }

  function handleEditorRef(editor) {
    setEditorRef(editor);
  }

  return (
    <>
      <NoteTitle
        title={note.title}
        isSaving={isSaving}
        handleOnSave={handleOnSave}
        editorRef={editorRef}
        currentNoteId={note._id}
      />
      <TinyEditor
        currentNoteId={note._id}
        noteContent={note.content}
        handleEditorRef={handleEditorRef}
      />
    </>
  );
}

export default MainContentWrapper;
