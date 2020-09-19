import React from 'react'
import Posts from '../Posts'
import { useSelector } from 'react-redux'

const Explore = ({ likeHandler }) => {
    const posts = useSelector(state => state.posts)

    let topPosts = posts.slice().sort((post1, post2) =>
        post2.likes.length - post1.likes.length)


    return (
        <div className="columns">
            <div className="column">
                <div className="field has-text-centered">
            <div className="title">Top Posts</div>
            </div>
            <Posts posts={topPosts} likeHandler={likeHandler} limit={10} />
        </div>
        <div className="column">
        <div className="field has-text-centered ">
            <div className="title">Recent Posts</div>
            </div>
            <Posts posts={posts} likeHandler={likeHandler} limit={10} />
        </div>
            
        </div >
    )

}

export default Explore