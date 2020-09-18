import React from 'react'
import Posts from '../Posts'

const Explore = ({posts, users, likeHandler, user}) => {
    
    let topPosts = posts.slice().sort((post1, post2) => 
        post2.likes.length - post1.likes.length)
        
    console.log(topPosts)
    return (
        <div class="field">
            <div class="title">Top Posts</div>
            <Posts posts={topPosts} users={users} likeHandler={likeHandler} limit={10} user={user}/>
            <div class="title">Recent Posts</div>
            <Posts posts={posts} users={users} likeHandler={likeHandler} limit={10} user={user}/>
            
        </div>
    )

}

export default Explore