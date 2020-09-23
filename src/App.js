import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import './App.css';

import userServices from './services/userServices'
import NavigationBar from './Components/NavigationBar'
import NavigationRoutes from './Components/NavigationRoutes'
import Footer from './Components/Footer'

import { initialisePosts, createPost, toggleLikes } from './Reducers/postReducer'
import { initialiseUsers, createUser, removeUser } from './Reducers/userReducer'
import { setUserLogin } from './Reducers/currentUserReducer'
import { initialiseFilteredPosts } from './Reducers/filterPostReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [updateData, setUpdateData] = useState(true)

  //Load user data from server
  useEffect(() => {
    if (updateData) {
      dispatch(initialiseUsers())
    }
  }, [updateData, dispatch, updateDataCheck])

  //Load post data from server - Store in date order
  useEffect(() => {
    if (updateData) {
      dispatch(initialisePosts())
      dispatch(initialiseFilteredPosts())
    }
    updateDataCheck()
  }, [updateData, dispatch, updateDataCheck])

  //Timer which sets state regularly to trigger refresh of data
  const updateDataCheck = () => {
    if (updateData) {
      setUpdateData(false)
      setTimeout(() => setUpdateData(true), 20000)
    }
  }

  //Check local storage for user data
  //If found - parse and set user state to retain login
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userServices.getUser(user.details.id)
        .then(response => {
          setUser({ token: user.token, details: response })
        }
        )
    }
  }, [dispatch])

  //Take new post data from PostForm, create POST request
  //Adds post to store
  const addPost = (newPost) => {
    dispatch(createPost(newPost, user))
  }

  //Add like to post
  const likePost = (post) => {
    const newLikes = !post.likes.includes(user.details.username) ?
      post.likes.concat(user.details.username) :
      post.likes.filter(u => u !== user.details.username)

    const newPost = {
      ...post,
      likes: newLikes
    }
    dispatch(toggleLikes(newPost, user))
  }

  const setUser = (user) => dispatch(setUserLogin(user))
  const addUser = (user) => dispatch(createUser(user))

  //If user attempts account deletion - require confirmation
  //If confirmed, remove data from local storage and update
  const deleteUser = () => {
    if (window.confirm("Are you sure? This will permanently delete your account")) {
      window.localStorage.removeItem('loggedUser')
      dispatch(removeUser(user))
      dispatch(setUser(null))
    }
  }

  return (
    <>
      <Router>
        <NavigationBar setUser={setUser} />
        <NavigationRoutes likePost={likePost} setUser={setUser} addUser={addUser}
          addPost={addPost} deleteUser={deleteUser} />
      </Router>
      <Footer />
    </>
  )
}

export default App
