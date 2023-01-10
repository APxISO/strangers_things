import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import './posts.css'


const Posts = ({posts, user}) => {
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  const token = localStorage.getItem("token")

  const handleCreatePost = () => {
    return (
      <button className="btn" onClick={() => {
        if (!user && !token) {
            // If user is not logged in, alert them and link to '/login'
          alert('You must be logged in to create a new post.');
          navigate("/login")
          } else {
            // If user is logged in, link to '/createpost'
          return (
            navigate("/createpost")
          );
        }
      }}>
        Create a New Post
      </button>
    );
  }
    

  const postMatches = (post) => {
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
        <div className='create_new_post_button'>
          {handleCreatePost()}
        </div>
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
                <Link className="post_links" to={`/posts/${post._id}`}>
                <div className='posts_card' key={posts._id} >
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <p>Price: ${post.price}</p>
                  <p>Seller: {post.author.username}</p>
                  <p>Location: {post.location}</p>
                  <p>Delivery: {post.willDeliver ? 'Yes' : 'No'}</p>  
                </div>
            </Link>
              ))
            })}
        </div>
</div>
  )
}

export default Posts