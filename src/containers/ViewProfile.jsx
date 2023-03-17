import AsideViewProfile from "../components/AsideViewProfile";

import "../styles/ViewProfile.scss";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ViewProfile({ dataUser, loader }) {
  return (
    <div className="myPerfil__container">
      <AsideViewProfile dataUser={dataUser} loader={loader} />

      <section className="myPerfil__container__section">
        <div className="myPerfil__container__section__form">
          {loader ? (
            <Skeleton
              className="myPerfil__container__section__form__textarea"
              duration={0.5}
              height={150}
            />
          ) : (
            <label htmlFor="">
              <textarea
                disabled
                className="myPerfil__container__section__form__textarea"
                placeholder={`${dataUser.about}`}
              ></textarea>
            </label>
          )}
        </div>

        <h2 className="myPerfil__container__section__hobbies__title">
          {loader ? <Skeleton duration={0.5} width={200} /> : "Mis intereses"}
        </h2>
        <div className="myPerfil__container__section__hobbies">
          {loader ? (
            <div className="flex">
              <Skeleton
                containerClassName="flex-skeleton"
                duration={0.5}
                height={30}
              />
            </div>
          ) : (
            dataUser?.materiasFavoritas.slice(0, 4).map((item) => (
              <button
                key={item}
                className="myPerfil__container__section__hobbies__btn"
              >
                {item}
              </button>
            ))
          )}
        </div>
        <br />
        <br />
        <h2 className="myPerfil__container__section__hobbies__title">
          {loader ? (
            <Skeleton duration={0.5} width={200} />
          ) : (
            "Mis Materias Favoritas"
          )}
        </h2>

        <div className="myPerfil__container__section__hobbies">
          {loader ? (
            <div className="flex">
              <Skeleton
                containerClassName="flex-skeleton"
                duration={0.5}
                height={30}
              />
            </div>
          ) : (
            dataUser?.interest.slice(0, 4).map((item) => (
              <button
                key={item}
                className="myPerfil__container__section__hobbies__btn"
              >
                {item}
              </button>
            ))
          )}
        </div>
        <br />
        <br />
      </section>
    </div>
  );
}
