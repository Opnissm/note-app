import React from "react";

function UnauthenticatedPageWrapper({ children }) {
  return (
    <div className="flex w-[70vw] max-w-2xl mx-auto rounded-md pt-12">
      {children}
    </div>
  );
}

export default UnauthenticatedPageWrapper;
