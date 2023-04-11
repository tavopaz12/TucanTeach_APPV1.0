import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ListCursos from "../components/ListCursos";
import ModalAddCurso from "../components/ModalAddCurso";
import "../styles/DashboardCurso.scss";
import validateUrl from "./../hooks/config";
import axios from "axios";

export default function DashboardCursos() {
  const [showAddCurso, setAddNewCurso] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [dataCursos, setDataCursos] = useState([]);

  useEffect(() => {
    const baseUrl = validateUrl();

    const getCursos = async () => {
      try {
        const res = await axios.get(`${baseUrl}/cursos`);
        setCursos(res.data);
        setDataCursos(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCursos();
  }, [setCursos]);

  const agregarNuevoCurso = async () => {
    const baseUrl = validateUrl();
    const res = await axios.get(`${baseUrl}/cursos`);
    setCursos(res.data);
  };

  const searchCurso = (evt) => {
    const query = evt.target.value.toLowerCase();

    const searchCurso = dataCursos.filter((curso) => {
      if (curso.title.toLowerCase().includes(query)) {
        return curso;
      }

      return false;
    });

    setCursos(searchCurso);
  };

  return (
    <>
      <ModalAddCurso
        actualizarCursos={agregarNuevoCurso}
        show={showAddCurso}
        setAddNewCurso={setAddNewCurso}
      />

      <div className="show__cursos__disponibles">
        <h2 className="dashboard__content__title">Cursos disponibles</h2>

        <div className="search__curso__dashboard">
          <input
            onChange={searchCurso}
            type="text"
            placeholder="Buscar un curso"
          />
          <button>Buscar Curso</button>
        </div>

        <div className="new__curso__dashboard">
          <button onClick={() => setAddNewCurso(true)}>
            <p className="title__add">Agregar Nuevo Curso</p>
            <FontAwesomeIcon className="icon__add" icon={faAdd} />
          </button>
        </div>

        {cursos?.map((c) => (
          <ListCursos key={c.id} curso={c} />
        ))}

        {cursos?.length === 0 ? (
          <p className="not__results">Ningun curso encontrado</p>
        ) : null}
      </div>
    </>
  );
}
