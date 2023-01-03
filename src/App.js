// import { Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import React from "react";
import Home from "./components/home/Home.jsx";
import Posts from "./components/posts/Posts.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import Profile from "./components/profile/Profile.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <Home /> */}
      {/* <Posts /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      <Profile />
    </>
  );
};

export default App;
