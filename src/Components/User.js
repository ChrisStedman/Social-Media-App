import React from 'react'
import {useParams} from 'react-router-dom'
import Posts from './Posts'

const User = ({users, posts}) => {
    const username = useParams().username
    console.log(username)
    const user = users.find(u => u.username === username)
    const userPosts = posts.find(p => p.user = username)

    console.log(user)

    return(
      
            
            <figure>
                <img src={user.avatar} />
                <figcaption>{user.username}</figcaption>
            </figure>
            
            
            
        
    )

}

export default User