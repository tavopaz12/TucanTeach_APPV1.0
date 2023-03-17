import React, { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarth,
  faGraduationCap,
  faPaperPlane,
  faSchoolCircleCheck,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UserContext } from "./../context/useProvider";
import useGetUser from "../hooks/useGetUser";
import axios from "axios";
import validateUrl from "./../hooks/config";
import { Link } from "react-router-dom";

export default function AsideViewProfile({ dataUser, loader }) {
  const { userId } = useContext(UserContext);
  const getMyUser = useGetUser(userId);

  const [following, setFollowing] = useState(false);
  const [numFollowers, setNumFollowers] = useState(0);

  const baseUrl = validateUrl();

  useEffect(() => {
    setNumFollowers(dataUser.followers?.length);
  }, [dataUser]);

  useEffect(() => {
    setFollowing(getMyUser.followings?.includes(dataUser.id));
  }, [dataUser, getMyUser]);

  const followUser = async (e) => {
    e.preventDefault();
    setFollowing(true);
    setNumFollowers(numFollowers + 1);

    try {
      await axios.patch(`${baseUrl}/users/${userId}/follow`, {
        id: dataUser.id,
      });
      setFollowing(true);
      setNumFollowers(numFollowers + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const unFollowUser = async (e) => {
    e.preventDefault();
    setFollowing(false);
    setNumFollowers(numFollowers - 1);

    try {
      await axios.patch(`${baseUrl}/users/${userId}/unfollow`, {
        id: dataUser.id,
      });
      setFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="counter__follows__container">
        <div>
          <p>{numFollowers}</p>
          {loader ? <Skeleton duration={0.5} width={100} /> : "Seguidores"}
        </div>

        <div>
          <p>{dataUser.followings?.length}</p>

          {loader ? <Skeleton duration={0.5} width={100} /> : "Siguiendo"}
        </div>
      </div>

      {loader ? (
        <Skeleton
          className="myPerfil__container__aside__subitutle"
          duration={0.5}
          width={200}
        />
      ) : following ? (
        <>
          <div className="btn__follow__container">
            <button onClick={unFollowUser} className="btn__follow__btn">
              <FontAwesomeIcon
                className="btn__follow__container__icon"
                icon={faUserMinus}
              />
              <span className="btn__follow__container__title">
                Dejar de seguir
              </span>
            </button>
          </div>
          <div className="btn__follow__container">
            <Link to="/chat" className="btn__follow__btn">
              <FontAwesomeIcon
                className="btn__follow__container__icon"
                icon={faPaperPlane}
              />
              <span className="btn__follow__container__title">
                Enviar mensaje
              </span>
            </Link>
          </div>
        </>
      ) : (
        <div className="btn__follow__container">
          <button onClick={followUser} className="btn__follow__btn">
            <FontAwesomeIcon
              className="btn__follow__container__icon"
              icon={faUserPlus}
            />
            <span className="btn__follow__container__title">Seguir</span>
          </button>
        </div>
      )}

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
