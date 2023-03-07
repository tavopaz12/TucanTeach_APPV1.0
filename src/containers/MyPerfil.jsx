import React from "react";

import InputText from "./../components/InputText";

import "react-loading-skeleton/dist/skeleton.css";
import AsidePerfilUser from "../components/AsidePerfilUser";

import "./../styles/MyPerfil.scss";

export default function MyPerfil({ myPerfil, loader }) {
  const notify = (e) => {
    e.preventDefault();

    Notification.requestPermission().then((permission) => {
      const notification = new Notification("Cambios Actualizados", {
        body: "Los cambios fueron actualizados",
        icon: "https://cdn-icons-png.flaticon.com/512/3759/3759237.png",
      });

      notification.onclick = (event) => {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open("http://localhost:3000/user/tavopaz12", "_blank");
      };
    });
  };

  return (
    <>
      <div className="myPerfil__container">
        <AsidePerfilUser myPerfil={myPerfil} loader={loader} />

        <section className="myPerfil__container__section">
          <div className="myPerfil__container__section__form">
            <form>
              <label htmlFor="">
                <p>
                  Escribe algo sobre ti para que las demas personas puedan verlo
                </p>
                <textarea
                  className="myPerfil__container__section__form__textarea"
                  placeholder={`${myPerfil.about}`}
                ></textarea>

                <div className="myPerfil__container__section__form__btnAboutMe">
                  <button className="btn__update" onClick={notify}>
                    Actualizar
                  </button>
                </div>
              </label>
            </form>
            <form>
              <p className="myPerfil__container__section__form__title">
                Editar Informacion:{" "}
              </p>

              <div className="myPerfil__container__section__form__colFlex">
                <InputText type={"text"} title={"Nombre"} />
                <InputText type={"text"} title={"Apellidos"} />
              </div>

              <div className="myPerfil__container__section__form__colFlex">
                <InputText type={"email"} title={"Email"} />
                <InputText type={"tel"} title={"Telefono"} />
              </div>

              <div className="myPerfil__container__section__form__colFlex">
                <InputText type={"text"} title={"Escuela"} />
                <InputText type={"text"} title={"Grado escolar"} />
              </div>

              <div className="myPerfil__container__section__form__btnAboutMe">
                <button className="btn__update">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
