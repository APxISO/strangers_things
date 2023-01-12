import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/home/Home.jsx";
import Posts from "./components/posts/Posts.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import Profile from "./components/profile/Profile.jsx";
import CreatePost from "./components/createPost/CreatePost.jsx";
import PostDetails from "./components/postDetails/PostDetails.jsx";
import EditPost from "./components/editPost/EditPost.jsx";
import Message from "./components/messages/Messages.jsx";

export const url =
  "https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(true);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

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
      const data = await response.json();
      setPosts(data.data.posts);
    } else {
      const response = await fetch(`${url}/posts`);
      const data = await response.json();
      setPosts(data.data.posts);
    }
  }

  const fetchUser = async () => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
      setToken(lsToken);
    }
    try {
      const response = await fetch(`${url}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
      });
      const data = await response.json();
      setUser(data.data);
      setUsername(data.data.username);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [token]);

  return (
    <>
      <Navbar
        token={token}
        user={user}
        setUser={setUser}
        fetchPosts={fetchPosts}
      />

      <Routes>
        <Route exact path="/" element={<Home user={user} />}></Route>

        <Route
          path="/profile"
          element={
            <Profile
              posts={posts}
              setPosts={setPosts}
              user={user}
              fetchUser={fetchUser}
              fetchPosts={fetchPosts}
              error={error}
            />
          }
        ></Route>

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

        <Route
          path="/createpost"
          element={
            <CreatePost
              user={user}
              token={token}
              setTitle={setTitle}
              setDescription={setDescription}
              setPrice={setPrice}
              setWillDeliver={setWillDeliver}
              setPosts={setPosts}
              setError={setError}
              title={title}
              description={description}
              price={price}
              willDeliver={willDeliver}
              error={error}
              location={location}
              setLocation={setLocation}
              fetchPosts={fetchPosts}
              fetchUser={fetchUser}
            />
          }
        ></Route>

        <Route
          path="/posts/:id"
          element={
            <PostDetails
              posts={posts}
              fetchPosts={fetchPosts}
              fetchUser={fetchUser}
            />
          }
        ></Route>

        <Route
          path="/editpost/:id"
          element={
            <EditPost
              user={user}
              setTitle={setTitle}
              setDescription={setDescription}
              setPrice={setPrice}
              setWillDeliver={setWillDeliver}
              setError={setError}
              title={title}
              description={description}
              price={price}
              willDeliver={willDeliver}
              error={error}
              token={token}
              posts={posts}
              location={location}
              setLocation={setLocation}
              fetchPosts={fetchPosts}
            />
          }
        ></Route>

        <Route
          path="/register"
          element={<Register setToken={setToken} />}
        ></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route
          path="/message/:id"
          element={
            <Message
              content={content}
              setContent={setContent}
              fetchUser={fetchUser}
              message={message}
              setMessage={setMessage}
            />
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
