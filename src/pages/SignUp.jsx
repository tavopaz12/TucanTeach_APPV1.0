import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// ESTILOS

import "../styles/Login/InputLogin.scss";
import "../styles/Login/ButtonLogin.scss";
import "../styles/Login/Login.scss";

// CONTENDEDORES
import InformacionBasica from "../containers/InformacionBasica";
import InformacionEscolar from "../containers/InformacionEscolar";
import InformacionContacto from "../containers/InformacionContacto";
import { Navigate, NavLink } from "react-router-dom";
import ToastAlert from "../containers/ToastAlert";

import imagen from "../assets/images/login.webp";
import validateUrl from "./../hooks/config";

function SignUp() {
  const baseURL = validateUrl();

  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState({
    email: {
      err: false,
      msgErr: "",
    },
    password: {
      err: false,
      msgErr: "",
    },
    input: {
      err: false,
      msgErr: "",
    },
  });
  const [show, setshow] = useState(false);
  const id = uuidv4();

  const [formData, setFormData] = useState({
    id,
    name: "",
    lastName: "",
    userName: "",

    nivelSchool: "",
    nameSchool: "",
    gradeSchool: "",
    ubicacionSchool: "",

    email: "",
    password: "",
    cellPhone: "",
  });

  const registerUser = async (e) => {
    const controller = new AbortController();
    const signal = controller.signal;
    e.preventDefault();
    try {
      const res = await fetch(`${baseURL}/users`, {
        method: "POST",
        signal: signal,
        body: JSON.stringify(formData),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();

      if (res.ok) {
        setData({ data: user, message: "Registro exitoso", statusCode: 200 });
        setshow(true);
        setIsDisabled(true);
        setTimeout(() => {
          setIsRegister(true);
        }, 5000);
      }
      if (!res.ok) {
        setData(user);
        setshow(true);
      }
    } catch (error) {
      setData({
        message: "Error durante la solicitud",
        statusCode: 500,
      });
      setshow(true);
    }

    setTimeout(() => {
      setshow(false);
    }, 5000);
  };

  console.log(data.errors);

  const componentList = [
    <InformacionBasica
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
    />,

    <InformacionEscolar
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
    />,

    <InformacionContacto
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
      setErrors={setErrors}
      errors={errors}
    />,
  ];

  if (isRegister) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="login">
        {data.statusCode === 200 ? (
          <ToastAlert
            show={show}
            success
            text={"Registro exitoso"}
          ></ToastAlert>
        ) : data.statusCode === 400 ? (
          <ToastAlert show={show} error text={data.message}></ToastAlert>
        ) : data.statusCode === 409 ? (
          <ToastAlert
            show={show}
            error
            text={`${
              data.errors[0].path === "user_name"
                ? "Este nombre de usuario ya se encuentra registrado!!!"
                : "El email ya se encuentra registrado!!!"
            }`}
          ></ToastAlert>
        ) : data.statusCode === 500 ? (
          <ToastAlert show={show} error text={data.message}></ToastAlert>
        ) : (
          ""
        )}
        <div className="image__login">
          <img src={imagen} alt="" width="150%" />
        </div>
        <div className="form__login">
          <h2 className="form__login__title">Formulario de registro</h2>

          <div className="bird-container bird-container--one">
            <div className="bird bird--one"></div>
          </div>

          <div className="steps">
            <p
              style={{
                textDecoration:
                  page === 0
                    ? "none"
                    : page === 1
                    ? "line-through #1c3d36 3px"
                    : page === 2
                    ? "line-through #1c3d36 3px"
                    : "none",
              }}
            >
              Personal
            </p>

            <p
              style={{
                textDecoration:
                  page === 0
                    ? "none"
                    : page === 1
                    ? "none"
                    : page === 2
                    ? "line-through #1c3d36 3px"
                    : "none",
              }}
            >
              Escolar
            </p>

            <p>Contacto</p>
          </div>
          <div className="progress-bar">
            <div
              style={{
                width:
                  page === 0
                    ? "33%"
                    : page === 1
                    ? "66%"
                    : page === 2
                    ? "100%"
                    : "100%",
              }}
            ></div>
          </div>
          <form
            action=""
            onSubmit={registerUser}
            className={isDisabled ? "hide__inputs" : ""}
          >
            <div>{componentList[page]}</div>
          </form>
          <br />
          <div>
            <p href="" className="create__account">
              Ya tengo una cuenta!!{" "}
              <NavLink to="/login" className="register">
                Iniciar Sesión
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
