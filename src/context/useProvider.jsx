import { createContext, useState } from "react";
import { GetCookie, SetCookie } from "../hooks/cookies";

export const UserContext = createContext();

const UseProvider = (props) => {
  const [userId, setUserId] = useState(GetCookie("c_user"));
  const [auth, setAuth] = useState(GetCookie("auth"));
  const [role, setRole] = useState(GetCookie("r_user"));

  const signIn = (token, user) => {
    SetCookie("auth", token, 15);
    SetCookie("c_user", user.user.id, 15);
    SetCookie("r_user", null, 15);

    if (user.user.role === "admin") {
      SetCookie("r_user", "CRlYh4nbPiZNU", 15);
    }

    setAuth(token);
    setUserId(user.user.id);
    setRole(user.user.role);
  };

  const signOut = () => {
    SetCookie("auth", "", 0);
    SetCookie("c_user", "", 0);
    SetCookie("r_user", "", 0);

    setAuth("");
    setUserId("");
    setRole("");
  };
  return (
    <UserContext.Provider value={{ userId, auth, role, signIn, signOut }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UseProvider;
