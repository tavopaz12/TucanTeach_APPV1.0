import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { faEnvelope, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ToastAlert from "../containers/ToastAlert";
import Modal from "../containers/Modal";

import "../styles/Recovery.scss";

export default function RecoveryPassword() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setshow] = useState(false);
  const [isValid, setIsvalid] = useState(false);
  const [email, setEmail] = useState({
    email: "",
  });

  const captureInput = (e) => {
    setEmail({ email: e.target.value });

    const valid = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (valid.test(email.email)) {
      setIsvalid(true);
    } else {
      setIsvalid(false);
    }
  };

  const sendEmail = async () => {
    setIsLoading(true);
    setIsvalid(false);
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const res = await fetch("http://localhost:3005/api/v1/auth/recovery", {
        method: "POST",
        signal: signal,
        body: JSON.stringify(email),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();

      if (res.ok) {
        setIsLoading(false);
        setData({ data: user, message: "Registro exitoso", statusCode: 200 });
        setshow(true);
      }
      if (!res.ok) {
        setData(user);
        setIsLoading(false);
        setshow(true);
      }
    } catch (error) {
      setIsLoading(false);
      setData({
        message: "Error durante la solicitud",
        statusCode: 500,
      });
      setshow(true);
    }

    setTimeout(() => {
      setshow(false);
      setIsvalid(true);
    }, 5000);
  };

  return (
    <>
      <div className="recovery__container">
        {data.statusCode === 401 ? (
          <ToastAlert
            show={show}
            error
            text={"No existe coincidencias de este email"}
          ></ToastAlert>
        ) : data.statusCode === 200 ? (
          <Modal show></Modal>
        ) : data.statusCode === 500 ? (
          <ToastAlert show={show} error text={data.message}></ToastAlert>
        ) : (
          ""
        )}
        <div className="recovery__imageContainer"></div>
        <div className="recovery__inputContainer">
          <div className="content">
            <h2 className="content__title">¿Olvidaste tu contraseña?</h2>
            <p className="content__subtitule">
              Proporciona tu email para que podamos recuperar tu contraseña
            </p>
            <div className="form">
              <input
                type="text"
                name="name"
                required="required"
                autoComplete="off"
                onChange={captureInput}
              />
              <label htmlFor="name" className="label-name">
                <div>
                  <span className="content-name">
                    <FontAwesomeIcon className="icon" icon={faEnvelope} />
                    Email
                  </span>
                </div>
              </label>
            </div>
            <center>
              <button
                onClick={sendEmail}
                className={
                  isValid ? "content__btn" : "content__btn content__btn-hide"
                }
              >
                {isLoading ? "Enviando" : "Recuperar contraseña"}
                <FontAwesomeIcon
                  icon={faSpinner}
                  className={isLoading ? "show__loading" : "hide"}
                ></FontAwesomeIcon>
              </button>
            </center>
          </div>
        </div>
      </div>
    </>
  );
}
