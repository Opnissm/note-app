import { useDispatch } from "react-redux";
import { useAuth } from "../context/auth-context";
import LogoutButton from "./Button/LogoutButton";
import NoteList from "./NoteList";
import { addNote } from "../features/note/noteSlice";
import { useNavigate } from "react-router";

function NavigationBar({ handleNoteDeleting, setNoteIdDelete }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function onAddNoteClick() {
    try {
      const notes = await dispatch(addNote()).unwrap();
      if (notes.length === 1) {
        const firstNoteId = notes[0]._id;
        navigate(`/note/${firstNoteId}`, { replace: true });
      }
    } catch (err) {
    } finally {
    }
  }
  return (
    <div className="flex flex-col w-[22%] py-2 px-1 border-x h-full bg-white rounded-md space-y-2 ">
      <div className="flex flex-row space-x-1 hover:bg-slate-100 cursor-pointer px-2 py-1">
        {/* <div className="w-8 h-8 border-2 rounded-full"></div> */}
        <p className="text-sm">Hi, {user.username}!</p>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <button
          className="w-full px-2 py-1 rounded-md font-bold text-amber-400 text-left hover:bg-slate-100"
          onClick={onAddNoteClick}
        >
          + Add note
        </button>

        <div className="w-full space-y-2 flex flex-col overflow-auto p-1 h-[450px] scrollbar">
          <NoteList
            handleNoteDeleting={handleNoteDeleting}
            setNoteIdDelete={setNoteIdDelete}
          />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}

export default NavigationBar;
