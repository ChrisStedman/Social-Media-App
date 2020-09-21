import React from 'react'
import Posts from '../Posts'
import PostForm from '../Forms/PostForm'
import { useSelector } from 'react-redux'

const Home = ({ addPost, likePost }) => {
    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.user)

    /* <div className="notification container is-danger">
         <p>You must be logged in to post</p>
         </div>}*/

    return (
        <div>
            <div className="has-text-centered">
            <div className="title">Recent Posts</div>
            </div>
            {user ? <PostForm addPost={addPost} user={user} /> :
                <> </>
            }
            <Posts posts={posts} likeHandler={likePost} user={user} />
        </div>
    )
}

export default Home