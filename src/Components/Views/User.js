import React from 'react'
import { useParams } from 'react-router-dom'
import Posts from '../Posts'
import Button from '../Button'
import Follow from '../Follow'
import { useSelector } from 'react-redux'

const User = ({ likeHandler, followUser, unfollowUser }) => {
    const username = useParams().username
    const userPosts = useSelector(state => state.posts.filter(p => p.user === username))
    const userPage = useSelector(state => state.users.find(u => u.username === username))
    const user = useSelector(state => state.user)



    if (!userPage) {
        return <> </>
    }

    return (
        <div>
            <div className="card column is-half is-offset-one-quarter has-text-centered">
                <div className="card-content">
                    <figure>
                        <img src={userPage.avatar} alt={`${userPage.username} avatar`} />
                        
                    </figure>
                    <h1 className='title is-4'>{userPage.username}</h1>
                    <div className="control">
                        {user ? 
                        <Follow username={username} followUser={followUser} unfollowUser={unfollowUser}/> : <></>
                         }
                   
                    </div>
                    
                </div>
            </div>
            <Posts posts={userPosts} likeHandler={likeHandler} />
        </div>
    )
}

export default User