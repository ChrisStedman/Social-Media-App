import React, { useEffect } from 'react';
import '../App.css';

import postServices from '../services/postServices'
import userServices from '../services/userServices'

import NavigationBar from './NavigationBar'
import NavigationRoutes from './NavigationRoutes'

import {
  BrowserRouter as Router,
} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import {initialisePosts, createPost, addLikes} from '../Reducers/postReducer'
import {initialiseUsers, createUser} from '../Reducers/userReducer'
import {userLogin, updateUser} from '../Reducers/currentUserReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
 
/////////////////////////////////////////////////////////////////Improve useEffect with redux-thunk? In video 2
  //Load user data from server
  
  useEffect(() => {
    
    userServices.getAllUsers()
      .then(users => {
        dispatch(initialiseUsers(users))
    
      })
  }, [])


  //Load post data from server - Store in date order
  useEffect(() => {
    postServices.getAllPosts()
      .then(posts => {
        posts.sort((post1, post2) =>
        new Date(post2.timestamp) - new Date(post1.timestamp)
          )
        dispatch(initialisePosts(posts))
      })
  }, [])

  //Take new post data from PostForm, create POST request
  //Adds post to store
  const addPost = (newPost) => {

    postServices.createPost(newPost, user)
      .then(post => {
        dispatch(createPost(post)) 
      })  
  }

  /////////////////////////////////////////////Implement better check of user logged in
  const likePost = (post) => {
    
    if (user && !post.likes.includes(user.details.username)) {
      const newPost = {
        ...post,
        likes: post.likes.concat(user.details.username)
      }

      postServices.updatePost(newPost, user)
      .then(post => {
        dispatch(addLikes(post.id, user.details.username))
      }
      )
    }
  }

  const followUser = (username) => {
   
    userServices.followUser(username, user)
      .then(user => {
        dispatch(updateUser(user)) 
      })  
  }

  const unfollowUser = (username) => {
   
    userServices.unfollowUser(username, user)
      .then(user => {
        dispatch(updateUser(user)) 
      })  
  }

  const setUser = (user) => dispatch(userLogin(user))

  const addUser = (user) => dispatch(createUser(user))
  

  //Main body of webPage
  return (
    <Router>
      <NavigationBar setUser={setUser}/>
      <NavigationRoutes likePost={likePost} setUser={setUser} addUser={addUser} 
      addPost={addPost} followUser={followUser} unfollowUser={unfollowUser} />
    </Router>
  )
}


export default App
