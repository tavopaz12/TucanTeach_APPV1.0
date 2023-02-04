import { useEffect, useState } from "react";

export function useGetUserProfile(userName) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/api/v1/profile/${userName}`)
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
