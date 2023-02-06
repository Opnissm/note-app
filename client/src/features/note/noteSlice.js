import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
import api from "../../axios_config/api";

const initialState = {
  notes: [],
  status: "idle",
};

export const getNotes = createAsyncThunk("getNotes", async (userId) => {
  const { data } = await api.get("/notes", { params: { userId } });
  return data;
});

export const addNote = createAsyncThunk("addNote", async () => {
  const { data } = await api.post("/notes");
  return data;
});

export const deleteNote = createAsyncThunk("deleteNote", async (noteId) => {
  const { data } = await api.delete("/notes", { data: { noteId } });
  return data;
});

export const updateNote = createAsyncThunk(
  "updateNote",
  async ({ noteId, noteData, updateField }) => {
    const { data } = await api.put("/notes", {
      noteId,
      noteData,
      updateField,
    });

    return data;
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notes = action.payload.notes;
      state.status = "resolved";
    });
    builder.addCase(getNotes.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.notes = action.payload.notes;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.notes = action.payload.notes;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      if (action.payload?.titleErr) {
        return;
      }
      state.notes = action.payload.notes;
    });
  },
});

export default noteSlice.reducer;
