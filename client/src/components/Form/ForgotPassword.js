import React from "react";

function ForgotPassword() {
  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="email"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="submit"
        value="Login"
        className="text-lg bg-amber-400 px-3 py-2 text-white rounded-md cursor-pointer outline-none hover:bg-amber-500 focus:ring-2 focus:ring-amber-200 hover:shadow-md"
      />
    </form>
  );
}

export default ForgotPassword;
