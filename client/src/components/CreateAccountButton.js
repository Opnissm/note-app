import React from "react";

function CreateAccountButton({ onFormDisplayChange }) {
  return (
    <button onClick={() => onFormDisplayChange("register")}>
      Create an account
    </button>
  );
}

export default CreateAccountButton;
