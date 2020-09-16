import React, {useState} from 'react'
import Notification from './Notification'

//Form for creating new posts
const PostForm = ({addPost}) => {
    const[postText, setPostText] = useState("")
    //const[notification, setNotification] = useState({id: -1, message: ""})
    const maxPostLength = 72

    //Form onChange handler - Update state of post text
    const postOnChangeHandler = (event) => setPostText(event.target.value)

    //Form onSubmit handler - create new form object
    const formOnSubmitHandler = (event) => {
        event.preventDefault()
        if(checkPostLength(maxPostLength)){
            addPost({content: postText})
            setPostText("")
        } 
    }
  
    const checkPostLength = maxLength =>  postText.length <= maxLength

    const setNotificationMessage = () => 
        `Your message is ${postText.length} characters which exceeds the limit of ${maxPostLength} characters.
         Please try again`

    return(
        <div id="postForm">
            <h3>New Post</h3>
            <form onSubmit= {formOnSubmitHandler}>
                <input required value={postText} onChange={postOnChangeHandler}></input>
                <button type="submit">Submit New Post</button>
            </form>
            {!checkPostLength(maxPostLength) ? 
                <Notification message={setNotificationMessage()} id={1}/> : <> </>
            }   
        </div>
    )
}

export default PostForm