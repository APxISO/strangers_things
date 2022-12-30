import React, { useState  } from "react";
import {Link} from "react-router-dom";
import "./register.css"

const url = "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";
// const API_LOGIN = `${url}/users/login`;


const Register= ({setToken, action, error, setError, setAllUsers}) => {
  

    // console.log(email, password, confirm)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  

  const isLogin = action === "login";
  const title = isLogin ? "Login" : "Register";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLogin && password !== confirm) {
      setError("Passwords do not match");
    } else {
      try {
        const response = await fetch(`${url}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const info = await response.json();
        setAllUsers(info.user);
        if (info.error) {
          return setError(info.error);
        }
        setToken(info.token);
        localStorage.setItem("token", info.token);
        setEmail("");
        setPassword("");
        setConfirm("");
        setError("Thank you for registering!");
      } catch (error) {
        throw error;
      }
    }
  };
        
    return (
        
        <div className="form_container">
        <h1>Register:</h1>
        <form onSubmit={handleRegister}>
        <input type="text" id="username" required minlength="5" placeholder="Enter Username..." value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" id="password1" required minlength="8" placeholder="Create Password (Min. 8 Characters)" title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number." pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" value={password} onChange={(e) => setPassword(e.target.value)} />
            {!isLogin ? (
          <input type="password" id="password2" required minlength="8" placeholder="Confirm Password..." pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        ) : null}
        <button className="sign-in-box" type="submit">
          {title}
        </button>
        <p className="sign-in-box" id="error">
          {error}
        </p>
        <Link className="sign-in-box" to="/login">
          Click here to Login!
        </Link>
        </form>
        <p>{error}</p>
        </div>
        );
}



export default Register;