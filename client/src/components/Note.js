import React from "react";
import { NavLink } from "react-router-dom";

function Note({ id, title, isActive }) {
  return (
    <NavLink
      to={`/note/${id}`}
      className={({ isActive }) =>
        `${
          isActive ? "ring-1 ring-amber-400 rounded-md bg-green-50" : "border-b"
        } px-3 py-2`
      }
    >
      {title}
    </NavLink>
  );
}

export default Note;
