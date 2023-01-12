import React, { useEffect, useState } from "react";
import "./profile.css"
import { Link } from "react-router-dom";

const url =
  "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt";

const Profile = ({ user, setPosts, posts}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token")
    setLoading(true);

    try {
      const response = await fetch(`${url}posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
        const filteredArray = posts.filter((item) => item._id !== `${postId}`);
        setPosts(filteredArray);
        setMessage("Post deleted successfully");
        setLoading(false);
        } catch (error) {
            setMessage("Error deleting post: " + error.message);
            setLoading(false);
        }
    };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  
  if (!isLoggedIn || !user) 
  return( 
    <div className="starting_dashboard">
        <div className='starting_dashboard_container'>
            <h2>You Have No Posts Yet</h2>
            
            
        </div>
        
    </div>
    
    ) 
   
 

  const myPostsArr = posts.filter((post) => post.isAuthor === true);
  const messagesFromArr = user.messages
  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <main>
          {loading && <p>Loading...</p>}
          {message && <p>{message}</p>}
          <table>
            <thead>
              <tr>
                <h2>My Posts</h2>
              </tr>
              <th>Item</th>
              <th>Messages</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {myPostsArr.map((post) => {
                return post.active ? (
                  <tr key={post._id}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>
                      <Link to={`/editpost/${post._id}`}>
                        <button className='btn'>Edit</button>
                      </Link>
                      <button className='btn' onClick={() => 
                        handleDelete(post._id)}>Delete</button>
                    </td>
                    </tr>
                    ) : (
                    <tr>
                    <td>No posts</td>
                    </tr>
                    );
                    })}
                    </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <h2>My Messages</h2>
                            </tr>
                            <th>Item</th>
                            <th>Messages</th>
                            <th>Sent By</th>
                        </thead>
                    <tbody>
                    {messagesFromArr.map((message) => {
                    return (
                        <tr key={message._id}>
                        <td>{message.post && message.post.title}</td>
                        <td>{message.content}</td>
                        <td>
                            {message.fromUser.username === user.username
                            ? "Me"
                            : message.fromUser.username}
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
                </main>
                </div>
                </div>
);
};
                    
                    export default Profile;
                    
                    
