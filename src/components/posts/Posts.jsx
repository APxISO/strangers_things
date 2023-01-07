import React, {useState} from 'react'
import {Link} from "react-router-dom";
import './posts.css'

const url = "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";




const Posts = ({posts, setPosts, user, token}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = async (POST_ID) => {
        const filteredPosts = posts.filter((item) => item._id !== `${POST_ID}`);
        setPosts(filteredPosts);
        try {
          const response = await fetch(`${url}posts/${POST_ID}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
        } catch (error) {
          console.error(error);
        }
      };

      const postMatches = (post, text) => {
        if (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.includes(searchTerm) ||
          post.price.includes(searchTerm) ||
          post.location.includes(searchTerm) ||
          post.author.username.includes(searchTerm)
        ) {
          return true;
        }
      };
      const filteredPosts = posts.filter((item) => postMatches(item, searchTerm));
      const postsToDisplay = searchTerm.length ? filteredPosts : posts;


  return (
    <div className='posts_page_cont'>
        <div className='posts_top_cont'>
            <div className='posts_top_center'>
                <h1>Posts</h1>
            </div>
            {user && localStorage.getItem("token") (
        <button className='btn'><Link to="/createpost">
          Create a New Post
        </Link></button>
      )}
      
       
<form className="searchbox" >
        <input 
        value={searchTerm}
            placeholder="Search Posts"
            onChange={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.value);
              postMatches();
            }} />
        <button className='search_button' type="submit" value="search"></button>
    </form>


    
        </div>

        <div className='posts_container'>
        {postsToDisplay.map((post) => {
            
                return (
                    post.active && (
                        <Link className="post_links" to={`/posts/post/${post._id}`}>
                            <div className='posts_card' key={posts._id} >
                    
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <p>Price: {post.price}</p>
                        <p>Seller: {post.author.username}</p>
                        <p>Location: {post.location}</p>  
                        {user ? (
                  post.isAuthor ? (
                    <>
                      <button
                        value={post._id}
                        onClick={(e) => {
                          const id = e.target.value;
                          handleDelete(id);
                        }}
                      >
                        Delete
                      </button>
                      <Link className="button" to={`/posts/${post._id}`}>
                        <button>Edit Post</button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link id="send-message" to={`/message/${post._id}`}>
                        <button>Send Message</button>
                      </Link>
                    </>
                  )
                ) : null}
                    
                    
                    <hr></hr>
                    </div></Link>
                    ))
            })}
        </div>
</div>
  )
}

export default Posts