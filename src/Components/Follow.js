import React from 'react'
import Button from './Button'
import {useSelector} from 'react-redux'

const Follow = ({username, followUser, unfollowUser}) => {
    const user = useSelector(state => state.user)
    

    const handleFollowUser = (event) => {
        event.preventDefault()
           followUser(username)   
    }

    const handleUnfollowUser = (event) => {
        event.preventDefault()
           unfollowUser(username)   
    }

    const follows =  user.details.follows.includes(username)

    if(!follows){
        return(
        <Button eventHandler={handleFollowUser} action={`Follow ${username}`}  
        style='is-dark is-fullwidth' />)
    } else {
      
     return (<Button eventHandler={handleUnfollowUser} action={`Unfollow ${username}`}  
     style='is-danger is-fullwidth' />
    )}


}

export default Follow