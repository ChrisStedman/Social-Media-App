import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Posts from '../Posts'
import { setSearch } from '../../Reducers/filterPostReducer'

const Search = ({ likeHandler }) => {
    const dispatch = useDispatch()
    const initialText = useParams().query
    const posts = useSelector(state => state.posts)

    const filter = useSelector(state => state.filter)
    const [searchText, setSearchText] = useState("")
    const [passParam, setPassedParam] = useState("") //Used to track previous parameter in URL

    if (!filter) {
        dispatch(setSearch(""))
    }

    //If there is search parametrer and does not equal previous parameter
    //Update filter state with parameter
    if (initialText && initialText !== passParam) {
        setPassedParam(initialText)
        dispatch(setSearch(initialText))
    }

    //When clicked, set filter state to be search text
    const setPosts = (event) => {
        event.preventDefault()
        dispatch(setSearch(searchText))
        setSearchText("")
    }

    //Filter posts based on current filter
    let selectedPosts = posts.splice()
    selectedPosts = posts.filter(p => p.content.includes(filter))

    return (
        <div >
            <div className="column is-half is-offset-one-quarter has-text-centered">
                <div className="title">Search Posts</div>

                <form onSubmit={setPosts} >
                    <input type="text" name="search" value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        placeholder="Search..."
                        className="input my-3 is-rounded is-offset-one-quarter"
                    />

                    <div className="column is-half is-offset-one-quarter">
                        <input type="submit" value="Search..." className="button is-rounded is-dark is-fullwidth"></input>
                    </div>
                </form>
            </div>
            <Posts posts={selectedPosts} likeHandler={likeHandler} />
        </div>
    )
}

export default Search

