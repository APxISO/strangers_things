import React from 'react'
import "./createPost.css"
import { useNavigate } from 'react-router-dom';
import { url } from '../../App'

const CreatePost = ({
    user,
    setTitle,
    setDescription,
    setPrice,
    setWillDeliver,
    title,
    description,
    price,
    willDeliver,
    error,
    token,
    location,
    setLocation,
    fetchPosts,
    setError,
  }) => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
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
  };
  
    if(user){
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
          <label>Delivery?</label>
          <select
            id="select_delivery"
            name="Delivery?"
            value={willDeliver}
            onChange={(e) => {
              setWillDeliver(e.target.value);
            }}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button type="submit">Submit Post</button>
        </form>
        <p>{error}</p>
        </div>
  );
} else {
    return null;
}
};

export default CreatePost
