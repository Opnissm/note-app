import React from "react";
import { useDispatch } from "react-redux";
import {
  handleDropdownIndex,
  handleShowRenameTitleDropdown,
} from "../features/dropdown/dropdownSlice";

function Overlay({ handleShowHorizontalEllipsis, handleShowRenameTitleForm }) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(handleDropdownIndex(null));
        dispatch(handleShowRenameTitleDropdown(false));
        handleShowHorizontalEllipsis(false);
      }}
      className="fixed top-0 bottom-0 left-0 right-0 z-10 cursor-default"
    />
  );
}

export default Overlay;
