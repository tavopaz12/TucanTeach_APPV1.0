import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./../context/useProvider";

const ProtecdAdmin = ({ children }) => {
  const { auth, userId, role, signOut } = useContext(UserContext);

  if (!auth || !userId || !role) {
    signOut();
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtecdAdmin;
