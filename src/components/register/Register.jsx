import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./register.css"

const url = "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";


const Register= () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("")

    if (password !== confirm) {   
      alert("Passwords do not match");
    }
    try {
      const response = await fetch(
        `${url}/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
            username,
            password
          }
          }),
        });
      const data = await response.json();
       
       if (!data.success) {
        alert("Sorry, this username already exists. Please try again.");
      }else 
      
      console.log("Registration Successful!", data)

      const token =  data.data.token;

      if (token) {
        localStorage.setItem('token', token);
        setToken(token);
        setIsLoggedIn(true); 
        alert(data.data.message);
        navigate("/posts");  
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
            <input type="password" id="password2" required minLength="8" placeholder="Confirm Password..." pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            <button className="sign-in-box" type="submit">
              Register
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