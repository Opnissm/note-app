import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import HorizontalEllipsis from "../../../assets/dots.png";
import {
  handleDropdownIndex,
  handleDropdownTreshold,
} from "../../../features/dropdown/dropdownSlice";
import DropdownList from "./DropdownList";
import Overlay from "./Overlay";
import RenameTitle from "./RenameTitle";

function Note({ id, title, idx, setNoteIdDelete, handleNoteDeleting }) {
  const [showHorizontalEllipsis, setShowHorizontalEllipsis] = useState(false);
  const { noteDropdownIndex, showRenameTitleDropdown, isOnTreshold } =
    useSelector((state) => state.dropdown);
  const dispatch = useDispatch();

  function handleShowHorizontalEllipsis(booleanVal) {
    setShowHorizontalEllipsis(booleanVal);
  }
  return (
    <NavLink
      to={`/note/${id}`}
      className={({ isActive }) =>
        `${
          isActive ? "ring-1 ring-amber-400 bg-green-50 font-semibold" : ""
        } px-3 py-2 hover:bg-slate-100 rounded-md flex flex-row items-center justify-between relative`
      }
      onMouseEnter={() => handleShowHorizontalEllipsis(true)}
      onMouseLeave={() => handleShowHorizontalEllipsis(false)}
    >
      <p className="text-ellipsis overflow-hidden w-[80%] whitespace-nowrap">
        {title}
      </p>
      {showHorizontalEllipsis && (
        <span
          className="w-5 hover:bg-slate-200 rounded-sm z-20"
          onClick={(e) => {
            dispatch(handleDropdownTreshold(e.pageY));
            dispatch(handleDropdownIndex(idx));
          }}
        >
          <img src={HorizontalEllipsis} className="w-full" />
        </span>
      )}
      {idx === noteDropdownIndex && (
        <>
          {showRenameTitleDropdown ? (
            <RenameTitle
              title={title}
              noteId={id}
              handleShowHorizontalEllipsis={handleShowHorizontalEllipsis}
              isOnTreshold={isOnTreshold ? "bottom-7  " : "top-8"}
            />
          ) : (
            <DropdownList
              noteId={id}
              isOnTreshold={isOnTreshold ? "bottom-7" : "top-8"}
              handleShowHorizontalEllipsis={handleShowHorizontalEllipsis}
              handleNoteDeleting={handleNoteDeleting}
              setNoteIdDelete={setNoteIdDelete}
            />
          )}
          <Overlay
            handleShowHorizontalEllipsis={handleShowHorizontalEllipsis}
          />
        </>
      )}
    </NavLink>
  );
}

export default Note;
