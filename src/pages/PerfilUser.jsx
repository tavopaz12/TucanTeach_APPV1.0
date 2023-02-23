import React from "react";
import { useParams } from "react-router-dom";
import Header from "../containers/Header";
import ProfileContainer from "../containers/ProfileContainer";
import NotFound from "./NotFound";

import "../styles/PerfilUser.scss";
import useGetUserProfile from "../hooks/useGetUserProfile";

export default function PerfilUser() {
  let params = useParams();
  let user = useGetUserProfile(params.userName);
  const loader = Array.isArray(user) && !user.length;

  if (!user) {
    return (
      <NotFound
        title={"Este usuario no existe en nuestra aplicación"}
        to={"/"}
      />
    );
  }
  return (
    <>
      <div className="header__perfilUser">
        <Header></Header>
      </div>
      <section className="container__perfilUser">
        <ProfileContainer myPerfil={user} loader={loader}></ProfileContainer>
      </section>
    </>
  );
}
