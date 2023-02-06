import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "../features/dropdown/dropdownSlice";
import noteReducer from "../features/note/noteSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    dropdown: dropdownReducer,
  },
});
