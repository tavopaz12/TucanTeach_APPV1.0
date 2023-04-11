import React from "react";
import { GetCookie } from "../hooks/cookies";
import "../styles/ProfileContainer.scss";
import MyPerfil from "./MyPerfil";
import ViewProfile from "./ViewProfile";

export default function ProfileContainer({ myPerfil, loader }) {
  const getCookieId = GetCookie("c_user");

  const isMyPerfil = getCookieId === myPerfil.id;

  if (!isMyPerfil) {
    return <ViewProfile dataUser={myPerfil} loader={loader}></ViewProfile>;
  }
  return (
    <>
      <MyPerfil
        loader={loader}
        isMyPerfil={isMyPerfil}
        myPerfil={myPerfil}
        disabled={getCookieId !== myPerfil.id}
      />
    </>
  );
}
