import React from "react";
import Login from "./Login";
import Signup from "./Signup";

function FormManager({ formDisplay }) {
  if (formDisplay === "login") {
    return <Login />;
  }

  if (formDisplay === "register") {
    return <Signup />;
  }

  throw new Error("This should be impossible");
}

export default FormManager;
