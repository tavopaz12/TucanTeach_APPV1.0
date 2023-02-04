import React from "react";

import ContainerSession from "../containers/ContainerSession.jsx";
import Header from "../containers/Header.jsx";
import "../styles/MedioAmbiente.scss";
import { getCursosMedioAmbiente } from "../hooks/useDataMedioAmbiente.jsx";
import { Outlet } from "react-router-dom";

export default function MedioAmbiente() {
  const cursos = getCursosMedioAmbiente();
  return (
    <>
      <Outlet></Outlet>
      <div>
        <Header></Header>

        <div className="banner__medioAmbiente">
          <div className="banner__medioAmbiente__text">
            <h2>MEDIO AMBIENTE</h2>
          </div>
        </div>

        <div className="container__cards">
          {cursos.map((curso) => (
            <ContainerSession
              to={`${curso.number}`}
              key={curso.number}
              title={curso.name}
              image={curso.image}
              objective={curso.amount}
            />
          ))}
        </div>
      </div>
    </>
  );
}
