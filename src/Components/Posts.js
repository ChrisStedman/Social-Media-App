import React, { useState } from 'react'
import Button from './Button'
import ProcessText from './ProcessText'
import { useSelector, useDispatch } from 'react-redux'
import postServices from '../services/postServices'
import { deletePostID } from '../Reducers/postReducer'
import UserDetails from './UserDetails'
import Likes from './Likes'

const Posts = ({ posts, likeHandler }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const [limit, setLimit] = useState(10);

    //Store copy of posts up to defined limit
    let postCopy = posts.slice(0, limit)

    //Initiate DELETE request and updated store
    const deletePost = (postID) => {
        postServices.deletePost(postID, user)
            .then(post => {
                dispatch(deletePostID(postID))
            }).catch(error => {

            })
    }
  
    
    return (
        <div>
            {postCopy.map(post => {
             
                //Store user avatar 
                let userAvatar = users.filter(u => u.username === post.user)
              
                if(userAvatar.length === 0){
                    console.log("No avatar", userAvatar)
                    userAvatar = "robot_logo.png"
                } else {
                    console.log("Avatar Found", userAvatar)
                    userAvatar = userAvatar[0].avatar
                }
                
                //Display Post - Send post data and user Avatar
                return (
                    <DisplayPosts key={post.id} post={post}
                        userAvatar={userAvatar} likeHandler={likeHandler}
                        currentUser={user} deletePostHandler={deletePost}
                    />
                )
            })}
            {
                //If limit less than number of total posts, display a see-more button
                limit < posts.length ? <div className="column is-8 is-offset-2"> <Button eventHandler={() =>
                    setLimit(limit + 10)} action="See more... " addStyle="is-link is-fullwidth mr-6" /> </div>: <></>}
        </div>
    )
}

//Takes required information to display post and renders
const DisplayPosts = ({ post, userAvatar, likeHandler, currentUser, deletePostHandler }) => {
  
    const { id, user, timestamp, content } = post
    const date = new Date(timestamp).toDateString()
    const time = new Date(timestamp).toLocaleTimeString()

    return (
        <div className="box mx-5 is-mobile">
            <article className="media">
                <UserDetails user={user} userAvatar={userAvatar} />
                <div className="media-content ml-3">
                    <div className="content">
                        <small>{date} - {time}</small>
                        <ProcessText content={content} />
                    </div>
                    <nav className="level is-fixed-bottom pt-4" >
                        <div className="level-left">
                            <div className="level-item">
                                <Likes post={post} currentUser={currentUser} likeHandler={likeHandler}/>
                            </div>
                        </div>

                        {currentUser && user === currentUser.details.username ?
                            <div className="level-right">
                                <div className="level-item">
                                    <Button eventHandler={() => deletePostHandler(id)}
                                        action={`DELETE POST`} addStyle="is-small is-danger" />
                                </div>
                            </div> : <> </>
                        }
                    </nav>
                </div>
            </article>
        </div >
    )
}

export default Posts

