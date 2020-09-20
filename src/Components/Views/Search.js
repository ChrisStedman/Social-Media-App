import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams} from 'react-router-dom'
import Posts from '../Posts'
import Button from '../Button'
import {userPosts} from '../../Reducers/filterPostReducer'

const Search = ({likeHandler}) => {
    const initialText = useParams().query
  
    const posts = useSelector(state => state.posts)
    const [searchText, setSearchText] = useState(initialText ? initialText : "")

    let selectedPosts = posts.splice()

         selectedPosts = posts.filter(p => p.content.includes(''+searchText))

   // }
//<input type="submit" value="Search..."></input>
    return(
        <div>
        <form >
        
          <input type="text" name="search" value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        placeholder="Search hashtags..."
                        className="input"
         />

        </form>
        <Posts posts={selectedPosts} likeHandler={likeHandler} />
        </div>
    )
}

export default Search

