import React from 'react'

import './navbar.css'



const Navbar = ({setToken, setUserData, userData}) => {
  return (
    <nav>
        <div className="container nav__container">
                    <a href="" className="nav__logo">Stranger's Things</a>
                    <ul className="nav__items">
                        <li><a href="/">Home</a></li>
                        <li><a href="/posts">Posts</a></li>
                        {userData ? (
                            <li><a href="/profile">Profile</a></li>
                            ) : (    
                            <li><a href="/register">Register</a></li>
                            )}
                        <li><a href="/" onClick={() => {
                            setToken("");
                            localStorage.removeItem("token");
                            setUserData(null);
                            }}>Logout</a></li>        
                    </ul>

                    
        </div>
    </nav>



  )
}

export default Navbar

