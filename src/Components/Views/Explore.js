import React from 'react'
import Posts from '../Posts'
import {useSelector} from 'react-redux'

const Explore = ({ likeHandler }) => {
    const posts = useSelector(state => state.posts)
     
    let topPosts = posts.slice().sort((post1, post2) => 
        post2.likes.length - post1.likes.length)
        
    
    return (
        <div class="field">
            <div class="title">Top Posts</div>
            <Posts posts={topPosts} likeHandler={likeHandler} limit={10} />
            <div class="title">Recent Posts</div>
            <Posts posts={posts} likeHandler={likeHandler} limit={10} />
            
        </div>
    )

}

export default Explore