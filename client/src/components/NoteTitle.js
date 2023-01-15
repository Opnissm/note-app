import SaveButton from "./Button/SaveButton";

function NoteTitle({
  title,
  contentTypingStatus,
  handleOnSave,
  currentNoteId,
}) {
  const message =
    contentTypingStatus === "loading"
      ? "Saving..."
      : contentTypingStatus === "resolved"
      ? "Saved"
      : null;

  return (
    <div className="px-3 py-1 flex flex-row space-x-3 items-baseline justify-between">
      <h1 className="text-lg font-semibold">{title}</h1>
      <SaveButton handleOnSave={handleOnSave} currentNoteId={currentNoteId} />
    </div>
  );
}

export default NoteTitle;
