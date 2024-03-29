import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchoolCircleCheck,
  faPhone,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "../styles/AsidePerfilUser.scss";

export default function AsidePerfilUser({
  myPerfil,
  loader,
  showModal,
  setShowModal,
  newAvatar,
}) {
  const openModal = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <aside className="myPerfil__container__aside">
        {loader ? (
          <Skeleton duration={0.5} />
        ) : (
          <div className="profile__image">
            <FontAwesomeIcon
              icon={faEdit}
              className="edit"
              onClick={openModal}
            />
            <img
              className="myPerfil__container__aside__img"
              src={newAvatar ? newAvatar : myPerfil.avatar}
              alt=""
            />
          </div>
        )}

        <p className="myPerfil__container__aside__name">
          {loader ? <Skeleton duration={0.5} width={200} /> : myPerfil.name}
        </p>

        <div className="counter__follows__container">
          <div>
            <p>{myPerfil.followers?.length}</p>
            <p>Seguidores</p>
          </div>

          <div>
            <p>{myPerfil.followings?.length}</p>
            <p>Siguiendo</p>
          </div>
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
            icon={faPhone}
          />
          {loader ? (
            <Skeleton duration={0.5} width={200} />
          ) : (
            <p>{myPerfil.cellPhone}</p>
          )}
        </div>
      </aside>
    </>
  );
}
