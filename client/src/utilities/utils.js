export function resetFormErrors(arrOfSetters) {
  arrOfSetters.forEach((set) => set(null));
}
