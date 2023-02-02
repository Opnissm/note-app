import React from "react";
import { Outlet } from "react-router";

function UnauthenticatedPageWrapper() {
  return (
    <div className="flex w-[70vw] max-w-2xl mx-auto rounded-md pt-12">
      <Outlet />
    </div>
  );
}

export default UnauthenticatedPageWrapper;
