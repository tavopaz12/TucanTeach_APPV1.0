import { useEffect, useState } from "react";

export function useGetSesion(id) {
  const [sesion, setSesion] = useState([]);

  useEffect(() => {
    fetch(`https:///tavopaz12.ml/api/v1/sesiones/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSesion(data);
      });
  }, [id]);

  return sesion;
}

export default useGetSesion;
