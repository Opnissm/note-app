import { createContext, useContext, useEffect, useState } from "react";
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

  const value = { auth, setAuth };
  useEffect(() => {
    setAuth({ status: "loading" });
    axios
      .post("/auth")
      .then((res) => {
        if (!res.data.authenticated)
          return setAuth({
            user: null,
            isAuthenticated: false,
            status: "resolved",
          });

        const { user } = res.data;
        return setAuth({ user, isAuthenticated: true, status: "resolved" });
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(auth);
  return (
    <AuthContext.Provider value={value}>
      {auth.status === "loading" ||
        (auth.status === "idle" && <h1>Loading...</h1>)}

      {auth.status === "resolved" && <Outlet />}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
