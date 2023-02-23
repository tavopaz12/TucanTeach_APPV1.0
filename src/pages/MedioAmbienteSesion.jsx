import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderSesion from "../containers/HeaderSesion.jsx";
import TemasContainer from "../containers/TemasContainer.jsx";
import TemaSession from "../containers/TemaSession.jsx";
import "../styles/MedioAmbienteSesion.scss";
import NotFound from "./NotFound.jsx";
import useGetSesion from "../hooks/useGetSesion.js";

export default function SessionsMedioAmbiente() {
  const [toggleMenu, setToggleMenu] = useState(
    localStorage.getItem("toogle") === "false" ? false : true
  );

  let params = useParams();
  let sesion = useGetSesion(params.cursoId);

  console.log(sesion);

  if (!sesion)
    return (
      <NotFound
        title={"Esta sesión no existe en nuestra aplicación, intenta con otra"}
        to={"/medio-ambiente"}
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
