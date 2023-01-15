import { useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import TinyEditor from "./TinyEditor";
import NoteTitle from "./NoteTitle";
import { findNote } from "../utilities/utils";
import axios from "../axiosConfig/axiosConfig";

function MainContentWrapper() {
  const [contentTypingStatus, setContentTypingStatus] = useState("idle");
  const { notes, setNotes } = useOutletContext();
  const [editorRef, setEditorRef] = useState(null);
  const { noteId } = useParams();

  const note = useMemo(() => findNote(notes, noteId), [notes, noteId]);

  function handleOnSave(currentNoteId) {
    if (!editorRef) return;

    axios
      .put("/notes", {
        noteId: currentNoteId,
        content: editorRef.getContent(),
      })
      .then(({ data }) => setNotes({ data: data.notes, status: "resolved" }))
      .catch((err) => console.log(err));
  }
  function handleContentTypingStatus(value) {
    setContentTypingStatus(value);
  }

  function handleEditorRef(editor) {
    setEditorRef(editor);
  }

  return (
    <>
      <NoteTitle
        title={note.title}
        handleOnSave={handleOnSave}
        contentTypingStatus={contentTypingStatus}
        editorRef={editorRef}
        currentNoteId={note._id}
      />
      <TinyEditor
        currentNoteId={note._id}
        noteContent={note.content}
        handleContentTypingStatus={handleContentTypingStatus}
        handleEditorRef={handleEditorRef}
      />
    </>
  );
}

export default MainContentWrapper;
