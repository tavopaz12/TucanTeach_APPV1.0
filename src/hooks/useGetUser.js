import { useEffect, useState } from "react";
import validateUrl from "./config";

export function useGetUser(id) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const baseURL = validateUrl();

    fetch(`${baseURL}/users/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data);
      });
  }, [id]);

  return user;
}

export default useGetUser;
