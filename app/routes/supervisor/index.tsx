import React from "react";
import { Outlet } from "@remix-run/react";

export default function Supervisor() {
  return (
    <div>
      <h1>Supervisor Dashboard</h1>
      <Outlet />{" "}
      {/* This will render ManageEmployee for '/supervisor/manage-employee' */}
    </div>
  );
}
