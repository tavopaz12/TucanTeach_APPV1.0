import React from "react";

import InputText from "./../components/InputText";

import "./../styles/MyPerfil.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faSchoolCircleCheck,
  faSchoolFlag,
} from "@fortawesome/free-solid-svg-icons";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import ViewProfile from "./ViewProfile";

export default function MyPerfil({ myPerfil, loader, isMyPerfil }) {
  console.log(isMyPerfil);
  return (
    <>
      {isMyPerfil ? (
        <div className="myPerfil__container">
          <aside className="myPerfil__container__aside">
            {loader ? (
              <Skeleton
                duration={0.5}
                className="myPerfil__container__aside__img"
              />
            ) : (
              <img
                className="myPerfil__container__aside__img"
                src={myPerfil.avatar}
                alt=""
              />
            )}

            <p className="myPerfil__container__aside__name">
              {loader ? <Skeleton duration={0.5} width={200} /> : myPerfil.name}
            </p>
            <div className="myPerfil__container__aside__infos">
              <FontAwesomeIcon
                className="myPerfil__container__aside__infos__icon"
                icon={faEnvelope}
              />
              {loader ? (
                <Skeleton duration={0.5} width={200} />
              ) : (
                <p>{myPerfil.email}</p>
              )}
            </div>

            <div className="myPerfil__container__aside__infos">
              <FontAwesomeIcon
                className="myPerfil__container__aside__infos__icon"
                icon={faSchoolCircleCheck}
              />
              {loader ? (
                <Skeleton duration={0.5} width={200} />
              ) : (
                <p>{myPerfil.nivelSchool}</p>
              )}
            </div>

            <div className="myPerfil__container__aside__infos">
              <FontAwesomeIcon
                className="myPerfil__container__aside__infos__icon"
                icon={faSchoolFlag}
              />
              {loader ? (
                <Skeleton duration={0.5} width={200} />
              ) : (
                <p>{myPerfil.nameSchool}</p>
              )}
            </div>
          </aside>
          <section className="myPerfil__container__section">
            <div className="myPerfil__container__section__form">
              <form>
                <label htmlFor="">
                  <p>
                    Escribe algo sobre ti para que las demas personas puedan
                    verlo
                  </p>
                  <textarea
                    className="myPerfil__container__section__form__textarea"
                    placeholder={`Ejemplo: Hola mi nombre es ${myPerfil.name} y me gusta jugar videojuegos`}
                  ></textarea>

                  <div className="myPerfil__container__section__form__btnAboutMe">
                    <button className="btn__update">Actualizar</button>
                  </div>
                </label>
              </form>
              <form>
                <p className="myPerfil__container__section__form__title">
                  Editar Informacion:{" "}
                </p>

                <div className="myPerfil__container__section__form__colFlex">
                  <InputText type={"text"} title={"Nombre"} />
                  <InputText type={"text"} title={"Apellidos"} />
                </div>

                <div className="myPerfil__container__section__form__colFlex">
                  <InputText type={"email"} title={"Email"} />
                  <InputText type={"tel"} title={"Telefono"} />
                </div>

                <div className="myPerfil__container__section__form__colFlex">
                  <InputText type={"text"} title={"Escuela"} />
                  <InputText type={"text"} title={"Grado escolar"} />
                </div>

                <div className="myPerfil__container__section__form__btnAboutMe">
                  <button className="btn__update">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      ) : (
        <ViewProfile dataUser={myPerfil} loader={loader}></ViewProfile>
      )}
    </>
  );
}
