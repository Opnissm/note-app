import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Note from "./Note";

function NoteList() {
  const data = useSelector((state) => state.note);
  return (
    <>
      {data.status === "loading" ? (
        <h1>Loading notes...</h1>
      ) : data.status === "resolved" && data.notes.length ? (
        data.notes.map((note, idx) => (
          <Note
            id={note._id}
            content={note.content}
            title={note.title}
            key={note._id}
            idx={idx}
          />
        ))
      ) : null}
    </>
  );
}

export default NoteList;
