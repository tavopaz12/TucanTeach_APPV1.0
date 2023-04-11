import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "../styles/ModalAddSesion.scss";
import { v4 as uuidv4 } from "uuid";
import validateUrl from "./../hooks/config";
import axios from "axios";
import ToastAlert from "./../containers/ToastAlert";

export default function ModalAddSesion({
  curso,
  setShowModalSesion,
  setSesiones,
  sesiones,
}) {
  const [status, setStatus] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const id = `${title.toLowerCase().replace(/\s+/g, "-")}-${uuidv4().slice(
    0,
    8
  )}`;

  const previewSesionImage = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;
      setImage(imageDataUrl);
    };

    reader.readAsDataURL(file);
  };

  const isFormDisabled = () => {
    return (
      fileImage === null || title.trim() === "" || description.trim() === ""
    );
  };

  const handleNewSesion = async (evt) => {
    evt.preventDefault();
    const baseUrl = validateUrl();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("objective", description);
    formData.append("image", fileImage);
    formData.append("cursoId", curso.id);

    try {
      const res = await axios.post(`${baseUrl}/sesiones`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setStatus(res.status);
      setSesiones([...sesiones, res.data]);

      setFileImage(null);
      setDescription("");
      setImage("");
      setTitle("");
    } catch (error) {
      setStatus(400);
    }

    setTimeout(() => {
      setStatus(null);
    }, 5000);
  };

  return (
    <div className="modal__addSesion">
      {status === 201 && (
        <ToastAlert show success text="Sesión creada con exito" />
      )}
      {status === 400 && (
        <ToastAlert show error text="Hubo un error al crear la sesión" />
      )}
      {status === 500 && (
        <ToastAlert show error text="Error durante la solicitud" />
      )}

      <div className="container">
        <div className="form__container">
          <div className="close__modalSesion">
            <FontAwesomeIcon
              className="icon"
              onClick={() => setShowModalSesion(false)}
              icon={faXmark}
            />
          </div>
          <h3>Agregar Nueva sesion al curso {curso.title}</h3>
          <form action="" onSubmit={handleNewSesion}>
            <div className="input-container ic1">
              <input
                value={title}
                required
                onChange={(evt) => setTitle(evt.target.value)}
                id="title"
                className="input"
                type="text"
                placeholder=" "
              />
              <div className="cut"></div>
              <label htmlFor="title" className="placeholder">
                Titulo
              </label>
            </div>
            <div className="input-container ic1">
              <input
                value={description}
                required
                onChange={(evt) => setDescription(evt.target.value)}
                id="desc"
                className="input"
                type="text"
                placeholder=" "
              />
              <div className="cut"></div>
              <label htmlFor="desc" className="placeholder">
                Objetivo
              </label>
            </div>

            <br />

            <label>
              <div className="box">
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="file-2"
                  id="file-2"
                  onChange={previewSesionImage}
                  className="inputfile inputfile-1"
                  multiple
                />
                <label htmlFor="file-2" style={{ backgroundColor: "#2f3bdc" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                  >
                    <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                  </svg>
                  <span>Elige una imagen</span>
                </label>
              </div>
            </label>

            <div className="btn__groups">
              <button
                className="close__sesion"
                onClick={() => setShowModalSesion(false)}
              >
                Cancelar
              </button>
              <button
                disabled={isFormDisabled()}
                className={
                  isFormDisabled() ? "save__sesion disable" : "save__sesion"
                }
              >
                Guardar
              </button>
            </div>
          </form>
        </div>

        <div className="preview__sesion">
          <div>
            <img
              src={image || "https://tavopaz12.ml/public/1678825668337.webp"}
              alt=""
            />
            <div className="bottom_info">
              <p className="title">{title || "Titulo"}</p>
              <p className="desc">{description || "Descripcion"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
