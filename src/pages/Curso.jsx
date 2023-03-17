import React, { useEffect, useState } from "react";

import ContainerSession from "../containers/ContainerSession.jsx";
import Header from "../containers/Header.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import validateUrl from "../hooks/config";
import NotFound from "./NotFound.jsx";
import "../styles/MedioAmbiente.scss";

export default function Curso() {
  const { idCurso, nameCurso } = useParams();

  const [sesiones, setSesiones] = useState([]);
  const [curso, setCurso] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const baseUrl = validateUrl();

    const getCursos = async () => {
      try {
        const res = await axios.get(`${baseUrl}/cursos/${idCurso}`);
        setCurso(res.data);
        setSesiones(res.data.sesiones);
      } catch (error) {
        setError(true);
      }
    };

    getCursos();
  }, [idCurso]);

  if (error)
    return (
      <NotFound
        title={`El curso ${nameCurso} no existe en nuestra aplicación, intenta con otro`}
        to={"/"}
      />
    );

  return (
    <>
      <div className="curso__container">
        <Header></Header>

        <div className="banner__medioAmbiente">
          <div className="banner__medioAmbiente__text">
            <h2>{curso?.title}</h2>
          </div>
        </div>

        <div className="container__cards">
          {sesiones?.map((sesion) => (
            <ContainerSession
              key={sesion.id}
              to={`${sesion.id}`}
              color={curso.color}
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
