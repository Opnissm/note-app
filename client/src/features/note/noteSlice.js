import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios_config/api";

const initialState = {
  notes: [],
  status: "idle",
};

export const getNotes = createAsyncThunk("getNotes", async (userId) => {
  const { data } = await api.get("/notes", { params: { userId } });
  return data.notes;
});

export const addNote = createAsyncThunk("addNote", async () => {
  const { data } = await api.post("/notes");
  return data.notes;
});

export const deleteNote = createAsyncThunk("deleteNote", async (noteId) => {
  const { data } = await api.delete("/notes", { data: { noteId } });
  console.log(data);
  return data.notes;
});

export const updateNote = createAsyncThunk(
  "updateNote",
  async ({ noteId, noteData, updateField }) => {
    const { data } = await api.put("/notes", {
      noteId,
      noteData,
      updateField,
    });
    return data.notes;
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      console.log(state.notes);
      state.notes = action.payload;
      state.status = "resolved";
    });
    builder.addCase(getNotes.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
  },
});

export default noteSlice.reducer;
