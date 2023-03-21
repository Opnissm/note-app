import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "react-router-dom";
import api from "../../axios_config/api";

const schema = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters long"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Password is required")
      .min(8, "Password should be at least 8 characters long"),
  })
  .required();
function PasswordReset() {
  const [isValidQuery, setIsValidQuery] = useState({
    status: "idle",
    isValid: true,
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function onSubmit(data) {
    try {
      const { password } = data;

      const { data: responseData } = await api.post("/resetPassword", {
        token,
        userId: id,
        password,
      });

      const { isSuccessful, errorMsg } = responseData;

      if (!isSuccessful) {
        alert(errorMsg);
        return;
      }

      alert("Your Password Reset Successfully");
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  console.log(errors);
  useEffect(() => {
    async function validateTokenAndUserId() {
      try {
        const { data } = await api.post("/validateRequestPasswordToken", {
          token,
          userId: id,
        });

        const { isValid } = data;

        console.log(isValid);
        if (!isValid) {
          setIsValidQuery({ status: "resolved", isValid: false });
          return;
        }

        setIsValidQuery({ status: "resolved", isValid: true });
      } catch (err) {
        console.log(err);
      }
    }
    validateTokenAndUserId();
  }, []);
  return (
    <>
      {isValidQuery.status === "resolved" ? (
        isValidQuery.isValid ? (
          <form
            className="flex flex-col space-y-3 mx-auto w-[350px] max-w-[80vw]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-lg font-bold text-amber-400">Reset password</h1>
            <input
              {...register("password")}
              type="password"
              className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
              placeholder="Password"
            />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm password"
              className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
            />
            <input
              type="submit"
              value={`${isSubmitting ? "Loading..." : "Set New Password"}`}
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "opacity-70" : ""
              } bg-amber-400 text-lg  px-3 py-2 text-white rounded-md cursor-pointer outline-none hover:bg-amber-500 focus:ring-2 focus:ring-amber-200 hover:shadow-md`}
            />
          </form>
        ) : (
          <div>
            <h1 className="text-xl font-bold text-amber-400">
              Sorry this page is not available
            </h1>
          </div>
        )
      ) : null}
    </>
  );
}

export default PasswordReset;
