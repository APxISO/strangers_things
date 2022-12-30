import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import './posts.css'

const url = "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";




const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
  

    const fetchPosts = async () => {
        try{
       const resp = await fetch (`${url}/posts`);
       const data = await resp.json();
       setPosts(data.data.posts); 
        } catch (err)   {
        console.error(err)
       }
      };
    
      
    
      useEffect(() => {
        fetchPosts();
        
      }, []);


  return (
    <div className='posts_page_cont'>
        <div className='posts_top_cont'>
            <div className='posts_top_center'>
                <h1>Posts</h1>
            </div>
        {/* {user ? (
        <button className='btn'><Link to="/">Create New Post</Link></button>
        ) : (
        <div className='posts_top_right'>
            <button className='btn'>Login to Create Posts</button>
        </div>
        )} */}
        </div>

        <div className='posts_container'>
            {posts.map(posts => {
                return (
                    <div className='posts_card' key={posts.id} >
                    <>
                        <h2>{posts.title}</h2>
                        <p>{posts.description}</p>
                        <p>Price: {posts.price}</p>
                        <p>Location: {posts.location}</p>
                         
                    </>
                    </div>
                )
            })}
        </div>
</div>
  )
}

export default Posts