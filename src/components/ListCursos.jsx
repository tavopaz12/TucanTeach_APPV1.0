import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import "../styles/ListCursos.scss";

export default function ListCursos({ curso }) {
  const [showSesiones, setShowSesiones] = useState(false);

  const handleShowSesions = () => {
    if (showSesiones) {
      setShowSesiones(false);
    } else {
      setShowSesiones(true);
    }
  };

  return (
    <div className="list__cursos__dashboard">
      <div className="tools">
        <FontAwesomeIcon className="icon__edit" icon={faEdit} />
        <FontAwesomeIcon className="icon__trash" icon={faTrash} />
      </div>

      <div className="list__cursos__dashboard__top">
        <img src={curso.image} alt={curso.title} />

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
          Ver Contenido
        </p>
        <p>Total de sesiones: {curso.sesiones.length}</p>
      </div>

      {showSesiones ? (
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
            at pariatur voluptatibus voluptatem labore ex minima, quis corporis
            fugiat magni, ratione mollitia est ut eum et alias amet. Eos, neque?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur, magnam eveniet. Accusamus at itaque labore, esse
            quibusdam hic ab suscipit impedit fugiat quod natus, officia
            consectetur neque facilis explicabo rem?
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
