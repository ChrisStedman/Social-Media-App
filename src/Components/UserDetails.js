import React from 'react'
import { Link } from 'react-router-dom'
import Follow from './Follow'

const UserDetails = ({ user, userAvatar }) => {

    //Condition to check if user has default logo (has been deleted)
    if (userAvatar !== 'robot_logo.png') {
        return (
            <div className="media-left has-text-centered">
                <Link to={`/users/${user}`} >
                    <figure className="image is-96x96">
                        <img src={userAvatar} alt={`${user.username} avatar`} />
                    </figure>
                    <strong>{user}</strong>
                </Link>

                <Follow username={user} addStyle="is-small is-fullwidth" />
            </div>
        )
    }

    //If deleted - do not link to account and remove follows
    else {
        return (
            <div className="media-left has-text-centered ">
                <figure className="image is-48x48 ml-5">
                    <img src={userAvatar} alt={`${user.username} avatar`} />
                </figure>
                <strong>{user}</strong>

                <div className="button is-small is-fullwidth is-danger">
                    User Deleted
                </div>
            </div>
        )
    }

}

export default UserDetails

