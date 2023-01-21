import React, { useEffect, useRef, useState } from "react";
import api from "../axiosConfig/axiosConfig";

function RenameTitle({
  noteId,
  title,
  handleNoteDropdownIndex,
  setNotes,
  handleShowHorizontalEllipsis,
  handleShowRenameTitleForm,
}) {
  const [renameTitle, setRenameTitle] = useState(title);
  const [isRenaming, setIsRenaming] = useState(false);
  const inputRef = useRef(null);
  const renameLoadingStyle = isRenaming
    ? "bg-slate-100 text-black hover"
    : "hover:bg-amber-400 hover:text-white";
  function onRenameChange(e) {
    setRenameTitle(e.target.value);
  }

  function handleRenameSubmit() {
    setIsRenaming(true);
    api
      .put("/notes", {
        noteId,
        title: renameTitle,
        updateField: "title",
      })
      .then(({ data }) => {
        setNotes({ data: data.notes, status: "resolved" });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        handleShowHorizontalEllipsis(false);
        handleNoteDropdownIndex(null);
        setIsRenaming(false);
        handleShowRenameTitleForm(false);
      });
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);
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
          value={`${isRenaming ? "Renaming..." : "Rename"}`}
          disabled={isRenaming}
          className={`${renameLoadingStyle} px-2 py-1 border w-full rounded-md cursor-pointer font-medium text-black`}
          onClick={handleRenameSubmit}
        />
      </form>
    </div>
  );
}

export default RenameTitle;
