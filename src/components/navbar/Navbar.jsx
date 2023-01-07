import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import './navbar.css'


const Navbar = ({setUser, user}) => {
  
  let navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    alert("See ya later!")
    navigate("/");
  }

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo">Stranger's Things</Link>
        <ul className="nav__items">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          {user && localStorage.getItem("token") ? (
              <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
              </>
              ) : (    
              <li><Link to="/register">Register</Link></li>
              )}      
        </ul>           
      </div>
    </nav>
    )
}

export default Navbar
