import { useEffect, useState } from "react";

export function useGetSesion(id) {
  const [sesion, setSesion] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/api/v1/sesiones/${id}`)
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
