export function resetFormErrors(arrOfSetters) {
  arrOfSetters.forEach((set) => set(null));
}

export function findNote(notes, noteId) {
  return notes.find(({ _id }) => _id === noteId);
}
