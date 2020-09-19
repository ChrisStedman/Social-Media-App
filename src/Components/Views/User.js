import React from 'react'
import { useParams } from 'react-router-dom'
import Posts from '../Posts'
import Follow from '../Follow'
import { useSelector } from 'react-redux'

const User = ({ likeHandler}) => {
    const username = useParams().username
    const userPosts = useSelector(state => state.posts.filter(p => p.user === username))
    const userPage = useSelector(state => state.users.find(u => u.username === username))

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
                        <Follow username={username} addStyle="is-fullwidth"/>
                    </div>  
                </div>
            </div>

            <Posts posts={userPosts} likeHandler={likeHandler} />
        </div>
    )
}

export default User