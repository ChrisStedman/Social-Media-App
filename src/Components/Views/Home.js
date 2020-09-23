import React from 'react'
import { useSelector } from 'react-redux'
import Posts from '../Posts'
import PostForm from '../Forms/PostForm'

const Home = ({ addPost, likePost }) => {
    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.user)

    return (
        <div>
            {user ? <PostForm addPost={addPost} user={user} /> :
                <> </>
            }
            <div className="field">
                <Posts posts={posts} likeHandler={likePost} user={user} />
            </div>
        </div>
    )
}

export default Home