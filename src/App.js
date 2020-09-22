import React, { useState, useEffect } from 'react';
import './App.css';


import userServices from './services/userServices'

import NavigationBar from './Components/NavigationBar'
import NavigationRoutes from './Components/NavigationRoutes'

import {
  BrowserRouter as Router,
} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import {initialisePosts, createPost, toggleLikes} from './Reducers/postReducer'
import {initialiseUsers, createUser, removeUser} from './Reducers/userReducer'
import {setUserLogin, updateCurrentUser} from './Reducers/currentUserReducer'
import {initialiseFilteredPosts} from './Reducers/filterPostReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [updateData, setUpdateData] = useState(true)
 
/////////////////////////////////////////////////////////////////Improve useEffect with redux-thunk? In video 2
  //Load user data from server
  
  useEffect( () => {
    if(updateData){
          dispatch(initialiseUsers())
    }
  }, [updateData])

  //Load post data from server - Store in date order
  useEffect(() => {
    if(updateData){
        dispatch(initialisePosts())
        dispatch(initialiseFilteredPosts())
    }
      updateDataCheck()
  }, [updateData])

  const updateDataCheck = () => {
    if(updateData){
      setUpdateData(false)
      setTimeout(() => setUpdateData(true), 30000)
    }
  }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      userServices.getUser(user.details.id)
      .then( response => {
        setUser({token: user.token, details: response})
      }
      )
    }
  },[])

  

  //Take new post data from PostForm, create POST request
  //Adds post to store
  const addPost = (newPost) => {
        dispatch(createPost(newPost, user))  
  }

  /////////////////////////////////////////////Implement better check of user logged in
  const likePost = (post) => {
    const newLikes = !post.likes.includes(user.details.username) ? 
                      post.likes.concat(user.details.username) : 
                      post.likes.filter(u => u !== user.details.username)

      const newPost = {
        ...post,
        likes: newLikes
    }
   
        dispatch(toggleLikes(newPost, user))  
      .catch( error => {//////////////////////////////////needed?

      }

      )
    }

  const setUser = (user) => dispatch(setUserLogin(user))

  const addUser = (user) => dispatch(createUser(user))

  const deleteUser = () => {
    if(window.confirm("Are you sure? This will permanently delete your account")){
    userServices.deleteUser(user)
    .then(resp => {
      window.localStorage.removeItem('loggedUser')
      dispatch(removeUser(user))
      dispatch(setUser(null))
    })
  }
  }
  

  //Main body of webPage
  return (
    <>
    <Router>
      <NavigationBar setUser={setUser}/>
      <NavigationRoutes likePost={likePost} setUser={setUser} addUser={addUser} 
      addPost={addPost} deleteUser={deleteUser}/>
    </Router>

<footer className="footer" id="background-img">
  <div className="has-text-centered is-transparent">
 
   <a href="/#" className="button is-small is-light">Top of page</a>
   <div className="field mt-3">
   <strong>About Us</strong>
      <p>A truly free social media platform - No data collection guaranteed!</p>
      
   </div>
  
</div>
</footer>
</>
  )
}


export default App
