import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import HorizontalEllipsis from "../assets/dots.png";
import DropdownList from "./DropdownList";
import Overlay from "./Overlay";
function Note({
  id,
  title,
  idx,
  noteDropdownIndex,
  handleNoteDropdownIndex,
  setNotes,
}) {
  const [showHorizontalEllipsis, setShowHorizontalEllipsis] = useState(false);
  const [isOnTreshold, setIsOnTreshold] = useState(false);

  function handleDropdownTreshold(element) {
    if (element.pageY >= 420) return setIsOnTreshold(true);

    setIsOnTreshold(false);
  }
  return (
    <NavLink
      to={`/note/${id}`}
      className={({ isActive }) =>
        `${
          isActive ? "ring-1 ring-amber-400 bg-green-50 font-semibold" : ""
        } px-3 py-2 hover:bg-slate-100 rounded-md flex flex-row items-center justify-between relative     `
      }
      onMouseOver={() => setShowHorizontalEllipsis(true)}
      onMouseLeave={() => setShowHorizontalEllipsis(false)}
    >
      <p>{title}</p>
      {showHorizontalEllipsis && (
        <span
          className="w-5 hover:bg-slate-200 rounded-sm z-20"
          onClick={(e) => {
            handleDropdownTreshold(e);
            handleNoteDropdownIndex(idx);
          }}
        >
          <img src={HorizontalEllipsis} className="w-full" />
        </span>
      )}
      {idx === noteDropdownIndex && (
        <>
          <DropdownList
            noteId={id}
            noteDropdownIndex={noteDropdownIndex}
            handleNoteDropdownIndex={handleNoteDropdownIndex}
            setNotes={setNotes}
            isOnTreshold={isOnTreshold}
          />
          <Overlay
            handleNoteDropdownIndex={handleNoteDropdownIndex}
            setShowHorizontalEllipsis={setShowHorizontalEllipsis}
          />
        </>
      )}
    </NavLink>
  );
}

export default Note;
