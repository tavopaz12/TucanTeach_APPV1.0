import React from "react";
import { Link } from "react-router-dom";
import "../styles/CardSection.scss";

function CardSection({ title, description, image, id }) {
  const linkTo = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="wrap">
      <div className="tarjeta-wrap">
        <div className="tarjeta">
          <div className="adelante card1">
            <img className="card__img" src={image} alt={title} />
            <div className="card__stats">
              <p>{title}</p>
            </div>
          </div>
          <div className="atras">
            <p className="title">{title}</p>
            <p className="description">{description}</p>
            <Link className="link" to={`curso/${id}/${linkTo}`}>
              <button className="btn">Ir al curso</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSection;
