import {
  faBars,
  faChalkboardTeacher,
  faFolder,
  faHouse,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../styles/DashboardMenu.scss";

export default function DashboardMenu({ isShortMenu, setIsShortMenu }) {
  const shortMenu = () => {
    if (!isShortMenu) {
      setIsShortMenu(true);
    } else {
      setIsShortMenu(false);
    }
  };

  return (
    <div className="dashboardMenu__container">
      <div className={!isShortMenu ? "menu__toggle" : "menu__toggle short"}>
        <FontAwesomeIcon onClick={shortMenu} icon={faBars} />
      </div>

      <div className={!isShortMenu ? "logo" : "logo short"}>
        <Link to="/">
          <img
            className="logo__img"
            src="https://tavopaz12.ml/public/1678471518062.png"
            alt="logo-tucanteach"
          />
        </Link>{" "}
        <h1>TucanTeach</h1>
      </div>

      <div className="options">
        <Link to="inicio" style={{ color: "white" }}>
          <div
            className={
              !isShortMenu ? "option__container" : "option__container short"
            }
          >
            <FontAwesomeIcon className="icon" icon={faHouse} />
            <h2 className="title">Dashboard</h2>
          </div>
        </Link>

        <Link to="cursos" style={{ color: "white" }}>
          <div
            className={
              !isShortMenu ? "option__container" : "option__container short"
            }
          >
            <FontAwesomeIcon className="icon" icon={faChalkboardTeacher} />
            <p className="title">Cursos</p>
          </div>
        </Link>

        <Link to="usuarios" style={{ color: "white" }}>
          <div
            className={
              !isShortMenu ? "option__container" : "option__container short"
            }
          >
            <FontAwesomeIcon className="icon" icon={faUsers} />
            <p className="title">Usuarios</p>
          </div>
        </Link>

        <Link to="archivos" style={{ color: "white" }}>
          <div
            className={
              !isShortMenu ? "option__container" : "option__container short"
            }
          >
            <FontAwesomeIcon className="icon" icon={faFolder} />
            <p className="title">Documentos</p>
          </div>
        </Link>
      </div>

      <div className={!isShortMenu ? "logout" : "logout short"}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        <p>Salir</p>
      </div>
    </div>
  );
}
