import React from "react";

function SaveButton({ handleOnSave, currentNoteId }) {
  return (
    <button
      onClick={() => handleOnSave(currentNoteId)}
      className="bg-amber-400 hover:bg-amber-500 px-3 py-1 text-center text-white rounded-md"
    >
      Save
    </button>
  );
}

export default SaveButton;
