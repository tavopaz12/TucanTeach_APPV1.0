import "../styles/CardSesionListCurso.scss";

export default function CardSesionListCurso({ sesion }) {
  return (
    <div className="card">
      <div className="card__header">
        <img
          src={sesion.image}
          alt="card__image"
          className="card__image"
          width="600"
        />
      </div>
      <div className="card__body">
        <h4>{sesion.title}</h4>
        <p>{sesion.objective}</p>
        <span className="tag tag-blue">Ver Contenido</span>
      </div>
    </div>
  );
}
