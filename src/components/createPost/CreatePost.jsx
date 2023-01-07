import React, { useState } from "react";
import "./createPost.css"
import { useNavigate } from 'react-router-dom';
import { url } from '../../App'

const CreatePost = ({
    user,
    error,
    token,
    fetchPosts,
    setError,
  }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [location, setLocation] = useState("")
    const [willDeliver, setWillDeliver] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
      const response = await fetch(`${url}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            location,
            willDeliver,
          },
        }),
      });
      const data = await response.json();
      if (data.error) {
        return setError(data.error.message);
      }
      fetchPosts();
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      navigate("/posts");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
};
    
    
        return (
            <div className="create_post_container">
            <h1>Create a New Post</h1>
            <form className="new_post" onSubmit={handleSubmit}>
            <input
                className="new_posts"
                type="text"
                required
                value={title}
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <input
                className="new_posts"
                type="text"
                required
                value={description}
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <input
                className="new_posts"
                type="text"
                required
                value={price}
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <input
                className="new_posts"
                type="text"
                value={location}
                placeholder="Location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <div className='select_delivery'>
              <h3>Delivery?</h3>
              <select
                
                name="Delivery?"
                value={willDeliver}
                onChange={(e) => {
                    setWillDeliver(e.target.value);
                  }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                </div>
                <button type="submit">Submit Post</button>
              </form>
              <p>{error}</p>
              </div>
          );
      
  };
  
  export default CreatePost
  
