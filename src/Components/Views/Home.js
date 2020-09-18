import React from 'react'
import Posts from '../Posts'
import PostForm from '../PostForm'

const Home = ({addPost, posts, users, likePost, user}) => {
    return(
    <div>
        {user ? <PostForm addPost={addPost} user={user}/> : 
        <div className="notification container is-danger">
        <p>You must be logged in to post</p>
        </div>}
        
        <Posts posts={posts} users={users} likeHandler={likePost} limit={10} user={user}/>
    </div>
    )
}


export default Home