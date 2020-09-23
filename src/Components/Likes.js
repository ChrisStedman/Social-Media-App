import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const Likes = ({ currentUser, post, likeHandler }) => {
    const [showLikes, setShowLikes] = useState(false)
    const { likes } = post
    const likesShown = 3;

    //If user not logged in, do not display
    if (!currentUser)
        return <> </>

    return (
        //If user logged in, display likes
        //Change button display based on like status
        <>
            <Button eventHandler={() => likeHandler(post)}
                action={`${likes.includes(currentUser.details.username) ? "Liked!" : "Like Post!"}`}
                addStyle={`is-small is-link ${likes.includes(currentUser.details.username) ? "" : "is-outlined"} mx-2`} />

            <Button eventHandler={() => setShowLikes(!showLikes)}
                action={`${likes.length} Likes`} addStyle="is-small is-link is-outlined" />

            {
                //If showLikes has been toggled, display most recent 4 post likes
                showLikes ? <div className="field is-horizontal ">
                    {likes.slice(0, likesShown).map(
                        (u, i) => <Link key={i} to={`/users/${u}`} className="button is-small is-link is-light ml-2">{u}</Link>)
                    }
                    {likes.length > likesShown ? <p className="button is-small is-link is-light ml-2">...</p> : <></>}
                </div> : <> </>}
        </>
    )
}

export default Likes