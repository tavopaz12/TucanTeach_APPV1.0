import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchoolCircleCheck,
  faSchoolFlag,
  faUserFriends,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ViewProfile({ dataUser, loader }) {
  return (
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
                src={dataUser.avatar}
                alt=""
              />
            )}

            <p className="myPerfil__container__aside__name">
              {loader ? <Skeleton duration={0.5} width={200} /> : dataUser.name}
            </p>
            <div className="myPerfil__container__aside__infos">
              <FontAwesomeIcon
                className="myPerfil__container__aside__infos__icon"
                icon={faEnvelope}
              />
              {loader ? (
                <Skeleton duration={0.5} width={200} />
              ) : (
                <p>{dataUser.email}</p>
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
                <p>{dataUser.nivelSchool}</p>
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
                <p>{dataUser.nameSchool}</p>
              )}
            </div>
          </aside>
      <section className="myPerfil__container__section">
        <div className="myPerfil__container__section__form">
          <label htmlFor="">
            <p>Acerca de mi...</p>
            <textarea
              disabled
              className="myPerfil__container__section__form__textarea"
              placeholder={`Hola mi nombre es ${dataUser.name} y me gusta jugar videojuegos`}
            ></textarea>
          </label>
        </div>
      </section>
    </div>
  );
}
