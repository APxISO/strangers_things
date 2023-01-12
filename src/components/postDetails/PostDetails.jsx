import React from "react";
import "./postDetails.css"
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { url } from "../../App";

const PostDetails = ({ posts, fetchUser, fetchPosts }) => {
   
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
                            <div className="back_to_posts">
                            <Link to="/posts">
                                <button className="btn">Back to Posts</button>
                            </Link>
                            </div>
                            { token && 
                                <div className="details_user_buttons">
                                <Link to={`/message/${post._id}`}>
                                    <button className='btn'>Message Seller</button>
                                </Link>
                                <Link to="/posts">
                                    <button className='btn'>Back to Posts</button>
                                </Link>
                                { post.isAuthor && 
                                <>
                                    <button className='btn' onClick={() => handleDeletePost(post._id)}>Delete</button>
                                    <Link to={`/editpost/${post._id}`}>
                                        <button className='btn'>Edit</button>
                                    </Link>
                                </>}
                                </div>
                            }
                            
                        </>
                    )
                }    
            })}
        </div>
    );
};
export default PostDetails;
