import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Users = () => {
    const users = useSelector(state => state.users)
    
    return(
        <div >
   { users.map(u => {
        return(<DisplayUser key={u.id} user={u} />)
    })}
    </div>
    )
}

const DisplayUser =({user}) => {
    return(
        <Link to={`/users/${user.username}`}>
        <figure >
            <img src={user.avatar} />
            <figcaption>{user.username}</figcaption>
        </figure> 
        </Link>
        
    )
}

export default Users