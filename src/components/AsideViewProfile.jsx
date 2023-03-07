import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarth, faGraduationCap, faSchoolCircleCheck } from "@fortawesome/free-solid-svg-icons";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AsideViewProfile({ dataUser, loader }) {
  return (
    <aside className="myPerfil__container__aside">
      {loader ? (
        <Skeleton duration={0.5} className="myPerfil__container__aside__img" />
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
      <p className="myPerfil__container__aside__subitutle">
        {loader ? <Skeleton duration={0.5} width={200} /> : dataUser.nameSchool}
      </p>

      <div className="myPerfil__container__aside__infos">
        <FontAwesomeIcon
          className="myPerfil__container__aside__infos__icon"
          icon={faEarth}
        />
        {loader ? (
          <Skeleton duration={0.5} width={150} />
        ) : (
          <p>{dataUser.status}</p>
        )}
      </div>

      <div className="myPerfil__container__aside__infos">
        <FontAwesomeIcon
          className="myPerfil__container__aside__infos__icon"
          icon={faSchoolCircleCheck}
        />
        {loader ? (
          <Skeleton duration={0.5} width={150} />
        ) : (
          <p>{dataUser.nivelSchool}</p>
        )}
      </div>
      <div className="myPerfil__container__aside__infos">
        <FontAwesomeIcon
          className="myPerfil__container__aside__infos__icon"
          icon={faGraduationCap}
        />
        {loader ? (
          <Skeleton duration={0.5} width={150} />
        ) : (
          <p>{dataUser.gradeSchool}</p>
        )}
      </div>
    </aside>
  );
}
