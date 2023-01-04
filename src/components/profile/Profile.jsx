import React from 'react'
import "./profile.css"

const Profile = () => {
  return (
    <>
    
    
<div className="dashboard">
<div className="container dashboard__container">
    <button className="sidebar__toggle" id="show__sidebar-btn"><i className="uil uil-angle-right-b"></i></button>
    <button className="sidebar__toggle" id="hide__sidebar-btn"><i className="uil uil-angle-left-b"></i></button>

    <aside>
<ul>
    <li><a href="add-post.html"><i className="uil uil-pen"></i>
    <h5>Add Post</h5>
    </a>
</li>
<li><a href="dashboard.html" className="active"><i className="uil uil-postcard"></i>
    <h5>Manage Posts</h5>
    </a>
</li>
<li><a href="add-user.html"><i className="uil uil-user-plus"></i>
    <h5>Add User</h5>
    </a>
</li>
<li><a href="manage-users.html"><i className="uil uil-users-alt"></i>    
    <h5>Manage Users</h5>
    </a>
</li>
<li><a href="add-category.html"><i className="uil uil-edit"></i>
    <h5>Add Catergory</h5>
    </a>
</li>
<li><a href="manage-categories.html" ><i className="uil uil-list-ul"></i>
    <h5>Manage Categories</h5>
    </a>
</li>
</ul>
    </aside>
    <main>

<h2>Manage Posts</h2>
<table>
    <thead>
        <tr>
            <th>Title</th>
            
            <th>Edit</th>
            <th>Delete</th>
            
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td>Wild Life</td>
            <td><a href="edit-post.html" className="btn sm">Edit</a></td>
            <td><a href="delete-post.html" className="btn danger">Delete</a></td>
        </tr>
        <tr>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td>Wild Life</td>
            <td><a href="edit-post.html" className="btn sm">Edit</a></td>
            <td><a href="delete-post.html" className="btn danger">Delete</a></td>
        </tr>
        <tr>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td>Wild Life</td>
            <td><a href="edit-post.html" className="btn sm">Edit</a></td>
            <td><a href="delete-post.html" className="btn danger">Delete</a></td>
        </tr>
        
    </tbody>
</table>
<h2>Manage Messages</h2>
<table>
    <thead>
        <tr>
            <th>Message</th>
            
            <th>Edit</th>
            <th>Delete</th>
            
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td>Wild Life</td>
            <td><a href="edit-post.html" className="btn sm">Edit</a></td>
            <td><a href="delete-post.html" className="btn danger">Delete</a></td>
        </tr>
        <tr>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td>Wild Life</td>
            <td><a href="edit-post.html" className="btn sm">Edit</a></td>
            <td><a href="delete-post.html" className="btn danger">Delete</a></td>
        </tr>
        <tr>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td>Wild Life</td>
            <td><a href="edit-post.html" className="btn sm">Edit</a></td>
            <td><a href="delete-post.html" className="btn danger">Delete</a></td>
        </tr>
        
    </tbody>
</table>


    </main>
</div>   
</div>
    </>
  )
}

export default Profile