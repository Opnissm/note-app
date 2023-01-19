import React from "react";

function Overlay({
  handleNoteDropdownIndex,
  handleShowHorizontalEllipsis,
  handleShowRenameTitleForm,
}) {
  return (
    <div
      onClick={() => {
        handleNoteDropdownIndex(null);
        handleShowHorizontalEllipsis(false);
        handleShowRenameTitleForm(false);
      }}
      className="fixed top-0 bottom-0 left-0 right-0 z-10 cursor-default"
    />
  );
}

export default Overlay;
