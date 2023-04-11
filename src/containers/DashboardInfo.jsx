import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

import "../styles/DashboardInfo.scss";
import NotificationDashboard from "../components/NotificationDashboard";
import { GetCookie } from "../hooks/cookies";
import useGetUser from "../hooks/useGetUser";
import { Link } from "react-router-dom";

export default function DashboardInfo() {
  const id = GetCookie("c_user");
  const user = useGetUser(id);

  return (
    <>
      <div className="dashboard__info__tools">
        <div className="dashboard__info__tools__icon">
          <FontAwesomeIcon
            className="dashboard__info__tools__icon icon"
            icon={faMessage}
          />
        </div>

        <Link to={`/user/${user?.userName}`} className="link">
          <div className="dashboard__info__user">
            <img
              src={user?.avatar}
              alt={user?.userName}
              className="img__user__admin"
            />
            <p style={{ textTransform: "uppercase" }}>{user?.role}</p>
          </div>
        </Link>
      </div>

      <div className="dashboard__info__notifications">
        <h2 className="dashboard__content__title">Notificaciones</h2>

        <NotificationDashboard
          title="Nuevo curo"
          info="un nuevo curso ha sido agregado"
        />
      </div>
    </>
  );
}
