import React, { useContext, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import BtnSendForm from "../components/BtnSendForm";
import InputEmail from "../components/InputEmail";
import InputPassword from "../components/InputPassword";
import "../styles/Login/BtnTucan.scss";
import ToastAlert from "../containers/ToastAlert";
import { UserContext } from "../context/useProvider";
import imagen from "../assets/images/login.jpg";

function Login() {
  const { signIn } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [errors, setErrors] = useState({
    email: {
      err: false,
      msgErr: "",
    },
    password: {
      err: false,
      msgErr: "",
    },
    input: {
      err: false,
      msgErr: "",
    },
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    const controller = new AbortController();
    const signal = controller.signal;
    e.preventDefault();
    try {
      const res = await fetch("https://tavopaz12.ml/api/v1/auth/login", {
        method: "POST",
        signal: signal,
        body: JSON.stringify(formData),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();

      if (res.ok) {
        setData({
          data: user,
          message: "Inicio de sesion exitoso",
          status: 200,
        });
        setShow(true);
        signIn(user.token, user);
        setTimeout(() => {
          setIsLogin(true);
        }, 0);
      }
      if (!res.ok) {
        setData(user);
        setShow(true);
      }
    } catch (error) {
      setData({
        message: "Error durante la solicitud",
        statusCode: 500,
      });
      setShow(true);
    }

    setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  if (isLogin) {
    return <Navigate to="/inicio" />;
  }
  return (
    <div className="login">
      {data.statusCode === 401 ? (
        <ToastAlert show={show} error text={data.message}></ToastAlert>
      ) : data.statusCode === 500 ? (
        <ToastAlert show={show} error text={data.message}></ToastAlert>
      ) : (
        ""
      )}
      <div className="image__login">
        <img src={imagen} alt="" width="150%" />
      </div>
      <div className="form__login">
        <h2 className="form__login__title">Bienvenido</h2>

        <div className="bird-container bird-container--one">
          <div className="bird bird--one"></div>
        </div>

        <br></br>
        <form action="" onSubmit={loginUser}>
          <InputEmail
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            pattern={
              "[a-zA-Z0-9!#$%&'*_+-]([.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|d)+[a-zA-Z0-9][.][a-zA-Z]{2,4}([.][a-zA-Z]{2})?"
            }
            title={"Introduce un correo valido"}
          />
          <br />

          <InputPassword
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            maxlength={"12"}
          />
          <div className="right">
            <NavLink className="forgot__password" to="/recovery">
              He olvidado mi contraseña
            </NavLink>
          </div>

          <br />
          <br />
          <center>
            <BtnSendForm
              formData={formData}
              errors={errors}
              titleBtn={"Acceder"}
            />
          </center>
        </form>
        <br />
        <br />
        <hr />
        <br />
        <div>
          <h3 href="" className="create__account">
            ¿Aun no tienes una cuenta? <pre></pre>
            <NavLink to="/registro" className="register">
              Crear una nueva cuenta
            </NavLink>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
