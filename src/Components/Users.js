import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Follow from './Follow'

//Pass each user to DisplayUser for display
const Users = () => {
    const users = useSelector(state => state.users)
    const user = useSelector(state => state.user)

    //If user not logged in - display notification
    if (!user) {
        return (
            <div className="page-min-height">
                <div className="notification is-danger is-fullwidth ">Must be logged in to view users</div>
            </div>
        )
    }

    return (
        <div className="page-min-height">
            <div className="field mt-5 has-text-centered ">
                <div className="title">All Users</div>
            </div>
            <div className="columns is-multiline is-centered mt-2">
                {users.map(u => {
                    return (<DisplayUser key={u.id} user={u} />)
                })}
            </div>
        </div>
    )
}

//Take user as parameter and display
export const DisplayUser = ({ user }) => {
    const { username, avatar, follows } = user
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