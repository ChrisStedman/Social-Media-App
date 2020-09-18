import React from 'react'
import {Link} from 'react-router-dom'

const Users = ({users}) => {

    return(
    users.map(u => {
        return(<DisplayUser key={u.id} user={u}/>)
    })
    )
}

const DisplayUser =({user}) => {
    return(
        <Link to={`/users/${user.username}`}>
        <figure>
            <img src={user.avatar} />
            <figcaption>{user.username}</figcaption>
        </figure> 
        </Link>
        
    )
}

export default Users