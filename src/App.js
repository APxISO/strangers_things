// import { Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import React from "react";
import Home from "./components/home/Home.jsx";
import Posts from "./components/posts/Posts.jsx";
import Register from "./components/register/Register.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <Home /> */}
      {/* <Posts /> */}
      <Register />
    </>
  );
};

export default App;
