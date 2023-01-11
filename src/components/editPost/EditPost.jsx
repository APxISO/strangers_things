import React, { useEffect } from "react";
import "./editpost.css";
import { useParams, useNavigate } from "react-router";
import { url } from "../../App";

const EditPost = ({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  location,
  setLocation,
  willDeliver,
  setWillDeliver,
  posts,
  token,
  error,
  setError, 
  fetchPosts
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const post = posts.filter(post => id === post._id);

  const updateForm = () => {
    if (title === "") {
      setTitle(post.title);
    }
    if (description === "") {
      setDescription(post.description);
    }
    if (price === "") {
      setPrice(post.price);
    }
    if (location === "") {
      setLocation(post.location);
    }
  };

  useEffect(() => {
    updateForm();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            location,
            willDeliver
          }
        })
      });
      const data = await response.json();
      if (data.error) {
        return setError(data.error.message); 
      }
      fetchPosts();
      navigate("/posts");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later."); 
    }
  };





  return posts.map((post) =>{
    return (
      post._id === id && (
        <div className="create_post_container">
          <h1>Edit Post</h1>
            <form className="edit_post" onSubmit={handleSubmit}>
            <input
    className="edit_posts"
    type="text"
    required
    defaultValue={title}
    placeholder="Title"
    onChange={(e) => {
        setTitle(e.target.value);
    }}
/>

<input
    className="edit_posts"
    type="text"
    required
    defaultValue={description}
    placeholder="Description"
    onChange={(e) => {
        setDescription(e.target.value);
    }}
/>

<input
    className="edit_posts"
    type="text"
    required
    defaultValue={price}
    placeholder="Price"
    onChange={(e) => {
        setPrice(e.target.value);
    }}
/>

<input
    className="edit_posts"
    type="text"
    defaultValue={location}
    placeholder="Location"
    onChange={(e) => {
        setLocation(e.target.value);
    }}
/>

<div className='select_delivery'>
    <h3>Delivery?</h3>
    <select
        name="Delivery?"
        defaultValue={willDeliver ? "true" : "false"}
        onChange={(e) => {
            setWillDeliver(e.target.value);
        }}
    >
        <option value="true">Yes</option>
        <option value="false">No</option>
    </select>
</div>
<button type="submit">Update Post</button>

              </form>
              <p>{error}</p>
        </div>
      )  
    )
  }
  
  )
}

export default EditPost