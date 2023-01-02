import React from "react";

function Signup() {
  return (
    <form className="flex flex-col space-y-3">
      <input
        type="text"
        placeholder="Username"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
      />
      <input
        type="email"
        placeholder="Email"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
      />

      <input
        type="submit"
        value="Register"
        className="text-lg bg-amber-400 px-3 py-2 text-white rounded-md cursor-pointer outline-none hover:bg-amber-500 focus:ring-2 focus:ring-amber-200 hover:shadow-md"
      />
    </form>
  );
}

export default Signup;
