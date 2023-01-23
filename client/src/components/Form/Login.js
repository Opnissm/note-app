import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router";
import api from "../../axiosConfig/axiosConfig.js";
import { useAuth } from "../../context/auth-context.js";

function Login() {
  const [, setCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmmiting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const usernameFieldRef = useRef(null);
  const { isAuthenticated, setAuth } = useAuth();

  useEffect(() => {
    usernameFieldRef.current.focus();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      return setErrorMsg("Username and Password are required");
    }
    setIsSubmmiting(true);
    const { data } = await api.post("/login", {
      username,
      password,
    });
    const { errorMsg, token, user } = data;

    setIsSubmmiting(false);
    if (errorMsg) return setErrorMsg(errorMsg);
    setCookie("token", token, { path: "/" });
    setAuth({ user, isAuthenticated: true, status: "resolved" });
  }

  if (isAuthenticated) {
    return <Navigate to="/note" replace />;
  }

  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
      <input
        ref={usernameFieldRef}
        type="text"
        placeholder="Username"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMsg ? <p className="text-red-500">{errorMsg}</p> : null}
      <input
        type="submit"
        value={`${isSubmitting ? "Loading..." : "Login"}`}
        disabled={isSubmitting}
        className={`${
          isSubmitting ? "opacity-70" : ""
        } bg-amber-400 text-lg  px-3 py-2 text-white rounded-md cursor-pointer outline-none hover:bg-amber-500 focus:ring-2 focus:ring-amber-200 hover:shadow-md`}
      />
    </form>
  );
}

export default Login;
