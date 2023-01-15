import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import axios from "../axiosConfig/axiosConfig";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider() {
  const [auth, setAuth] = useState({
    user: null,
    status: "idle",
    isAuthenticated: false,
  });
  const removeCookie = useCookies()[2];

  function logout() {
    removeCookie(["token"]);
    setAuth({ user: null, authenticated: false, status: "resolved" });
  }

  const value = { auth, setAuth, logout };

  useEffect(() => {
    setAuth({ status: "loading", user: null, isAuthenticated: false });
    axios
      .post("/auth", {}, { withCredentials: true })
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
      {auth.status === "idle" || auth.status === "loading" ? (
        <h1>Loading...</h1>
      ) : null}
      {auth.status === "resolved" && <Outlet />}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
