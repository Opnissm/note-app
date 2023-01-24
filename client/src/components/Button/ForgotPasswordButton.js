import React from "react";
import { useNavigate } from "react-router";

function ForgotPasswordButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/forgot-password")} className="text-sm">
      Forgot password
    </button>
  );
}

export default ForgotPasswordButton;
