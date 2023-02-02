import React from "react";

function SuccessfulRequestPassword() {
  return (
    <div className="mx-auto w-[350px] max-w-[80vw]">
      <h1 className="text-2xl text-green-400 font-bold">
        Email Successfully Sent!
      </h1>
      <p className="font-thin">
        Kindly check your email for password reset link
      </p>
    </div>
  );
}

export default SuccessfulRequestPassword;
