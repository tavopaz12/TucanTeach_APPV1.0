import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "../styles/ProfileAside.scss";

export default function ProfileAside({ dataUser }) {
  return (
    <>
      <aside className="aside__perfilUser">
        <div className="photo__profile__container">
          <img
            src="https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png"
            alt="Foto de perfil"
            className="photo__profile"
          />
        </div>

        <div>
          <p className="aside__perfilUser__userName"></p>
          <p>{dataUser.name}</p>

          <p>{dataUser.email}</p>

          <div className="location__container">
            <FontAwesomeIcon
              className="location__container__icon"
              icon={faLocationArrow}
            />
            <span className="location__container__text">ubicación</span>
          </div>
        </div>
      </aside>
    </>
  );
}
