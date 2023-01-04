import React from "react";

function LoginButton({ onFormDisplayChange }) {
  return (
    <button onClick={() => onFormDisplayChange("login")} className="text-sm">
      Login
    </button>
  );
}

export default LoginButton;
