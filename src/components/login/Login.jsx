import React, {useState} from 'react'
import { Link } from "react-router-dom";
import './login.css'


const url = "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";

const Login = ({setToken,setUserData, setUserId, checkUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const lsToken = localStorage.getItem("token");
  const title = "Login";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${url}/users/login`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      console.log(data)
      setUserData(data.data.user);
      setUserId(data.data.user.username);

      if (data.error) {
        return setError(data.error.message);
      }

      const token =  data.data.token;

      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", data.user.id);
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
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input required placeholder="Enter Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
            <input required placeholder="Enter Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <button>{title}</button>
        
            <p className="sign-in-box" id="error">
          {error}
        </p>
        <h3>Don't have an account?</h3>
        <Link className="sign-in-box" to="/register">
          Click here to Register!
        </Link>
        </form>
        
            </div>
  )
}

export default Login
