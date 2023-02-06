import React from "react";
import { useParams } from "react-router-dom";
import Header from "../containers/Header";
import ProfileAside from "../containers/ProfileAside";
import ProfileContainer from "../containers/ProfileContainer";
import NotFound from "./NotFound";

import "../styles/PerfilUser.scss";
import useGetUserProfile from "../hooks/useGetUserProfile";

export default function PerfilUser() {
  let params = useParams();
  let user = useGetUserProfile(params.userName);

  if (!user)
    return (
      <NotFound
        title={"Este usuario no existe en nuestra aplicación"}
        to={"/"}
      />
    );
 
  return (
    <>
      <div className="header__perfilUser">
        <Header></Header>
      </div>
      <section className="container__perfilUser">
        <ProfileAside dataUser={user}></ProfileAside>
        <ProfileContainer myPerfil={user}></ProfileContainer>
      </section>
    </>
  );
}
