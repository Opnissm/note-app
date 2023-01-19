import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import api from "../axiosConfig/axiosConfig";

function RenameTitle({
  noteId,
  title,
  handleNoteDropdownIndex,
  setNotes,
  handleShowHorizontalEllipsis,
}) {
  const [renameTitle, setRenameTitle] = useState(title);
  const inputRef = useRef(null);

  function onRenameChange(e) {
    setRenameTitle(e.target.value);
  }

  function handleRenameSubmit() {
    api
      .put("/notes", {
        noteId,
        title: renameTitle,
        updateField: "title",
      })
      .then(({ data }) => {
        setNotes({ data: data.notes, status: "resolved" });
        handleShowHorizontalEllipsis(false);
        handleNoteDropdownIndex(null);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef.current]);
  return (
    <div className="px-3 py-1 bottom-7 top-8 absolute shadow-xl bg-white right-2 w-48 z-30 border rounded-md flex flex-col h-max">
      <h1 className="font-normal">Rename Title</h1>
      <form className="space-y-1">
        <input
          ref={inputRef}
          type="text"
          className="outline-none px-2 py-1 font-normal w-full bg-slate-100 rounded-md"
          value={renameTitle}
          onChange={onRenameChange}
        />
        <input
          type="submit"
          value="Rename"
          className="px-2 py-1 border w-full rounded-md cursor-pointer font-medium hover:bg-amber-400 hover:text-white  text-black"
          onClick={handleRenameSubmit}
        />
      </form>
    </div>
  );
}

export default RenameTitle;
