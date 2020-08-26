import React from 'react'

const Posts = ({posts, users}) => {

    //Copy post data to variable the sort posts by date
    //So newest displayed first
    let postCopy = posts.slice().sort((post1, post2) => 
       new Date(post2.timestamp) -new Date(post1.timestamp)
    )

    //For every element in sorted array of posts
    return(postCopy.map(post => {
    
    //Find user linked to post
        let user = users.filter(u => u.id === post.user)
    
    //Display Post - Send post data and user Avatar
        return(
            <DisplayPosts key={post.id} post={post} userAvatar={user[0].avatar}/> 
        )
    }))
}



const DisplayPosts = ({post, userAvatar}) => {
    const {id, user, timestamp, content, likes} = post
   
    return(
        <div className="postList" id={id}>
            <div className="postData">
                <img src={userAvatar} />
                <p className="userName">{user}</p>
                <p className="timestamp">{new Date(timestamp).toUTCString()}</p>
            </div>
            <p className="postContent">{content}</p>
        </div>
    )
}

export default Posts

