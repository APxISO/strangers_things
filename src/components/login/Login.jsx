import React, {useState} from 'react'
import { Link } from "react-router-dom";
import './login.css'


const url = "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";

const Login = ({setToken, error, setError,setUserData, setUserId, checkUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const title = "Login";

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
          username,
          password,
        }),
      });
      const info = await response.json();
      setUserData(info.user);
      setUserId(info.user.id);

      if (info.error) {
        return setError(info.error);
      }
      setToken(info.token);
      localStorage.setItem("token", info.token);
      localStorage.setItem("userId", info.user.id);
      setUsername("");
      setPassword("");
      checkUser();
      setError("You are now logged in!");
    } catch (error) {
      throw error;
    }
  };




    return (
        <div className="form_container">
        <h1>Login:</h1>
        <form onSubmit={handleLogin}>
            <input required placeholder="Enter Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
            <input required placeholder="Enter Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <button>{title}</button>
        
            <p className="sign-in-box" id="error">
          {error}
        </p>
        <Link className="sign-in-box" to="/register">
          Click here to Register!
        </Link>
        </form>
        
            </div>
  )
}

export default Login
