import React, { useState } from "react";

function SaveButton({ isSaving, handleOnSave, currentNoteId }) {
  return (
    <button
      onClick={() => {
        handleOnSave(currentNoteId);
      }}
      className="bg-amber-400 hover:bg-amber-500 px-3 py-1 text-center text-white rounded-md"
    >
      {isSaving ? "Saving.." : "Save"}
    </button>
  );
}

export default SaveButton;
