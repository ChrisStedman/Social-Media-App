import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import Posts from '../Posts'
import Follow from '../Follow'
import { useSelector } from 'react-redux'
import Button from '../Button'

const User = ({ likeHandler, deleteUser }) => {
    const username = useParams().username
    const user = useSelector(state => state.user)
    const userPosts = useSelector(state => state.posts.filter(p => p.user === username))
    let userPage = useSelector(state => state.users.filter(u => u.username === username))
    const [showFollows, setShowFollows] = useState(false)

    //If user not logged in notification shown
    if (!user) {
        return (
            <div className="page-min-height">
                <div className="notification is-danger is-fullwidth ">Must be logged in to view user profiles</div>
            </div>
        )
    }

    //If invalid username given notification shown
    if (!userPage || userPage === 0) {
        return (
            <div className="page-min-height">
                <div className="notification is-danger is-fullwidth ">No user found</div>
            </div>
        )
    }

    userPage = userPage[0]
    return (
        <div>
            <div className="card column is-half is-offset-one-quarter has-text-centered">
                <div className="card-content">
                    <figure>
                        <img src={userPage.avatar} alt={`${userPage.username} avatar`} />
                    </figure>
                    <h4 className='title is-4 '>{userPage.username}</h4>
                    <div className="mb-5">
                        <Button eventHandler={() => setShowFollows(!showFollows)}
                            action={`Following ${userPage.follows.length}`} addStyle={`${showFollows ? "" : "is-outlined"} is-link`}>
                        </Button>
                    </div>

                    {
                        //If showLikes has been toggled, display most recent 8 post likes
                        showFollows ? <div className="columns is-multiline is-mobile is-gapless is-centered">
                            {userPage.follows.slice(0, 8).map(
                                (u, i) =>
                                    <div key={i} className="column is-narrow has-text-centered">
                                        <Link to={`/users/${u}`} className="button is-link is-light ml-2 mb-2">{u}</Link>
                                    </div>)
                            }
                            {userPage.follows.length > 8 ? <p className="button is-link is-light ml-2 mb-2">And more...</p> : <></>}
                        </div> : <> </>}
                    <div className="control">
                        <Follow username={username} addStyle="is-fullwidth" />
                    </div>
                    {user.details.username === username ?
                        <Button eventHandler={deleteUser}
                            action="Delete Account" addStyle={'is-danger'}>
                        </Button>
                        :
                        <> </>
                    }
                </div>
            </div>
            <Posts posts={userPosts} likeHandler={likeHandler} />
        </div>
    )
}

export default User