import React, { useEffect, useState } from "react";
import InputDate from "../components/InputDate";
import SelectField from "../components/selectField";
import { GetCookie } from "../hooks/cookies";
import "../styles/ProfileContainer.scss";
import InputText from "./../components/InputText";
import ToastAlert from "./ToastAlert";

export default function ProfileContainer({ myPerfil }) {
  const [show, setshow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const getCookieId = GetCookie("c_user");

  const isMyPerfil = getCookieId === myPerfil.id;

  useEffect(() => {
    setDisabled(isMyPerfil);
  }, [isMyPerfil]);

  const showAlert = () => {
    setshow(true);
    getCountTimeout();
  };

  const getCountTimeout = () => {
    setTimeout(() => {
      setshow(false);
    }, 5000);
  };

  return (
    <div className="profile__container">
      <ToastAlert
        show={show}
        success
        text={"Cambios Actualizados"}
      ></ToastAlert>

      <form
        action=""
        className={!disabled ? "perfilUpdate__hide" : "perfilUpdate"}
      >
        <div className="perfilUpdate__infoGeneral">
          <h3 className="perfilUpdate__infoGeneral__title">
            Información General
          </h3>

          <div className="perfilUpdate__infoGeneral__section1">
            <InputText
              value={myPerfil.name}
              title={"Nombre"}
              type={"text"}
            ></InputText>

            <InputText
              value={myPerfil.lastName}
              title={"Apellido"}
              type={"text"}
            ></InputText>
          </div>

          <div className="perfilUpdate__infoGeneral__section2">
            <label style={{ width: "100%" }}>
              <span>Fecha de nacimiento:</span>
              <InputDate />
            </label>

            <label style={{ width: "100%" }}>
              <span>Genero:</span>
              <SelectField
                options={["--Seleccione una opcion--", "Masculino", "Femenino"]}
              ></SelectField>
            </label>
          </div>

          <div className="perfilUpdate__infoGeneral__section3">
            <InputText value={myPerfil.email} title={"Correo Electronico"} type={"text"}></InputText>

            <InputText value={myPerfil.tel} title={"Telefono"} type={"tel"}></InputText>
          </div>
        </div>

        <div className="perfilUpdate__adress">
          <h3 className="perfilUpdate__adress__title">Datos de dirección</h3>

          <div className="perfilUpdate__adress__section1">
            <InputText value={myPerfil.name} title={"Dirección"} type={"text"}></InputText>

            <InputText value={myPerfil.name} title={"Numero"} type={"text"}></InputText>
          </div>

          <div className="perfilUpdate__adress__section2">
            <InputText value={myPerfil.name} title={"Ciudad"} type={"text"}></InputText>

            <InputText value={myPerfil.name} title={"C.P"} type={"text"}></InputText>
          </div>
        </div>

        {!disabled ? (
          ""
        ) : (
          <button className="btn__perfilUser" onClick={() => showAlert()}>
            Guardar Cambios
          </button>
        )}
      </form>
    </div>
  );
}
