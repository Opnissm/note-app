import React from "react";

function Wrapper({ children }) {
  return (
    <div className="w-full bg-slate-50 h-screen fixed -z-10">{children}</div>
  );
}

export default Wrapper;
