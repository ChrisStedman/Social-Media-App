import React from 'react'
import {useParams} from 'react-router-dom'
import Posts from './Posts'
import {useSelector} from 'react-redux'

const User = () => {
    const posts = useSelector(state => state.posts) 
    const username = useParams().username
    ///////////////////////////////////////////Crashes if refresh on page
    const user = useSelector(state => state.users.find(u => u.username === username))
    
    
    const userPosts = posts.find(p => p.user = username)


    return(
      
            
            <figure>
                <img src={user.avatar} />
                <figcaption>{user.username}</figcaption>
            </figure>
            
            
            
        
    )

}

export default User