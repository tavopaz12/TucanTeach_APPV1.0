import "../styles/CardContainerCurso.scss";

export default function CardContainerCurso({ image, title, subtitule, color }) {
  return (

      <div className={`curso__preview ${color}`}>
        <img src={image} alt="image__curso" />
        <div className="curso__preview__info">
          <p className="title">{title}</p>
          <p className="subtitule">{subtitule}</p>
        </div>
      </div>
  );
}
