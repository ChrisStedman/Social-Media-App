import React from 'react'
import Posts from '../Posts'
import PostForm from '../PostForm'

const Home = ({addPost, posts, users, likePost}) => {
    return(
    <div>
        <PostForm addPost={addPost} />
        <Posts posts={posts} users={users} likeHandler={likePost} />
    </div>
    )
}


export default Home