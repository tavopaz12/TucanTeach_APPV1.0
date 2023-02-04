import { createContext, useState } from "react";
import { GetCookie, SetCookie } from "../hooks/cookies";

export const UserContext = createContext();

const UseProvider = (props) => {
  const [userId, setUserId] = useState(GetCookie("c_user"));
  const [auth, setAuth] = useState(GetCookie("auth"));

  const signIn = (token, user) => {
    SetCookie("auth", token, 15);
    SetCookie("c_user", user.user.id, 15);

    setAuth(token);
    setUserId(user.user.id);
  };

  const signOut = () => {
    SetCookie("auth", "", 0);
    SetCookie("c_user", "", 0);

    setAuth("");
    setUserId("");
  };
  return (
    <UserContext.Provider value={{ userId, auth, signIn, signOut }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UseProvider;
