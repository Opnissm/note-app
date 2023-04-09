import React from "react";
import { useNavigate } from "react-router";

function LoginButton({ onFormDisplayChange }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        onFormDisplayChange("login");
        navigate("/");
      }}
      className="text-sm"
    >
      Login
    </button>
  );
}

export default LoginButton;
