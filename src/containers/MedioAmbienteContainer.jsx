import React from "react";
import { Outlet } from "react-router-dom";

export default function MedioAmbienteContainer() {
  return (
    <div>
      <div className="container">
      </div>
      <Outlet></Outlet>
    </div>
  );
}
