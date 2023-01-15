import React from "react";

function Overlay({ handleNoteDropdownIndex, setShowHorizontalEllipsis }) {
  return (
    <div
      onClick={() => {
        handleNoteDropdownIndex(null);
        setShowHorizontalEllipsis(false);
      }}
      className="fixed top-0 bottom-0 left-0 right-0 z-10"
    />
  );
}

export default Overlay;
