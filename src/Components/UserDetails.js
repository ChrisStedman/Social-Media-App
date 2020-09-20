import React from 'react'
import {Link} from 'react-router-dom'
import Follow from './Follow'

const UserDetails = ({user, userAvatar})=> {
    console.log("user details: ",user)
    return(
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

export default UserDetails

