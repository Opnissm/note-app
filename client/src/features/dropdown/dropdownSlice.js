import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noteDropdownIndex: null,
  showRenameTitleDropdown: false,
  isOnTreshold: false,
};
export const dropdownSlice = createSlice({
  name: "dropwdown",
  initialState,
  reducers: {
    handleDropdownIndex: (state, action) => {
      state.noteDropdownIndex = action.payload;
    },
    handleShowRenameTitleDropdown: (state, action) => {
      state.showRenameTitleDropdown = action.payload;
    },
    handleDropdownTreshold: (state, action) => {
      if (action.payload >= 420) {
        state.isOnTreshold = true;
      } else {
        state.isOnTreshold = false;
      }
    },
  },
});

export const {
  handleDropdownIndex,
  handleShowRenameTitleDropdown,
  handleDropdownTreshold,
} = dropdownSlice.actions;

export default dropdownSlice.reducer;
