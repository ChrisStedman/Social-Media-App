import React, { useState } from 'react'
import Button from './Button'
import ProcessText from './ProcessText'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Follow from './Follow'

const Posts = ({ posts, likeHandler}) => {
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const [limit, setLimit] = useState(10);

    //Copy post data to variable the sort posts by date
    //So newest displayed first
    let postCopy = posts.slice(0, limit)

    //For every element in sorted array of posts
    return (
        <div>
        {postCopy.map(post => {

        //Find user linked to post
        
         let userAvatar =  users ? users.filter(u => u.username === post.user)[0].avatar : null
        

        //Display Post - Send post data and user Avatar
        return (
            <DisplayPosts key={post.id} post={post}
                userAvatar={userAvatar} likeHandler={likeHandler}
                currentUser={user}
            />
           
        )
    })}

    {limit < posts.length ? <Button eventHandler={() => setLimit(limit+10) } action="See more... " addStyle="is-link is-fullwidth" /> : <></>}

    </div>
    
    
    )
}



const DisplayPosts = ({ post, userAvatar, likeHandler, currentUser }) => {
    const [showLikes, setShowLikes] = useState(false)
    const { user, timestamp, content, likes } = post
    const date = new Date(timestamp).toDateString()
    const time = new Date(timestamp).toLocaleTimeString()

    return (
        <div className="box mx-6">
            <article className="media">
                <div className="media-left has-text-centered">
                    <figure className="image is-96x96">
                        <img src={userAvatar} alt={`${user.username} avatar`} />
                    </figure>
                    <strong>{user}</strong>
                    <Follow username={user} addStyle="is-small is-fullwidth"/>
                </div>

                <div className="media-content">
                    <div className="content">
                        <small>{date} - {time}</small>
                        <ProcessText content={content} />
                    </div>
                    <nav className="level is-mobile">
                        <div className="level-left">
                            <div className="level-item">

                                {currentUser ?
                                    <> 
                                        <Button eventHandler={() => likeHandler(post)}
                                            action={`${likes.includes(currentUser.details.username) ? "Liked!" : "Like Post!"}`} 
                                            addStyle={`is-small is-link ${likes.includes(currentUser.details.username) ? "": "is-outlined"} mx-2`} />

                                        <Button eventHandler={() => setShowLikes(!showLikes)}
                                            action={`${likes.length} Likes`} addStyle="is-small is-link is-outlined" />

                                        {showLikes ? <div className="field is-horizontal ">
                                            {likes.slice(0, 4).map(
                                                (u,i) => <Link key={i} to={`/users/${u}`} className="button is-small is-link is-light ml-2">{u}</Link>)
                        
                                                }
                                        {likes.length > 4 ? <p className="button is-small is-link is-light ml-2">And more...</p> : <></>}
                                        </div> : <> </>}

                                    </> : <> </>}
                            </div>
                        </div>

                    </nav>
                </div>


            </article>
        </div>
    )
}

export default Posts

