import React, { useState } from "react";
import {Link} from "react-router-dom";
import "./register.css"

const url = "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";


const Register= ({action}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [token, setToken] = useState("");  // added state variable for token
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const isLogin = action === "login";
  const title = isLoggedIn ? "Login" : "Register";

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("")

    if (password !== confirm) {
      // Display an error message if the passwords do not match
      alert("Passwords do not match");
    }

    // Make a fetch request to the API to register the new user
    try {
      // Make a fetch request to the API to register the new user
      const response = await fetch(
        `${url}/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
            username: username,
            password: password,
          }
          }),
        });
      const data = await response.json();
      console.log("Registration Successful!", data) // console logs the data to validate if the registration was successful

      const token =  data.data.token;

      if (token) {
        
        // Store the token in local storage and update the token state variable
        localStorage.setItem('token', token);
        setToken(token);

        // Set isLoggedIn to true
        setIsLoggedIn(true);  

        // Display an alert to let the user know the registration was successful
        alert(data.data.message);

         
      }
    setUsername("");
    setPassword("");
    setConfirm("");
    } catch (error) {
      console.error(error);
    }
  };
        
    return (
        
        <div className="form_container">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
        <input type="text" id="username" required minLength="5" placeholder="Enter Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" id="password1" required minLength="8" placeholder="Create Password (Min. 8 Characters)" title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number." pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" value={password} onChange={(e) => setPassword(e.target.value)} />
            {!isLogin ? (
          <input type="password" id="password2" required minLength="8" placeholder="Confirm Password..." pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        ) : null}
        <button className="sign-in-box" type="submit">
          {title}
        </button>
        <p className="sign-in-box" id="error">
          {error}
        </p>
        <h3>Already have an account?</h3>
        <Link className="sign-in-box" to="/login">
          Click here to Login!
        </Link>
        </form>
        <p>{error}</p>
        </div>
        );
}



export default Register;