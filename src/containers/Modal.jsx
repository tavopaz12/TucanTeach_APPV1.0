import React from "react";
import { NavLink } from "react-router-dom";
import "./../styles/Modal.scss";
import ChangePassword from "./../pages/ChangePassword";

export default function Modal({ show, recovery, changePassword }) {
  return (
    <div>
      <div className={show ? "show" : "hide"}>
        <div className="cookie__box">
          <img
            src={
              recovery
                ? "https://cdn-icons-png.flaticon.com/512/2494/2494291.png"
                : changePassword
                ? "https://static.vecteezy.com/system/resources/previews/017/197/461/original/green-check-mark-icon-on-transparent-background-free-png.png"
                : ""
            }
            alt="cookie"
          />
          <div className="content">
            <h2>
              {recovery
                ? "Correo enviado"
                : changePassword
                ? "Contraseña Cambiada"
                : ""}
            </h2>
            <p>
              {recovery
                ? "Revisa tu bandeja de entrada o de Spam e ingresa al link que has recibido"
                : ChangePassword
                ? "No olvides anotar tu nueva contraseña, recuerdala siempre"
                : ""}
            </p>
            <div className="btn__group">
              <NavLink to="/login">
                <button className="accept__btn">Aceptar</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
