import React, { useContext, useState } from "react";
import axios from "axios";
import "../styles/Admin.scss";
import ToastAlert from "../containers/ToastAlert";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/useProvider";

export default function Admin() {
  const { signIn } = useContext(UserContext);

  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState({
    statusCode: "",
    message: "",
    role: "",
  });

  const [show, setShow] = useState(false);

  const temporizador = () => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://tavopaz12.ml/api/v1/auth/login", {
        ...body,
      })
      .then((res) => {
        const user = res.data;
        setShow(true);

        if (user.user.role === "admin") {
          signIn(user.token, user);
        }

        setData({
          statusCode: res.status,
          message: "Logeo exitoso",
          role: res.data.user.role,
        });
      })
      .catch((err) => {
        setShow(true);
        const res = err.response.data;
        setData({
          statusCode: res.statusCode,
          message: res.message,
        });
      });

    temporizador();
  };

  console.log(data);

  if (data.role === "admin") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="admin_login">
      {data.role === "student" ? (
        <ToastAlert
          show={show}
          warning
          text={"Solo los usuarios administradores pueden acceder"}
        />
      ) : data.statusCode === 401 ? (
        <ToastAlert show={show} error text={data.message} />
      ) : (
        ""
      )}
      <div className="admin_login_container">
        <div className="admin_login_header">
          <p>TucanTeach - Administrador</p>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="admin_login_login">
            <label htmlFor="" className="admin_login_login_label">
              Correo Electronico:
              <pre></pre>
              <input
                type="email"
                value={body.email}
                onChange={(e) => setBody({ ...body, email: e.target.value })}
              />
            </label>

            <label htmlFor="" className="admin_login_login_label">
              Contraseña:
              <pre></pre>
              <input
                type="password"
                value={body.password}
                onChange={(e) => setBody({ ...body, password: e.target.value })}
              />
            </label>
          </div>

          <button className="admin_login_btn">Ingresar</button>
        </form>
      </div>
    </div>
  );
}
