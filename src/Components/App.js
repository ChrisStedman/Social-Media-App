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
import {initialisePosts, createPost, toggleLikes} from '../Reducers/postReducer'
import {initialiseUsers, createUser} from '../Reducers/userReducer'
import {userLogin} from '../Reducers/currentUserReducer'
import {initialiseFilteredPosts} from '../Reducers/filterPostReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
 
/////////////////////////////////////////////////////////////////Improve useEffect with redux-thunk? In video 2
  //Load user data from server
  
  useEffect( () => {
    
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
        dispatch(initialiseFilteredPosts(posts))
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
    const newLikes = !post.likes.includes(user.details.username) ? 
                      post.likes.concat(user.details.username) : 
                      post.likes.filter(u => u !== user.details.username)

    console.log("Includes: ", post.likes.includes(user.details.username) )
    console.log("New likes", newLikes)

      const newPost = {
        ...post,
        likes: newLikes
    }

      postServices.updatePost(newPost, user)
      .then(post => {
        dispatch(toggleLikes(post))
        }
      ).catch( error => {

      }

      )
    }
  

  const setUser = (user) => dispatch(userLogin(user))

  const addUser = (user) => dispatch(createUser(user))
  

  //Main body of webPage
  return (
    <Router>
      <NavigationBar setUser={setUser}/>
      <NavigationRoutes likePost={likePost} setUser={setUser} addUser={addUser} 
      addPost={addPost} />
    </Router>
  )
}


export default App
