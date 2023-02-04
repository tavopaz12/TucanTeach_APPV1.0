import {
  faHome,
  faMoon,
  faRightFromBracket,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/useProvider";
import "../styles/ContainerTools.scss";

function ContainerTools() {
  const { signOut } = useContext(UserContext);

  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, [checked]);

  const toggleThemeChange = () => {
    if (checked === false) {
      localStorage.setItem("theme", "dark");
      setChecked(true);
    } else {
      localStorage.setItem("theme", "light");
      setChecked(false);
    }
  };

  return (
    <div className="container__tools">
      <div className="container__tools__icon">
        <Link to="/" className="link">
          <FontAwesomeIcon icon={faHome} />
        </Link>

        <FontAwesomeIcon onClick={signOut} icon={faRightFromBracket} />

        <div className="container-switch">
          <div className="icon">
            {checked ? (
              <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
            )}
          </div>
          <input
            className="switch"
            type="checkbox"
            defaultChecked={checked}
            onChange={() => toggleThemeChange()}
          />
        </div>
      </div>
    </div>
  );
}

export default ContainerTools;
