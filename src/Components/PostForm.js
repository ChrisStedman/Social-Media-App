import React, { useState } from 'react'
import Notification from './Notification'

//Form for creating new posts
const PostForm = ({ addPost, user }) => {
    const [postText, setPostText] = useState("")
    //const[notification, setNotification] = useState({id: -1, message: ""})
    const maxPostLength = 72

    //Form onChange handler - Update state of post text
    const postOnChangeHandler = (event) => setPostText(event.target.value)

    //Form onSubmit handler - create new form object
    const formOnSubmitHandler = (event) => {
        event.preventDefault()
        if (checkPostLength(maxPostLength)) {
            addPost({ content: postText })
            setPostText("")
        }
    }

    const checkPostLength = maxLength => postText.length <= maxLength

    const setNotificationMessage = () =>
        `Your message is ${postText.length} characters which exceeds the limit of ${maxPostLength} characters.
         Please try again`


    return (
        <div>

            <div className="column is-half is-offset-one-quarter has-text-centered">
                <div className="title">New Post</div>
                <article class="media">
                    <div className="media-left">
                        <figure class="image is-64x64">
                            <img src={user.details.avatar} />
                        </figure>
                    </div>
                    <div class="media-content">
                        <form onSubmit={formOnSubmitHandler}>
                            <div class="field">
                                <textarea class="textarea"
                                    placeholder="What would you like to say?"
                                    required
                                    value={postText}
                                    onChange={postOnChangeHandler} />
                            </div>
                            <button className="button is-dark is-fullwidth" type="submit">Submit New Post</button>
                        </form>
                    </div>


                </article>

                
            </div>
            {!checkPostLength(maxPostLength) ?
                    <div className="notification container is-danger">
                        <Notification message={setNotificationMessage()} />
                    </div> : <> </>
                }
        </div>








    )
}

export default PostForm