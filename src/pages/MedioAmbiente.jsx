import React, { useEffect, useState } from "react";

import ContainerSession from "../containers/ContainerSession.jsx";
import Header from "../containers/Header.jsx";
import "../styles/MedioAmbiente.scss";
import { getCursosMedioAmbiente } from "../hooks/useDataMedioAmbiente.jsx";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getSesiones } from "../hooks/sesiones.service.js";

export default function MedioAmbiente() {
  const cursos = getCursosMedioAmbiente();

  const [isLoading, setIsLoading] = useState(true);
  const [sesiones, setSesiones] = useState([]);

  useEffect(() => {
    async function loadSesiones() {
      const res = await getSesiones();

      if (res.status === 200) {
        setSesiones(res.data);
        setIsLoading(false);
      }
    }

    loadSesiones();
  }, []);

  console.log(sesiones, isLoading);

  // GENERAR ID SHORT
  // const id = uuidv4().split("-").splice(0, 3).join('');
  // console.log(id);

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
          {sesiones.map((sesion) => (
            <ContainerSession
              to={`${sesion.id}`}
              key={sesion.id}
              title={sesion.title}
              image={sesion.image}
              objective={sesion.objective}
            />
          ))}
        </div>
      </div>
    </>
  );
}
