import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import "../styles/ListCursos.scss";
import CardSesionListCurso from "./CardSesionListCurso";
import ModalAddSesion from "./ModalAddSesion";

export default function ListCursos({ curso }) {
  const [showSesiones, setShowSesiones] = useState(false);
  const [sesiones, setSesiones] = useState([]);
  const [showModalSesion, setShowModalSesion] = useState(false);

  useEffect(() => {
    setSesiones(curso.sesiones);
  }, [curso]);

  const handleShowSesions = () => {
    if (showSesiones) {
      setShowSesiones(false);
    } else {
      setShowSesiones(true);
    }
  };

  return (
    <div className="list__cursos__dashboard">
      {showModalSesion && (
        <ModalAddSesion
          curso={curso}
          setShowModalSesion={setShowModalSesion}
          sesiones={sesiones}
          setSesiones={setSesiones}
        />
      )}

      <div className="tools">
        <FontAwesomeIcon className="icon__edit" icon={faEdit} />
        <FontAwesomeIcon className="icon__trash" icon={faTrash} />
      </div>

      <div className="list__cursos__dashboard__top">
        <img src={curso.image} alt={curso.title} className={curso.color} />

        <div className="list__cursos__dashboard__top__info">
          <p className="list__cursos__dashboard__top__info__title">
            {curso.title}
          </p>
          <p className="list__cursos__dashboard__top__info__subtitule">
            {curso.description}
          </p>
        </div>
      </div>

      <div className="list__cursos__dashboard__bottom">
        <p className="show__info" onClick={handleShowSesions}>
          {showSesiones ? "Cerrar Contenido" : "Ver Contenido"}
        </p>
        <p>Total de sesiones: {curso.sesiones.length}</p>
      </div>

      {showSesiones && (
        <>
          <div className="add__sesion">
            <div className="new__curso__dashboard">
              <button onClick={() => setShowModalSesion(true)}>
                <p className="title__add">Agregar Nueva Sesion</p>
                <FontAwesomeIcon className="icon__add" icon={faAdd} />
              </button>
            </div>
          </div>
          <div className="container__card">
            {sesiones.map((sesion) => (
              <CardSesionListCurso key={sesion.id} sesion={sesion} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
