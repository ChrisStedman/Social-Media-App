import React from 'react'
import Button from './Button'
import {useSelector} from 'react-redux'



const Posts = ({posts, users, likeHandler, limit = -1}) => {
    const user = useSelector(state => state.user)

    limit = (limit === - 1) ? posts.length : limit
    
    //Copy post data to variable the sort posts by date
    //So newest displayed first
    let postCopy = posts.slice(0, limit)

    //For every element in sorted array of posts
    return (postCopy.map(post => {

        //Find user linked to post
        let userAvatar = users.filter(u => u.username === post.user)[0].avatar

        //Display Post - Send post data and user Avatar
        return (
            <DisplayPosts   key={post.id} post={post} 
                            userAvatar={userAvatar} likeHandler={likeHandler}
                            currentUser={user} 
                           />
        )
    }))
}



const DisplayPosts = ({ post, userAvatar, likeHandler, currentUser }) => {
    const { id, user, timestamp, content, likes } = post
    const date = new Date(timestamp).toDateString()
    const time = new Date(timestamp).toLocaleTimeString()

    return (
        <div className="box">
            <article className="media">
                <div className="media-left has-text-centered">
                    <figure className="image is-96x96">
                        <img src={userAvatar} />
                       
                    </figure>
                    <strong>{user}</strong>
                    <div>
                   
                            </div>
                </div>

                <div className="media-content">
                    <div className="content">
                            <small>{date} - {time}</small>
                        <p>{content}</p>
                        <p>This post has {likes.length} likes!</p>
                    </div>
                </div>
                {currentUser ? <Button eventHandler={() => likeHandler(post)} action="Like Post!" /> : <> </>}  
            </article>
        </div>
    )
}

export default Posts

