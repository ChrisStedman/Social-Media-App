import React, { useState } from 'react'

//Form for creating new posts
const PostForm = ({ addPost, user }) => {
    const [postText, setPostText] = useState("")
    const maxPostLength = 144

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
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src={user.details.avatar} alt={`User avatar`}/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <form onSubmit={formOnSubmitHandler}>
                            <div className="field">
                                <textarea className="textarea"
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
                        <p>{setNotificationMessage()} </p>
                    </div> : <> </>
                }
        </div>








    )
}

export default PostForm