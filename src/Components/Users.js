import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Follow from './Follow'

//Pass each user to DisplayUser for display
const Users = () => {
    const users = useSelector(state => state.users)

    return (
        <div className="columns is-multiline is-centered">
            {users.map(u => {
                return (<DisplayUser key={u.id} user={u} />)
            })}
        </div>
    )
}

//Take user as parameter and display
const DisplayUser = ({ user }) => {
    const {username, avatar, follows} = user
    return (
       
            <div className="column is-narrow has-text-centered box mr-5 user-image">
            
            <Link to={`/users/${username}`}>
                <figure >
                    <img src={avatar} alt={`${username} avatar`} />
                </figure>
                <strong>{username}</strong>
            </Link>
            <p><strong>Following {follows.length}</strong></p>
            <Follow username={username} addStyle="is-small is-fullwidth" />
            </div>
        
    )
}

export default Users