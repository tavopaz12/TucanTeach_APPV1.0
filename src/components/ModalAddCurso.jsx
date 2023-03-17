import { useState } from "react";
import CardContainerCurso from "../components/CardContainerCurso";
import SelectColor from "../components/SelectColor";
import axios from "axios";
import validateUrl from "./../hooks/config";
import ToastAlert from "../containers/ToastAlert";

export default function ModalAddCurso({
  show,
  setAddNewCurso,
  actualizarCursos,
}) {
  const [file, setFile] = useState("");
  const baseUrl = validateUrl();
  const [status, setStatus] = useState(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    color: "gray",
    image: "https://tavopaz12.ml/public/1678825668337.webp",
  });

  const handleImageSelect = (e) => {
    setFile(e.target.files[0]);

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;
      setData({ ...data, image: imageDataUrl });
    };

    reader.readAsDataURL(file);
  };

  const isFormDisabled = () => {
    return (
      file === "" ||
      data.title.trim() === "" ||
      data.description.trim() === "" ||
      data.color.trim() === ""
    );
  };

  const handleNewCurso = async (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("color", data.color);
    formData.append("image", file);

    try {
      const res = await axios.post(`${baseUrl}/cursos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      actualizarCursos();
      setStatus(res.status);
      setFile(null);
      setData({
        title: "",
        description: "",
        color: "",
        image: "https://tavopaz12.ml/public/1678825668337.webp",
      });
    } catch (error) {
      setStatus(400);
    }

    setTimeout(() => {
      setStatus(null);
    }, 5000);
  };

  return (
    <div className={`modal__add__curso${show ? " show" : ""}`}>
      <div className={`add__curso__container${show ? " show" : ""}`}>
        <div className="add__curso__form">
          <p className="title">Agregar Nuevo Curso</p>

          {status === 201 && (
            <ToastAlert show success text="Curso creado con exito" />
          )}
          {status === 400 && (
            <ToastAlert show error text="Hubo un error al crear el curso" />
          )}
          {status === 500 && (
            <ToastAlert show error text="Error durante la solicitud" />
          )}

          <div className="form__container">
            <form action="" onSubmit={handleNewCurso}>
              <label htmlFor="">
                <span>Titulo</span>
                <input
                  value={data.title}
                  required
                  type="text"
                  placeholder={"Agrega un titulo"}
                  onChange={(evt) =>
                    setData({ ...data, title: evt.target.value })
                  }
                />
              </label>
              <br />
              <br />

              <label htmlFor="">
                <span>Color de Fondo</span>
                <SelectColor setData={setData} data={data} />
              </label>
              <br />
              <br />

              <label htmlFor="">
                <span>Descripción</span>
                <textarea
                  value={data.description}
                  required
                  rows={5}
                  placeholder={"Agrega una descripción"}
                  type="text"
                  onChange={(evt) =>
                    setData({ ...data, description: evt.target.value })
                  }
                />
              </label>
              <br />
              <br />

              <label htmlFor="">
                <span>Imagen</span>

                <div className="box">
                  <input
                    required
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleImageSelect}
                    name="file-1"
                    id="file-1"
                    className="inputfile inputfile-1"
                    multiple
                  />
                  <label htmlFor="file-1">
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

              <div className="btn__group__modal">
                <button
                  className="close"
                  onClick={(evt) => {
                    evt.preventDefault();
                    setAddNewCurso(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  disabled={isFormDisabled()}
                  className={isFormDisabled() ? "save disable" : "save"}
                >
                  Agregar curso
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="preview__curso">
          <CardContainerCurso
            image={data.image}
            title={data.title ? data.title : "Agrega un titulo"}
            subtitule={
              data.description ? data.description : "Agrega una descripción"
            }
            color={data.color ? data.color : "gray"}
          />
        </div>
      </div>
    </div>
  );
}
