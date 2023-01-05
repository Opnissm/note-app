import React from "react";

function Modal() {
  return (
    <div className="absolute w-52 h-52 bg-slate-500">
      <div>
        <h1>Successfully Sign Up</h1>
      </div>
      <div>
        <p>You have successfuly sign up. Would you like to you</p>
      </div>
      <div>
        <button>Login</button>
        <button>Go to authenticated page</button>
      </div>
    </div>
  );
}

export default Modal;
