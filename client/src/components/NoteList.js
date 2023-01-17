import React, { useEffect, useState } from "react";
import Note from "./Note";

function NoteList({ notes, setNotes }) {
  const [noteDropdownIndex, setNoteDropdownIndex] = useState(null);

  function handleNoteDropdownIndex(indexNum) {
    setNoteDropdownIndex(indexNum);
  }

  return (
    <>
      {notes.status === "loading" && <h1>Loading notes...</h1>}
      {notes.status === "resolved" &&
        notes.data.length &&
        notes.data.map((note, idx) => (
          <Note
            id={note._id}
            content={note.content}
            title={note.title}
            key={note._id}
            idx={idx}
            setNotes={setNotes}
            noteDropdownIndex={noteDropdownIndex}
            handleNoteDropdownIndex={handleNoteDropdownIndex}
          />
        ))}
    </>
  );
}

export default NoteList;
