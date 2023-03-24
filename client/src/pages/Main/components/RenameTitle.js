import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDropdownIndex,
  handleShowRenameTitleDropdown,
} from "../../../features/dropdown/dropdownSlice";
import { updateNote } from "../../../features/note/noteSlice";
import Banner from "./Banner";

function RenameTitle({
  noteId,
  title,
  handleShowHorizontalEllipsis,
  isOnTreshold,
}) {
  const [renameTitle, setRenameTitle] = useState(title);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const renameLoadingStyle = isRenaming
    ? "bg-slate-100 text-black hover"
    : "hover:bg-amber-400 hover:text-white";
  function onRenameChange(e) {
    const { value } = e.target;
    setRenameTitle(value);

    if (!isDirty) return setIsDirty(true);

    if (!value.length) {
      setErrorMsg("Title can't be empty");
    } else {
      setErrorMsg("");
    }
  }

  async function handleRenameSubmit() {
    if (!renameTitle) return setErrorMsg("Title can't be empty");
    setIsRenaming(true);
    try {
      const data = await dispatch(
        updateNote({
          noteId,
          title: renameTitle,
        })
      ).unwrap();

      if (data?.titleErr) {
        setErrorMsg(data.titleErr);
        return;
      }
      dispatch(handleDropdownIndex(null));
      dispatch(handleShowRenameTitleDropdown(false));
    } catch (err) {
    } finally {
      handleShowHorizontalEllipsis(false);
      setIsRenaming(false);
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div
      className={`${isOnTreshold} right-1 px-3 py-1 absolute shadow-xl bg-white w-48 z-30 border rounded-md flex flex-col h-max`}
    >
      <h1 className="font-thin">Rename Title</h1>
      {errorMsg ? (
        <Banner
          message={errorMsg}
          className="bg-red-400 text-white mb-2 rounded-md p-1 cursor-default text-sm"
        />
      ) : null}
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
