import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios_config/api";
import SuccessfulRequestPassword from "./SuccessfulRequestPassword";

const schema = yup.object({
  email: yup.string().required("Email is required"),
});
function ForgotPassword() {
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
  const navigate = useNavigate();
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

  const emailErr = errors?.email?.message;

  useEffect(() => {
    setFocus("email");
  }, []);
  async function onSubmit(data) {
    try {
      const { email } = data;
      const { data: responseData } = await api.post("/forgotPassword", {
        email,
      });

      const { isSuccessful, errorMsg } = responseData;
      if (!isSuccessful) {
        alert(errorMsg);
        return;
      }

      setIsRequestSuccessful(isSuccessful);
    } catch (err) {
      console.log(err);
    }
  }
  return isRequestSuccessful ? (
    <SuccessfulRequestPassword />
  ) : (
    <form
      className="flex flex-col space-y-3 mx-auto w-[350px] max-w-[80vw]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-lg font-bold text-amber-400">Forgot password</h1>
      <p className="text-sm font-thin">
        Enter your email to send the password reset link
      </p>
      <input
        {...register("email")}
        type="text"
        placeholder="email"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
      />
      {emailErr ? <p className="text-red-500 text-sm">{emailErr}</p> : null}
      <input
        type="submit"
        value={`${isSubmitting ? "Loading..." : "Password Reset Request"}`}
        disabled={isSubmitting}
        className={`${
          isSubmitting ? "opacity-70" : ""
        } bg-amber-400 text-lg  px-3 py-2 text-white rounded-md cursor-pointer outline-none hover:bg-amber-500 focus:ring-2 focus:ring-amber-200 hover:shadow-md`}
      />
      <Link to="/" className="text-purple-600 text-sm font-thin">
        Back
      </Link>
    </form>
  );
}

export default ForgotPassword;
