import React from 'react'
import Posts from '../Posts'
import {useSelector} from 'react-redux'

const Explore = ({ likeHandler }) => {
    const posts = useSelector(state => state.posts)
    const users = useSelector(state => state.users)
    
    
    let topPosts = posts.slice().sort((post1, post2) => 
        post2.likes.length - post1.likes.length)
        
    console.log(topPosts)
    return (
        <div class="field">
            <div class="title">Top Posts</div>
            <Posts posts={topPosts} users={users} likeHandler={likeHandler} limit={10} />
            <div class="title">Recent Posts</div>
            <Posts posts={posts} users={users} likeHandler={likeHandler} limit={10} />
            
        </div>
    )

}

export default Explore