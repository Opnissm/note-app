import React from "react";

function MainWrapper({ children }) {
  return <div className="flex flex-row w-full h-[250px]">{children}</div>;
}

export default MainWrapper;
