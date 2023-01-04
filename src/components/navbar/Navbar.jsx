import React from 'react'
import { Link} from "react-router-dom";

import './navbar.css'



const Navbar = ({setToken, setUserData, userData}) => {
  return (
    <nav>
        <div className="container nav__container">
                    <Link to="/" className="nav__logo">Stranger's Things</Link>
                    <ul className="nav__items">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/posts">Posts</Link></li>
                        {userData ? (
                            <li><Link to="/profile">Profile</Link></li>
                            ) : (    
                            <li><Link to="/register">Register</Link></li>
                            )}
                        <li><Link to="/" onClick={() => {
                            setToken("");
                            localStorage.removeItem("token");
                            setUserData(null);
                            }}>Logout</Link></li>        
                    </ul>

                    
        </div>
    </nav>



  )
}

export default Navbar

