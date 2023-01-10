import React, { useState } from "react";
import "./postDetails.css"
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { url } from "../../App";

const PostDetails = ({ posts, fetchUser, fetchPosts }) => {
    const [message, setMessage] = useState("");

    const { id } = useParams();
const token = localStorage.getItem("token");
const navigate = useNavigate();

async function handleDeletePost(postId) {
    const resp = await fetch(`${url}/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await resp.json();

    fetchPosts();
    fetchUser();

    navigate("/posts");
}

async function handleSendMessage() {
    const resp = await fetch(`${url}/posts/${id}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            message: {
                content: message,
            },
        }),
    });
    const data = await resp.json();

    fetchPosts();
    setMessage("");
}

return (
    <div>
        {posts.map((post) => {
            if (post._id === id){
                return (
                    <>
                        <div className="post_details_container" key={post._id}>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            <p>Price: {post.price}</p>
                            <p>Seller: {post.author.username}</p>
                            <p>Location: {post.location}</p>

                            
                        </div>

                        <div>
                        {token && post.isAuthor && (
                                <>
                                <div className="details_user_buttons">
                                    <button className='btn' onClick={() => handleDeletePost(post._id)}>Delete</button>
                                    <button className='btn'>Edit</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )
            }    
        })}
    </div>
);
};
export default PostDetails;