import SaveButton from "./Button/SaveButton";

function NoteTitle({ title, isSaving, handleOnSave, currentNoteId }) {
  return (
    <div className="px-3 py-1 flex flex-row space-x-3 items-baseline justify-between">
      <h1 className="text-lg font-semibold">{title}</h1>
      <SaveButton
        isSaving={isSaving}
        handleOnSave={handleOnSave}
        currentNoteId={currentNoteId}
      />
    </div>
  );
}

export default NoteTitle;
