import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "../axiosConfig/axiosConfig";
import EditIcon from "../assets/editing.png";
import DeleteIcon from "../assets/delete.png";
function DropdownList({
  noteId,
  handleNoteDropdownIndex,
  noteDropdownIndex,
  setNotes,
}) {
  async function onDeleteNote() {
    axios
      .delete("/notes", {
        data: { noteId },
      })
      .then(({ data }) => setNotes({ data: data.notes, status: "resolved" }))
      .catch((err) => console.log(err));
  }

  return (
    <ul
      id="dropdown"
      className="absolute shadow-lg bg-white right-0 w-36 z-20 top-4 rounded-md h-20 flex flex-col"
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
