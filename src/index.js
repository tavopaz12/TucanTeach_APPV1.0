import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./routes/App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MedioAmbiente from "./pages/MedioAmbiente";
import SessionsMedioAmbiente from "./pages/MedioAmbienteSesion";
import PerfilUser from "./pages/PerfilUser";
import DesarrolloHumano from "./pages/DesarrolloHumano";
import DesarrolloHumanoSesion from "./pages/DesarrolloHumanoSesion";
import TemaSession from "./containers/TemaSession";
import Mantenimiento from "./pages/Mantenimiento";
import MedioAmbienteContainer from "./containers/MedioAmbienteContainer";
import UseProvider from "./context/useProvider";
import RequireAuth from "./components/RequireAuth";
import RecoveryPassword from "./pages/RecoveryPassword";

ReactDOM.render(
  <BrowserRouter>
    <UseProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            path="inicio"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />

          <Route path="maintenance" element={<Mantenimiento />} />
          <Route path="registro" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="recovery" element={<RecoveryPassword />} />
          <Route path="change-password" element={<Mantenimiento />} />
          <Route
            path="user/:userName"
            element={
              <RequireAuth>
                <PerfilUser />
              </RequireAuth>
            }
          />

          <Route
            path="medio-ambiente"
            element={
              <RequireAuth>
                <MedioAmbienteContainer />
              </RequireAuth>
            }
          >
            <Route index element={<MedioAmbiente />} />
            <Route path=":cursoId" element={<SessionsMedioAmbiente />}>
              <Route path=":actvividadId" element={<TemaSession />} />
            </Route>
          </Route>

          <Route path="desarrollo-humano" element={<DesarrolloHumano />} />
          <Route
            path="desarrollo-humano/sesion/:cursoId"
            element={<DesarrolloHumanoSesion />}
          />

          <Route
            path="*"
            element={<NotFound title={"Pagina no encontrada"} to={"/"} />}
          />
        </Route>
      </Routes>
    </UseProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
