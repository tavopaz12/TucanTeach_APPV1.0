import React from "react";
import "../styles/InputPerfil.scss";

export default function InputText({ title, type, value }) {
  return (
    <>
      <div className="inputBox">
        <input
          type={type}
          required="required"
          value={value}
        />
        <span>{title}:</span>
      </div>
    </>
  );
}
