import React from 'react'
import Button from './Button'
import {useSelector, useDispatch} from 'react-redux'
import userServices from '../services/userServices'
import {updateCurrentUser} from '../Reducers/currentUserReducer'
import {updateUser} from '../Reducers/userReducer'

const Follow = ({username, addStyle}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    if(!user){
        return <> </>
    }

    if(user.details.username === username)
    return <> </>
 
    const handleFollowUser = (event) => {
        event.preventDefault()
   
        userServices.followUser(username, user)
          .then(updatedUser => {
            dispatch(updateCurrentUser(updatedUser))
            dispatch(updateUser(updatedUser))
          })  
      }
    
      const handleUnfollowUser = (event) => {
        event.preventDefault()
       
        userServices.unfollowUser(username, user)
          .then(updatedUser => {
            dispatch(updateCurrentUser(updatedUser)) 
            dispatch(updateUser(updatedUser))
          })  
      }

    const follows =  user.details.follows.includes(username)
    
    if(!follows){
        return(
        <Button eventHandler={handleFollowUser} action={`Follow`}  
        addStyle={`is-dark ${addStyle}` }/>)
    } else {
      
     return (<Button eventHandler={handleUnfollowUser} action={`Unfollow`}  
     addStyle={`is-danger ${addStyle}` } />
    )}


}

export default Follow