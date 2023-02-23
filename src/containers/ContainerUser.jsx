import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useLocation } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/ContainerUser.scss";

function ContainerUser({ isLoader, title, url, to, ...props }) {
  let location = useLocation();
  return (
    <div className="container__user">
      <Link to={to + location.search} {...props}>
        {isLoader ? (
          <Skeleton height={50} width={50} circle />
        ) : (
          <img src={url} alt="" className="container__user__img" />
        )}
      </Link>
      <Link to={to + location.search} {...props}>
        {isLoader ? (
          <p className="container__user__name">
            <Skeleton count={1} width={150} height={10} />
          </p>
        ) : (
          <p className="container__user__name">{title}</p>
        )}
      </Link>
    </div>
  );
}

export default ContainerUser;
