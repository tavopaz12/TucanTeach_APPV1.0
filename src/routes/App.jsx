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

            <Route
              path="/dashboard"
              element={
                <ProtecdAdmin>
                  <Dashboard />
                </ProtecdAdmin>
              }
            />

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
