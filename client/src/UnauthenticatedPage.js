import React, { createContext, useContext, useEffect, useState } from "react";
import Login from "./components/Form/Login";
import Logo from "./assets/logo.png";
import axios from "axios";
import FormWrapper from "./components/Form/FormWrapper";
import NavigateFormWrapper from "./components/Form/NavigateFormWrapper";

function UnauthenticatedPage() {
  const [formDisplay, setFormDisplay] = useState("login");

  function handleFormDisplay(formName) {
    setFormDisplay(formName);
  }

  useEffect(() => {
    // axios
    //   .post("http://localhost:5000/login")
    //   .then(({ data }) => console.log(data))
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex w-[70vw] max-w-2xl mx-auto rounded-md pt-12">
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
        <FormWrapper formDisplay={formDisplay} />
        <NavigateFormWrapper
          formDisplay={formDisplay}
          onFormDisplayChange={handleFormDisplay}
        />
      </div>
    </div>
  );
}

export default UnauthenticatedPage;
