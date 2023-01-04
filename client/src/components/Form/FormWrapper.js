import React from "react";
import Login from "./Login";
import Signup from "./Signup";

function FormWrapper({ formDisplay }) {
  if (formDisplay === "login") {
    return <Login />;
  }

  if (formDisplay === "register") {
    return <Signup />;
  }

  if (formDisplay === "forgot") {
    return <h1>ForgetForm</h1>;
  }

  throw new Error("This should be impossible");
}

export default FormWrapper;
