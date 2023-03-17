import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderSesion from "../containers/HeaderSesion.jsx";
import TemasContainer from "../containers/TemasContainer.jsx";
import TemaSession from "../containers/TemaSession.jsx";
import NotFound from "./NotFound.jsx";
import useGetSesion from "../hooks/useGetSesion.js";
import "../styles/MedioAmbienteSesion.scss";

export default function Sesion() {
  const [toggleMenu, setToggleMenu] = useState(
    localStorage.getItem("toogle") === "false" ? false : true
  );

  const { idSesion, idCurso, nameCurso } = useParams();
  const sesion = useGetSesion(idSesion);

  if (sesion.statusCode === 404)
    return (
      <NotFound
        title={"Esta sesión no existe en nuestra aplicación, intenta con otra"}
        to={`/curso/${idCurso}/${nameCurso}`}
      />
    );

  return (
    <>
      <div className="sesion__container">
        <HeaderSesion toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />

        <div className="conten__sesion__container">
          {toggleMenu === true ? <TemasContainer /> : ""}
          <TemaSession isToogle={toggleMenu}></TemaSession>
        </div>
      </div>
    </>
  );
}
