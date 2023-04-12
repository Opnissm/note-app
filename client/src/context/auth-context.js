import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import api from "../axios_config/api";

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
  const [cookie, , removeCookie] = useCookies(["token"]);

  console.log("the cookie", cookie);

  async function logout() {
    const { data } = await api.get("/logout");
    data.isSuccessful &&
      setAuth({ user: null, authenticated: false, status: "resolved" });
  }

  const value = { user, status, isAuthenticated, setAuth, logout };

  useEffect(() => {
    setAuth({ status: "loading", user: null, isAuthenticated: false });
    api
      .post("/auth", null, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
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
  }, [cookie.token]);

  return (
    <AuthContext.Provider value={value}>
      {status === "idle" || (status === "loading" && <h1>Loading...</h1>)}
      {status === "resolved" && <Outlet />}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
