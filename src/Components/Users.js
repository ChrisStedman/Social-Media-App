import React from 'react'

const Users = ({users}) => {

    return(
    users.map(u => {
        return(<DisplayUser key={u.id} user={u}/>)
    })
    )
}

const DisplayUser =({user}) => {
    return(
        <figure>
            <img src={user.avatar} />
            <figcaption>{user.username}</figcaption>
        </figure>
    )
}

export default Users