import { useMemo, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import TinyEditor from "./Editor/TinyEditor";
import NoteTitle from "./NoteTitle";
import { findNote } from "../utilities/utils";
import api from "../axios_config/api";
import Banner from "./Banner";

function MainContentWrapper() {
  const { notes, setNotes, isDeleting, noteIdDelete } = useOutletContext();
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
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSaving(false));
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
        noteContent={note.content}
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
