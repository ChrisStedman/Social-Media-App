import React from 'react'
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux'
import userServices from '../services/userServices'
import { updateCurrentUser } from '../Reducers/currentUserReducer'
import { updateUser } from '../Reducers/userReducer'

const Follow = ({ username, addStyle }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  //If user not logged in do not display
  if (!user) {
    return <> </>
  }

  //If related to users personal profile, do not sure
  if (user.details.username === username)
    return <> </>

  //If follow clicked - call necessary functions
  const handleFollowUser = (event) => {
    event.preventDefault()

    userServices.followUser(username, user)
      .then(updatedUser => {
        dispatch(updateCurrentUser(updatedUser))
        dispatch(updateUser(updatedUser))
      })
  }

  //If unfollow clicked - call necessary functions
  const handleUnfollowUser = (event) => {
    event.preventDefault()

    userServices.unfollowUser(username, user)
      .then(updatedUser => {
        dispatch(updateCurrentUser(updatedUser))
        dispatch(updateUser(updatedUser))
      })
  }

  //Check if user is already following corresponding user
  const follows = user.details.follows.includes(username)

  //If not following, display follow button
  if (!follows) {
    return (
      <Button eventHandler={handleFollowUser} action={`Follow`}
        addStyle={`is-dark ${addStyle}`} />)
  } else {

    //If already following, display unfollow button
    return (<Button eventHandler={handleUnfollowUser} action={`Unfollow`}
      addStyle={`is-danger ${addStyle}`} />
    )
  }
}

export default Follow