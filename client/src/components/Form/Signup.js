import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import axios from "../../axiosConfig/axiosConfig";
import { useAuth } from "../../context/auth-context";
import { resetFormErrors } from "../../utilities/utils";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [isSubmitting, setIsSubmmiting] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmmiting(true);

    if (!username || !email || !password || password.length <= 7) {
      if (!username) {
        setUsernameErr("Username is required");
      } else {
        setUsernameErr(null);
      }
      if (!email) {
        setEmailErr("Email is required");
      } else {
        setEmailErr(null);
      }
      if (!password) {
        setPasswordErr("Password is required");
      } else if (password.length <= 7) {
        setPasswordErr("Password should be at least 8 characters long");
      } else {
        setPasswordErr(null);
      }

      setIsSubmmiting(false);
      return;
    }

    try {
      const { data } = await axios.post("/signup", {
        username,
        email,
        password,
      });

      const { formErrors, isSuccessful, token, user } = data;

      if (!isSuccessful) {
        const { usernameErr, emailErr, passwordErr } = formErrors;

        if (usernameErr) {
          setUsernameErr(usernameErr);
        } else {
          setUsernameErr(null);
        }

        if (emailErr) {
          setEmailErr(emailErr);
        } else {
          setEmailErr(null);
        }

        if (passwordErr) {
          setPasswordErr(passwordErr);
        } else {
          setPasswordErr(null);
        }
        setIsSubmmiting(false);
        return;
      }

      alert("Successfully sign up");
      setIsSubmmiting(false);
      setCookie("token", token);
      setAuth({ user, isAuthenticated: true, status: "resolved" });
      navigate("/note", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {usernameErr ? (
        <p className="text-red-500 text-sm">{usernameErr}</p>
      ) : null}
      <input
        type="email"
        placeholder="Email"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailErr ? <p className="text-red-500 text-sm">{emailErr}</p> : null}
      <input
        type="password"
        placeholder="Password"
        className="outline-none text-lg px-3 py-2 bg-white border-b border-b-amber-400 focus:border-l-2 focus:border-l-amber-400 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordErr ? (
        <p className="text-red-500 text-sm">{passwordErr}</p>
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
