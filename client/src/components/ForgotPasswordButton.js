import React from "react";

function ForgotPasswordButton({ onFormDisplayChange }) {
  return (
    <button onClick={() => onFormDisplayChange("forgot")}>
      Forgot password
    </button>
  );
}

export default ForgotPasswordButton;
