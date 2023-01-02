import React from "react";

function LoginButton({ onFormDisplayChange }) {
  return <button onClick={() => onFormDisplayChange("login")}>Login</button>;
}

export default LoginButton;
