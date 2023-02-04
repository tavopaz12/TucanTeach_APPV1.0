import { useEffect, useState } from "react";

export function useGetUser(id) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/api/v1/users/${id}`)
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
 