import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/ContainerUser.scss";

function ContainerUser({ isLoader, title, url, to }) {
  return (
    <div className="container__user">
      <Link to={to}>
        {isLoader ? (
          <Skeleton height={50} width={50} circle />
        ) : (
          <img src={url} alt="" className="container__user__img" />
        )}
      </Link>
      <Link to={to}>
        {isLoader ? (
          <p className="container__user__name">
            <Skeleton count={1} width={150} height={10} />
          </p>
        ) : (
          <h2 className="container__user__name">{title}</h2>
        )}
      </Link>
    </div>
  );
}

export default ContainerUser;
