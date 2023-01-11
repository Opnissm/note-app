import { useMemo, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import TinyEditor from "./TinyEditor";
import NoteTitle from "./NoteTitle";
import { findNote } from "../utilities/utils";

function MainContentWrapper() {
  const [contentTypingStatus, setContentTypingStatus] = useState("idle");
  const { notes } = useOutletContext();
  const { noteId } = useParams();
  const note = useMemo(() => findNote(notes, noteId), [notes, noteId]);

  console.log(note);
  function handleContentTypingStatus(value) {
    setContentTypingStatus(value);
  }

  return (
    <>
      <NoteTitle title={note.title} contentTypingStatus={contentTypingStatus} />
      <TinyEditor
        noteContent={note.content}
        handleContentTypingStatus={handleContentTypingStatus}
      />
    </>
  );
}

export default MainContentWrapper;
