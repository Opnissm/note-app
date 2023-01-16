import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import axios from "../axiosConfig/axiosConfig";
import { useAuth } from "../context/auth-context";
import LogoutButton from "./Button/LogoutButton";

import NoteList from "./NoteList";

function NavigationBar({ notes, setNotes }) {
  const { user } = useAuth();

  async function onAddNoteClick() {
    axios
      .post("/notes")
      .then(({ data }) => {
        console.log(data.notes);
        setNotes({ data: data.notes, status: "resolved" });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="flex flex-col w-[280px] max-w-[280px] py-2 px-1 border-x h-full bg-white rounded-md space-y-2 ">
      <div className="flex flex-row space-x-1 hover:bg-slate-100 cursor-pointer px-2 py-1">
        <div className="w-8 h-8 border-2 rounded-full"></div>
        <p className="text-sm">{user.username}</p>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <div>
          <button
            className="w-full px-2 py-1 rounded-md font-bold text-amber-400 text-left hover:bg-slate-100"
            onClick={onAddNoteClick}
          >
            + Add note
          </button>
        </div>
        <div className="w-full space-y-2 flex flex-col overflow-auto p-1 h-[450px] scrollbar">
          <NoteList notes={notes} setNotes={setNotes} />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}

export default NavigationBar;
