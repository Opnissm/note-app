import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import api from "../axiosConfig/axiosConfig";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider() {
  const [{ user, status, isAuthenticated }, setAuth] = useState({
    user: null,
    status: "idle",
    isAuthenticated: false,
  });
  const removeCookie = useCookies()[2];

  function logout() {
    removeCookie(["token"], { path: "/" });
    setAuth({ user: null, authenticated: false, status: "resolved" });
  }

  const value = { user, status, isAuthenticated, setAuth, logout };

  useEffect(() => {
    setAuth({ status: "loading", user: null, isAuthenticated: false });
    api
      .post("/auth")
      .then((res) => {
        console.log(res.data.authenticated);
        if (!res.data.authenticated) {
          return setAuth({
            user: null,
            isAuthenticated: false,
            status: "resolved",
          });
        }

        const { user } = res.data;

        return setAuth({ user, isAuthenticated: true, status: "resolved" });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {status === "idle" || status === "loading" ? <h1>Loading...</h1> : null}
      {status === "resolved" && <Outlet />}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
