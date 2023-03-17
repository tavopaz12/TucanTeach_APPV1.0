import React from "react";
import { Link } from "react-router-dom";
import "../styles/ContainerSessionCard.scss";

export default function ContainerSession({
  image,
  objective,
  title,
  to,
  color,
}) {
  console.log(color);
  return (
    <>
      <div className="container">
        <div className="card">
          <div className={`face face1 ${color}`}>
            <div className="content">
              <img src={image} alt={title} />
              <h3>{title}</h3>
            </div>
          </div>
          <div className="face face2">
            <div className="content">
              <p>{objective}</p>
              <Link to={`sesion/${to}`}>Ir a la sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
