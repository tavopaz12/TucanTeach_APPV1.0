import { useEffect, useState } from "react";
import validateUrl from "./config";

export function useGetUserProfile(userName) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const baseURL = validateUrl();

    fetch(`${baseURL}/profile/${userName}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data);
      });
  }, [userName]);

  return user;
}

export default useGetUserProfile;
