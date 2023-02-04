import React, { useContext } from "react";
import ContainerTools from "./ContainerTools";
import ContainerUser from "./ContainerUser";
import "../styles/Header.scss";
import useGetUser from "../hooks/useGetUser";
import { GetCookie } from "../hooks/cookies";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/useProvider";

function Header() {
  const id = GetCookie("c_user");
  const user = useGetUser(id);
  const { signOut } = useContext(UserContext);

  if (!user) {
    signOut();
    return <Navigate to="/login" />;
  } else {
    return (
      <header className="header">
        <ContainerUser
          to={`/user/${user.userName}`}
          key={user.userName}
          title={user.name}
        />
        <ContainerTools />
      </header>
    );
  }
}

export default Header;
