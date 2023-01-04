import React from "react";

function CreateAccountButton({ onFormDisplayChange }) {
  return (
    <button onClick={() => onFormDisplayChange("register")} className="text-sm">
      Create an account
    </button>
  );
}

export default CreateAccountButton;
