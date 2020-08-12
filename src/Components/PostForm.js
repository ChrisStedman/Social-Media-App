import React, {useState} from 'react'

//Form for creating new posts
const PostForm = ({addPost}) => {
    const[postText, setPostText] = useState("")

    //Form onChange handler - Update state of post text
    const postOnChangeHandler = (event) => setPostText(event.target.value)

    //Form onSubmit handler - create new form object
    const formOnSubmitHandler = (event) => {
        event.preventDefault()
        const newPost = {
            user: "Bobalooba",
            timestamp: new Date().toISOString(),
            content: postText,
            likes : []
        }
        addPost(newPost)
        setPostText("")
    }

    return(
        <div id="postForm">
            <h3>New Post</h3>
            <form onSubmit= {formOnSubmitHandler}>
                <input required value={postText} onChange={postOnChangeHandler}></input>
                <button type="submit">Submit New Post</button>
            </form>
        </div>
    )

}

export default PostForm