// import { Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import React from "react";
import Home from "./components/home/Home.jsx";
import Posts from "./components/posts/Posts.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <Home /> */}
      <Posts />
    </>
  );
};

export default App;
