import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
import api from "../../../axios_config/api";
import { useAuth } from "../../../context/auth-context";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters long"),
  })
  .required();
function Signup() {
  const {
    register,
    setFocus,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);

  const usernameErrMsg = errors?.username?.message;
  const emailErrMsg = errors?.email?.message;
  const passwordErrMsg = errors?.password?.message;
  useEffect(() => {
    setFocus("username");
  }, []);

  async function onSubmit(data) {
    const { username, email, password } = data;
    try {
      const { data } = await api.post("/signup", {
        username,
        email,
        password,
      });
      const { formErrors, isSuccessful, token, user } = data;

      if (!isSuccessful) {
        const { usernameErr, passwordErr, emailErr } = formErrors;

        if (usernameErr) {
          setError("username", { message: usernameErr });
        }
        if (passwordErr) {
          setError("password", { message: passwordErr });
        }
        if (emailErr) {
          setError("email", { message: emailErr });
        }
        return;
      }
      setCookie("token", token, { path: "/" });
      setAuth({ user, isAuthenticated: true, status: "resolved" });
      navigate("/note", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username")}
        type="text"
        placeholder="Username"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
      />
      {usernameErrMsg ? (
        <p className="text-red-500 text-sm">{usernameErrMsg}</p>
      ) : null}
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
      />
      {emailErrMsg ? (
        <p className="text-red-500 text-sm">{emailErrMsg}</p>
      ) : null}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
      />
      {passwordErrMsg ? (
        <p className="text-red-500 text-sm">{passwordErrMsg}</p>
      ) : null}
      <input
        type="submit"
        value={isSubmitting ? "Loading..." : "Create account"}
        disabled={isSubmitting}
        className="text-lg bg-amber-400 px-3 py-2 text-white rounded-md cursor-pointer outline-none hover:bg-amber-500 focus:ring-2 focus:ring-amber-200 hover:shadow-md"
      />
    </form>
  );
}

export default Signup;
