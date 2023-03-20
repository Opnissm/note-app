import React from "react";
import CreateAccountButton from "../../../components/Button/CreateAccountButton";
import ForgotPasswordButton from "../../../components/Button/ForgotPasswordButton";
import LoginButton from "../../../components/Button/LoginButton";

function NavigateFormWrapper({ formDisplay, onFormDisplayChange }) {
  return (
    <div className="flex justify-between">
      {formDisplay === "login" && (
        <>
          <CreateAccountButton onFormDisplayChange={onFormDisplayChange} />
          <ForgotPasswordButton onFormDisplayChange={onFormDisplayChange} />
        </>
      )}
      {formDisplay === "register" && (
        <>
          <LoginButton onFormDisplayChange={onFormDisplayChange} />
          <ForgotPasswordButton onFormDisplayChange={onFormDisplayChange} />
        </>
      )}
      {formDisplay === "forgot" && (
        <>
          <LoginButton onFormDisplayChange={onFormDisplayChange} />
          <CreateAccountButton onFormDisplayChange={onFormDisplayChange} />
        </>
      )}
    </div>
  );
}

export default NavigateFormWrapper;
