import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./../context/useProvider";

const RequireAuth = ({ children }) => {
  const { auth, userId, signOut } = useContext(UserContext);

  if (!auth || !userId) {
    signOut();
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
