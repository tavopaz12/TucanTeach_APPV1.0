import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Login from "./../pages/Login";
import Dashboard from "./../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Mantenimiento from "./../pages/Mantenimiento";
import UseProvider from "../context/useProvider";
import SignUp from "./../pages/SignUp";
import RecoveryPassword from "./../pages/RecoveryPassword";
import ChangePassword from "./../pages/ChangePassword";
import RequireAuth from "./../components/RequireAuth";
import PerfilUser from "../pages/PerfilUser";
import "../styles/global.scss";
import Admin from "./../pages/Admin";
import ProtecdAdmin from "./../components/ProtecdAdmin";
import Chat from "../pages/Chat";
import DashboardContent from "../containers/DashboardContent";
import DashboardCursos from "../containers/DashboardCursos";
import DashboardUsuarios from "./../containers/DashboardUsuarios";
import DashboardFiles from "./../containers/DashboardFiles";
import ActividadDefault from "./../containers/ActividadDefault";
import TemaSession from "./../containers/TemaSession";
import Curso from "./../pages/Curso";
import Sesion from "../pages/Sesion";

function App() {
  return (
    <div>
      <UseProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
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
            <Route path="change-password" element={<ChangePassword />} />

            <Route
              exact
              path="user"
              element={
                <RequireAuth>
                  <PerfilUser />
                </RequireAuth>
              }
            >
              <Route exact path=":userName" element={<PerfilUser />} />
            </Route>

            <Route
              path="chat"
              element={
                <RequireAuth>
                  <Chat />
                </RequireAuth>
              }
            ></Route>

            <Route path="admin" element={<Admin />} />

            <Route path="curso" element={<Layout />}>
              <Route path=":idCurso/:nameCurso" element={<Curso />} />
            </Route>

            <Route
              path="curso/:idCurso/:nameCurso/sesion/:idSesion"
              element={<Sesion />}
            >
              <Route index element={<ActividadDefault />} />
              <Route path="tema/:actvividadId" element={<TemaSession />} />
            </Route>

            <Route
              path="/dashboard"
              element={
                <ProtecdAdmin>
                  <Dashboard />
                </ProtecdAdmin>
              }
            >
              <Route index element={<DashboardContent />}></Route>
              <Route path="inicio" element={<DashboardContent />}></Route>
              <Route path="cursos" element={<DashboardCursos />}></Route>
              <Route path="usuarios" element={<DashboardUsuarios />}></Route>
              <Route path="archivos" element={<DashboardFiles />}></Route>
            </Route>

            <Route
              path="*"
              element={<NotFound title={"Pagina no encontrada"} to={"/"} />}
            />
          </Route>
        </Routes>
      </UseProvider>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
