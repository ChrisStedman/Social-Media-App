import React from 'react'
import Button from './Button'

const Posts = ({posts, users, likeHandler}) => {

    //Copy post data to variable the sort posts by date
    //So newest displayed first
    let postCopy = posts.slice().sort((post1, post2) => 
       new Date(post2.timestamp) -new Date(post1.timestamp)
    )

    //For every element in sorted array of posts
    return(postCopy.map(post => {
    
    //Find user linked to post
        let user = users.filter(u => u.username === post.user)
    
    //Display Post - Send post data and user Avatar
        return(
            <DisplayPosts key={post.id} post={post} userAvatar={user[0].avatar} likeHandler={likeHandler}/> 
        )
    }))
}



const DisplayPosts = ({post, userAvatar, likeHandler}) => {
    const {id, user, timestamp, content, likes} = post
   
    return(
        <div className="postList" id={id}>
            <div className="postData">
                <img src={userAvatar} />
                <p className="userName">{user}</p>
                <p className="timestamp">{new Date(timestamp).toUTCString()}</p>
            </div>
            <p className="postContent">{content}</p>
            <Button eventHandler={() => likeHandler(post)} action="Like Post!" />
        </div>
    )
}

export default Posts

