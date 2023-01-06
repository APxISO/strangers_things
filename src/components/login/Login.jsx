import React, {useState} from 'react'
import {Navigate, Link, useNavigate } from "react-router-dom";
import './login.css'

const url = "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";

const Login = ({setToken}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const lsToken = localStorage.getItem("token");

    const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${url}/users/login`, {
        method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                },
            }),
        });
      const data = await response.json();
      console.log(data)
      
      if (data.error) {
        setError(data.error.message);
        return;
      }
      
      const token =  data.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      
      setUsername("");
      setPassword("");
      
      alert("Welcome back!");
      navigate("/profile");
      
    } catch (error) {
      throw error;
    }
  };

  if (lsToken) {
    return <Navigate to="/profile" />;
  } else {
    return (
        <div className="form_container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input required placeholder="Enter Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
            <input required placeholder="Enter Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <button>Login</button>
        
            <p className="sign-in-box" id="error">
          {error}
        </p>
        <h3>Don't have an account?</h3>
        <Link className="sign-in-box" to="/register">
          Click here to Register!
        </Link>
        </form>
        
            </div>
  )}
}

export default Login
