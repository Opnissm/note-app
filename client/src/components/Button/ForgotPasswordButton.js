import React from "react";

function ForgotPasswordButton({ onFormDisplayChange }) {
  return (
    <button onClick={() => onFormDisplayChange("forgot")} className="text-sm">
      Forgot password
    </button>
  );
}

export default ForgotPasswordButton;
