import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import "./../styles/ChangePassword.scss";
import ToastAlert from "../containers/ToastAlert";
import Modal from "../containers/Modal";

export default function ChangePassword() {
  const [data, setData] = useState([]);

  let location = useLocation();
  const [show, setshow] = useState(false);

  const token = location.search.split("=").at(1);
  const passRegexp = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[ !@#$%^&*_=+-]).{8,20}$/
  );

  const [body, setBody] = useState({
    newPassword: "",
    token,
  });

  const [isValid, setIsValid] = useState(true);
  const [isEqual, setIsEqual] = useState(true);

  const [dataPassword, setDataPassword] = useState({
    password: "",
    repeatPassword: "",
  });

  const validPassword = () => {
    const isValid = passRegexp.test(dataPassword.password);

    if (isValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const readPassword = (e) => {
    setDataPassword({
      ...dataPassword,
      password: e.target.value,
    });

    validPassword();
  };

  const readRepeatPassword = (e) => {
    setDataPassword({
      ...dataPassword,
      repeatPassword: e.target.value,
    });
  };

  const validEqual = () => {
    const isEqual = dataPassword.password === dataPassword.repeatPassword;
    if (isEqual) {
      setIsEqual(true);
      setBody({ ...body, newPassword: dataPassword.repeatPassword });
    } else {
      setIsEqual(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const res = await fetch(
        "https://tavopaz12.ml/api/v1/auth/change-password",
        {
          method: "POST",
          signal: signal,
          body: JSON.stringify(body),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      const user = await res.json();

      if (res.ok) {
        setData({
          data: user,
          message: "Contraseña cambiada",
          statusCode: 200,
        });
        setshow(true);
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

  console.log(data);

  return (
    <div>
      {data.statusCode === 401 ? (
        <ToastAlert
          show={show}
          error
          text={"Ups!! El token no es valido"}
        ></ToastAlert>
      ) : data.statusCode === 200 ? (
        <Modal show changePassword></Modal>
      ) : data.statusCode === 500 ? (
        <ToastAlert show={show} error text={data.message}></ToastAlert>
      ) : (
        ""
      )}
      <div className="changePassword__container">
        <div className="changePassword__imageContainer"></div>
        <div className="recovery__inputContainer">
          <div className="content">
            <h2 className="content__title">Crear nueva contraseña</h2>
            <span className="content__subtitule">
              Ingresa tu nueva contraseña, incluye una mayucula <pre />
              un numero y un minimo de 8 caracteres
            </span>
            <br />
            <br />
            <form onSubmit={changePassword}>
              <div className="form">
                <input
                  type="password"
                  name="name"
                  required="required"
                  autoComplete="off"
                  onChange={readPassword}
                />
                <label htmlFor="name" className="label-name">
                  <div>
                    <span className="content-name">
                      <FontAwesomeIcon className="icon" icon={faLock} />
                      Nueva contraseña
                    </span>
                  </div>
                </label>
              </div>
              {!isValid ? (
                <p className="text-err">Ingresa una contraseña valida</p>
              ) : (
                ""
              )}

              <br />
              <div className="form">
                <input
                  type="password"
                  name="name"
                  required="required"
                  autoComplete="off"
                  onChange={readRepeatPassword}
                  onKeyUp={validEqual}
                />
                <label htmlFor="name" className="label-name">
                  <div>
                    <span className="content-name">
                      <FontAwesomeIcon className="icon" icon={faLock} />
                      Repite la contraseña
                    </span>
                  </div>
                </label>
              </div>
              {!isEqual ? (
                <p className="text-err">Las contraseñas no coinciden</p>
              ) : (
                ""
              )}
              <br />
              <center>
                <button
                  className={
                    !isValid
                      ? "content__btn content__btn-hide"
                      : !isEqual
                      ? "content__btn content__btn-hide"
                      : "content__btn"
                  }
                >
                  Cambiar contraseña
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
