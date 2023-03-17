import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardInfo from "../containers/DashboardInfo";
import DashboardMenu from "../containers/DashboardMenu";

import "../styles/Dashboard.scss";

export default function Dashboard() {
  const [isShortMenu, setIsShortMenu] = useState(true);

  return (
    <>
      <div className="dashboard__container">
        <div
          className={!isShortMenu ? "dashboard__menu" : "dashboard__menu short"}
        >
          <DashboardMenu
            setIsShortMenu={setIsShortMenu}
            isShortMenu={isShortMenu}
          />
        </div>

        <div
          className={
            !isShortMenu ? "dashboard__content" : "dashboard__content short"
          }
        >
          <Outlet />
        </div>
        <div className="dashboard__info">
          <DashboardInfo />
        </div>
      </div>
    </>
  );
}
