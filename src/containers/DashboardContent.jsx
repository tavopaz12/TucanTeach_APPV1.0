import {
  faBookOpen,
  faPersonChalkboard,
  faUserCheck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import CardContainerCurso from "../components/CardContainerCurso";
import DashboardStatsContainer from "../components/DashboardStatsContainer";
import { UserContext } from "../context/useProvider";
import "../styles/DashboardContent.scss";
import axios from "axios";
import validateUrl from "./../hooks/config";

import TableUsers from "../components/TableUsers";

export default function DashboardContent() {
  const { onlineUsers } = useContext(UserContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [cursos, setCursos] = useState([]);
  const [sesiones, setSesiones] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const baseUrl = validateUrl();

    const getUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users`);
        const filterUser = res.data.filter((u) => u.role !== "admin");
        setUsers(filterUser);
        setTotalUsers(filterUser.length);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [setUsers, setTotalUsers]);

  useEffect(() => {
    const baseUrl = validateUrl();

    const getCursos = async () => {
      try {
        const res = await axios.get(`${baseUrl}/cursos`);
        setCursos(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCursos();
  }, [setCursos]);

  useEffect(() => {
    const baseUrl = validateUrl();

    const getSesiones = async () => {
      try {
        const res = await axios.get(`${baseUrl}/sesiones`);
        setSesiones(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSesiones();
  }, [setSesiones]);

  return (
    <>
      <div className="show__stats__container">
        <DashboardStatsContainer
          color="green"
          icon={
            <FontAwesomeIcon className="show__stats__icon" icon={faUserCheck} />
          }
          title="Usuarios Activos"
          number={onlineUsers?.length}
        />

        <DashboardStatsContainer
          color="pink"
          icon={
            <FontAwesomeIcon
              className="show__stats__icon"
              icon={faPersonChalkboard}
            />
          }
          title="Cursos Totales"
          number={cursos.length}
        />

        <DashboardStatsContainer
          color="blue"
          icon={
            <FontAwesomeIcon className="show__stats__icon" icon={faUsers} />
          }
          title="Usuarios Totales"
          number={totalUsers}
        />

        <DashboardStatsContainer
          color="purple"
          icon={
            <FontAwesomeIcon className="show__stats__icon" icon={faBookOpen} />
          }
          title="Sesiones Totales"
          number={sesiones.length}
        />
      </div>

      <div className="show__cursos__disponibles">
        <h2 className="dashboard__content__title">Cursos disponibles</h2>

        <div className="cursos__card__container">
          {cursos.map((c) => (
            <CardContainerCurso
              key={c.id}
              image={c.image}
              title={c.title}
              subtitule={c.description}
              color={c.color}
            />
          ))}
        </div>
      </div>

      <div className="show__users__container">
        <h2 className="dashboard__content__title">Usuarios</h2>
        <TableUsers users={users} />
      </div>
    </>
  );
}
