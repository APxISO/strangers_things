import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/home/Home.jsx";
import Posts from "./components/posts/Posts.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import Profile from "./components/profile/Profile.jsx";

export const url =
  "https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const lsToken = localStorage.getItem("token");

  async function fetchPosts() {
    if (lsToken) {
      const response = await fetch(`${url}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
      });
      const info = await response.json();
      setPosts(info.data.posts);
    } else {
      const response = await fetch(`${url}/posts`);
      const info = await response.json();
      setPosts(info.data.posts);
    }
  }

  async function fetchUser() {
    if (lsToken) {
      const resp = await fetch(`${url}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
      });
      const info = await resp.json();
      setUser(info.data);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [token]);

  return (
    <>
      <Navbar user={user} setUser={setUser} fetchPosts={fetchPosts} />

      <Routes>
        <Route exact path="/" element={<Home user={user} />}></Route>
        <Route
          path="/profile"
          element={<Profile user={user} fetchUser={fetchUser} />}
        ></Route>

        {/* <Route path="/postdetail/:id">
                    <PostDetail
                        posts={posts}
                        fetchPosts={fetchPosts}
                        fetchUser={fetchUser}
                    />
                </Route> */}

        <Route
          path="/posts"
          element={
            <Posts
              posts={posts}
              fetchUser={fetchUser}
              fetchPosts={fetchPosts}
            />
          }
        ></Route>
        {/* <Route path="/createpost">
                    <CreatePost
                        token={token}
                        fetchPosts={fetchPosts}
                        fetchUser={fetchUser}
                    />
                </Route> */}
        <Route
          path="/register"
          element={<Register setToken={setToken} />}
        ></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
      </Routes>
    </>
  );
};

export default App;
