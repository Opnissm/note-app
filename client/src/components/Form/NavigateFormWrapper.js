import React from "react";
import CreateAccountButton from "../Button/CreateAccountButton";
import ForgotPasswordButton from "../Button/ForgotPasswordButton";
import LoginButton from "../Button/LoginButton";

function NavigateFormWrapper({ formDisplay, onFormDisplayChange }) {
  return (
    <div className={`flex justify-between`}>
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
