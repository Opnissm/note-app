import React from "react";
import { useNavigate } from "react-router";

function CreateAccountButton({ onFormDisplayChange }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        onFormDisplayChange("register");
        navigate("/");
      }}
      className="text-sm"
    >
      Create an account
    </button>
  );
}

export default CreateAccountButton;
