import React, { useEffect, useState } from "react";
import { GetCookie } from "../hooks/cookies";
import "../styles/ProfileContainer.scss";
import MyPerfil from "./MyPerfil";
import ViewProfile from "./ViewProfile";

export default function ProfileContainer({ myPerfil, loader }) {
  const [disabled, setDisabled] = useState(false);
  const getCookieId = GetCookie("c_user");

  const isMyPerfil = getCookieId === myPerfil.id;

  useEffect(() => {
    setDisabled(isMyPerfil);
  }, [isMyPerfil]);

  return (
    <>
      {isMyPerfil ? (
        <MyPerfil
          loader={loader}
          isMyPerfil={isMyPerfil}
          myPerfil={myPerfil}
          disabled={disabled}
        />
      ) : (
        <ViewProfile dataUser={myPerfil} loader={loader}></ViewProfile>
      )}
    </>
  );
}
