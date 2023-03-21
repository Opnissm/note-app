import React from "react";
import { Outlet } from "react-router";

function AuthenticatedPageLayout() {
  return (
    <div className="w-full bg-slate-50 h-screen fixed -z-10">
      <Outlet />
    </div>
  );
}

export default AuthenticatedPageLayout;
