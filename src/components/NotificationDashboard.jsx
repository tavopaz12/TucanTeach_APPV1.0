import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NotificationDashboard({ title, info }) {
  return (
    <div className="notification__container__info">
      <FontAwesomeIcon icon={faBell} className="icon" />

      <div>
        <FontAwesomeIcon icon={faXmark} className="icon__close" />
        <p className="notification__container__title">{title}</p>
        <p className="notification__container__subtitule">{info}</p>
      </div>
    </div>
  );
}
