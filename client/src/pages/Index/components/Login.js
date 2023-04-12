import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../../../axios_config/api.js";
import { useAuth } from "../../../context/auth-context.js";
const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

function Login() {
  const [, setCookie] = useCookies(["token"]);
  const {
    setError,
    setFocus,
    register,
    watch,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { isAuthenticated, setAuth, user } = useAuth();

  const usernameErrMsg = errors?.username?.message;
  const passwordErrMsg = errors?.password?.message;
  const backendFormErrMsg = errors?.backendFormErrMsg?.message;
  useEffect(() => {
    if (usernameErrMsg || passwordErrMsg) {
      setError("backendFormErrMsg");
      return;
    }
  }, [usernameErrMsg, passwordErrMsg]);

  useEffect(() => {
    setFocus("username");
  }, []);
  async function onSubmit(data) {
    const { username, password } = data;
    try {
      const { data } = await api.post("/login", {
        username,
        password,
      });
      const { errorMsg, token, user } = data;

      if (errorMsg) {
        setError("backendFormErrMsg", { message: errorMsg });
        return;
      }
      setAuth({ user, isAuthenticated: true, status: "resolved" });
    } catch (err) {
      console.log(err);
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/notes" replace />;
  }

  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username")}
        type="text"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
        placeholder="Username"
      />
      {usernameErrMsg ? (
        <p className="text-red-500 text-sm">{usernameErrMsg}</p>
      ) : null}
      <input
        {...register("password")}
        type="password"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
        placeholder="Password"
      />
      {passwordErrMsg ? (
        <p className="text-red-500 text-sm">{passwordErrMsg}</p>
      ) : null}
      {backendFormErrMsg ? (
        <p className="text-red-500 text-sm">{backendFormErrMsg}</p>
      ) : null}
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
