import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import HorizontalEllipsis from "../assets/dots.png";
import DropdownList from "./DropdownList";
import Overlay from "./Overlay";
import RenameTitle from "./RenameTitle";
function Note({
  id,
  title,
  idx,
  noteDropdownIndex,
  handleNoteDropdownIndex,
  setNotes,
  setNoteIdDelete,
  handleNoteDeleting,
}) {
  const [showHorizontalEllipsis, setShowHorizontalEllipsis] = useState(false);
  const [showRenameTitleForm, setShowRenameTitleForm] = useState(false);
  const [isOnTreshold, setIsOnTreshold] = useState(false);
  // console.log(showHorizontalEllipsis);
  function handleDropdownTreshold(element) {
    if (element.pageY >= 420) return setIsOnTreshold(true);
    setIsOnTreshold(false);
  }

  function handleShowRenameTitleForm(booleanVal) {
    setShowRenameTitleForm(booleanVal);
  }

  function handleShowHorizontalEllipsis(booleanVal) {
    setShowHorizontalEllipsis(booleanVal);
  }
  return (
    <NavLink
      to={`/note/${id}`}
      className={({ isActive }) =>
        `${
          isActive ? "ring-1 ring-amber-400 bg-green-50 font-semibold" : ""
        } px-3 py-2 hover:bg-slate-100 rounded-md flex flex-row items-center justify-between relative `
      }
      onMouseOver={() => handleShowHorizontalEllipsis(true)}
      onMouseLeave={() => handleShowHorizontalEllipsis(false)}
    >
      <p className="text-ellipsis overflow-hidden w-[80%] whitespace-nowrap">
        {title}
      </p>
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
          {showRenameTitleForm ? (
            <RenameTitle
              title={title}
              noteId={id}
              handleNoteDropdownIndex={handleNoteDropdownIndex}
              handleShowHorizontalEllipsis={handleShowHorizontalEllipsis}
              setNotes={setNotes}
              handleShowRenameTitleForm={handleShowRenameTitleForm}
            />
          ) : (
            <DropdownList
              noteId={id}
              noteDropdownIndex={noteDropdownIndex}
              handleNoteDropdownIndex={handleNoteDropdownIndex}
              setNotes={setNotes}
              isOnTreshold={isOnTreshold}
              handleShowRenameTitleForm={handleShowRenameTitleForm}
              handleShowHorizontalEllipsis={handleShowHorizontalEllipsis}
              handleNoteDeleting={handleNoteDeleting}
              setNoteIdDelete={setNoteIdDelete}
            />
          )}
          <Overlay
            handleNoteDropdownIndex={handleNoteDropdownIndex}
            handleShowHorizontalEllipsis={handleShowHorizontalEllipsis}
            handleShowRenameTitleForm={handleShowRenameTitleForm}
          />
        </>
      )}
    </NavLink>
  );
}

export default Note;
