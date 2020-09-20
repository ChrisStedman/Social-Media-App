import React, { useState } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'

import Posts from '../Posts'
import Follow from '../Follow'
import { useSelector } from 'react-redux'
import Button from '../Button'

const User = ({ likeHandler, deleteUser }) => {
    const username = useParams().username
    const user = useSelector(state => state.user)
    const userPosts = useSelector(state => state.posts.filter(p => p.user === username))
    const userPage = useSelector(state => state.users.find(u => u.username === username))
    const [showFollows, setShowFollows] = useState(false)
    if (!userPage || !user) {
        return <Redirect to="/" />
    }

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
                        //If showLikes has been toggled, display most recent 4 post likes
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