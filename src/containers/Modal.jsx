import React from "react";
import { NavLink } from "react-router-dom";
import "./../styles/Modal.scss";

export default function Modal({ show }) {
  return (
    <div>
      <div className={show ? "show" : "hide"}>
        <div className="cookie__box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2494/2494291.png"
            alt="cookie"
          />
          <div className="content">
            <h2>Correo enviado</h2>
            <p>
              Revisa tu bandeja de entrada o de Spam e ingresa al link que has
              recibido
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
