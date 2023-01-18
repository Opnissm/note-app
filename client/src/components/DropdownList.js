import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import api from "../axiosConfig/axiosConfig";
import EditIcon from "../assets/editing.png";
import DeleteIcon from "../assets/delete.png";
import { useNavigate } from "react-router";
function DropdownList({
  noteId,
  setNotes,
  isOnTreshold,
  handleNoteDropdownIndex,
}) {
  const navigate = useNavigate();
  async function onDeleteNote() {
    api
      .delete("/notes", {
        data: { noteId },
      })
      .then(({ data }) => {
        if (!data.notes.length)
          return setNotes({ data: [], status: "resolved" });

        setNotes({ data: data.notes, status: "resolved" });
        const firstNoteId = data.notes[0]._id;
        navigate(`/note/${firstNoteId}`, { replace: true });
        handleNoteDropdownIndex(null);
      })
      .catch((err) => console.log(err));
  }

  return (
    <ul
      id="dropdown"
      className={`${
        isOnTreshold ? "bottom-7" : "top-8"
      } absolute shadow-lg bg-white right-2 w-36 z-30 border rounded-md h-20 flex flex-col`}
    >
      <li className="font-normal hover:bg-slate-200 px-2 cursor-pointer flex flex-row items-center flex-1">
        <div className="w-4">
          <img src={EditIcon} className="w-full" />
        </div>
        <p className="text-sm">Rename</p>
      </li>
      <li
        onClick={onDeleteNote}
        className="font-normal hover:bg-slate-200 px-2 cursor-pointer flex flex-row items-center flex-1"
      >
        <div className="w-4">
          <img src={DeleteIcon} className="w-full" />
        </div>
        <p className="text-sm">Delete</p>
      </li>
    </ul>
  );
}

export default DropdownList;
