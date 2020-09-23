import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Posts from '../Posts'
import Button from '../Button'
import { userPosts } from '../../Reducers/filterPostReducer'

const MyFollows = ({ likeHandler }) => {

    const dispatch = useDispatch()
    const user = useSelector(store => store.user)
    const posts = useSelector(store => store.posts)
    const filter = useSelector(store => store.filter)
    const [selectedUsername, setSelectedUsername] = useState([])
    const [selectMentions, setSelectMentions] = useState(false)

    if (!user)
        return <> </>

    const { username, avatar, follows } = user.details

    //Sets filter based on user actions
    const filterPosts = (filter) => {
        dispatch(userPosts(filter))
        setSelectedUsername(filter)
        if (selectMentions) {
            togglePostType()
        }
    }

    //Toggle between displaying mentions and follows user posts
    const togglePostType = () => {
        setSelectMentions(!selectMentions)
    }

    let selectedPosts = posts

    //Filter selected posts based on the filter set and toggle state
    if (selectMentions) {
        selectedPosts = posts.filter(p => p.content.includes("@" + user.details.username))
    } else {
        selectedPosts = !filter ?
            filterPosts(follows) : posts.filter(p => filter.includes(p.user))
    }

    return (
        <div className="columns page-min-height">
            <div className=" column card is-3 has-text-centered is-dektop sidebar">
                <div className="card-content">
                    <figure>
                        <img src={avatar} alt={`${username} avatar`} />
                    </figure>

                    <h4 className='title is-4 '>{username}</h4>

                    <div className="field">
                        {selectMentions ?
                            <Button eventHandler={() => togglePostType()}
                                action="Show Follower Posts" addStyle="is-small is-link field" />
                            :
                            <Button eventHandler={() => togglePostType()}
                                action="Show Recent Mentions" addStyle="is-small is-link is-outlined field" />
                        }
                    </div>

                    <div className="field">
                        <strong>Display Follower Posts</strong>
                    </div>

                    {follows.map(u =>
                        <div key={u} className="field">
                            <Button eventHandler={() => filterPosts([u])}
                                action={`${u}'s Posts`} addStyle="is-small is-link is-outlined field" />
                        </div>)}
                    <div className="field">
                        <Button eventHandler={() => filterPosts(follows)}
                            action={`View All`} addStyle="is-small is-link is-outlined field" />
                    </div>
                </div>

            </div>
            <div className="column is-offset-3">
                <div className="field mt-5 has-text-centered">
                    {selectMentions ? <h4 className="title is-h4">Recent Mentions</h4>
                        :
                        <h4 className="title is-h4">{selectedUsername.length !== 1 ?
                            "Recent Follower Posts" : `${selectedUsername[0]}'s Recent Posts`}</h4>
                    }
                </div>
                <Posts likeHandler={likeHandler} posts={selectedPosts} />
            </div>
        </div>
    )
}

export default MyFollows