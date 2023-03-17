import React, { useEffect, useState } from "react";

import Header from "../containers/Header";
import CardSection from "../containers/CardSection";

import "../styles/Home.scss";
import PreLoaderTetris from "./../components/PreLoaderTetris";

import { getCursos } from "../hooks/curso.service";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    async function loadCursos() {
      const res = await getCursos();

      if (res.status === 200) {
        setCursos(res.data);
        setIsLoading(false);
      }
    }

    loadCursos();
  }, []);

  return (
    <>
      {isLoading && <PreLoaderTetris></PreLoaderTetris>}
      <div className="bg__home"></div>

      <div className="home__container">
        <Header></Header>

        <div className="cards__container">

          {cursos.map((curso) => (
            <CardSection
              key={curso.id}
              id={curso.id}
              image={`${curso.image}`}
              title={curso.title}
              description={curso.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
