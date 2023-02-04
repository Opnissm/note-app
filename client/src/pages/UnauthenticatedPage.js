import React, { useState } from "react";
import Logo from "../assets/logo.png";
import NavigateFormWrapper from "../components/Form/NavigateFormWrapper";
import FormManager from "../components/Form/FormManager";

function UnauthenticatedPage() {
  const [formDisplay, setFormDisplay] = useState("login");

  function handleFormDisplay(formName) {
    setFormDisplay(formName);
  }

  return (
    <>
      <div className="flex-1">
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl">
            Make your <span className="text-amber-400">notes</span> accessible
            anytime, anywhere
            <img src={Logo} className="w-10 inline ml-2" alt="Notes logo" />
          </h1>
          <p className="font-light">
            Write your notes in a safer place, save it online.
          </p>
        </div>
      </div>
      <div className="flex-1 w-[90%] mx-auto space-y-2">
        <FormManager formDisplay={formDisplay} />
        <NavigateFormWrapper
          formDisplay={formDisplay}
          onFormDisplayChange={handleFormDisplay}
        />
      </div>
    </>
  );
}

export default UnauthenticatedPage;
