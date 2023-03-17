import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";

import "../styles/TableUser.scss";

TimeAgo.addLocale(es);

export default function TableUsers({ users }) {
  const timeAgo = new TimeAgo("es-MX");

  return (
    <table className="user__table">
      <thead>
        <tr>
          <th>Nombre del estudiante</th>
          <th>Tokens</th>
          <th>Registro</th>
          <th>Nivel de estudios</th>
          <th>Grado Escolar</th>
          <th>Nombre de escuela</th>
        </tr>
      </thead>

      <tbody>
        {users?.map((u) => (
          <tr key={u.id}>
            <td>
              <div className="user__table__infoUser__name">
                <img className="user__table__img" src={u.avatar} alt="img" />
                <p>{u.name}</p>
              </div>
            </td>
            <td>{u.tokens}</td>
            <td>{timeAgo.format(new Date(u.createdAt))}</td>
            <td>{u.nivelSchool}</td>
            <td>{u.gradeSchool}</td>
            <td>{u.nameSchool}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
