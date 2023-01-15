import React from "react";
import { useAuth } from "../../context/auth-context";

function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="px-3 py-2 border-t w-full hover:bg-slate-200 rounded-md"
    >
      Log out
    </button>
  );
}

export default LogoutButton;
