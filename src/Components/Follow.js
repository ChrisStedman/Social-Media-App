import React from 'react'
import Button from './Button'
import {useSelector, useDispatch} from 'react-redux'
import userServices from '../services/userServices'
import {updateUser} from '../Reducers/currentUserReducer'

const Follow = ({username, addStyle}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    if(!user){
        return <> </>
    }

    const handleFollowUser = (event) => {
        event.preventDefault()
   
        userServices.followUser(username, user)
          .then(user => {
            dispatch(updateUser(user)) 
          })  
      }
    
      const handleUnfollowUser = (event) => {
        event.preventDefault()
       
        userServices.unfollowUser(username, user)
          .then(user => {
            dispatch(updateUser(user)) 
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