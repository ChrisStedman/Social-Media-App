import React, { useState, useEffect } from 'react';
import '../App.css';

import LoginForm from './LoginForm'
import postServices from '../services/postServices'
import userServices from '../services/userServices'
import CreateUserForm from './CreateUserForm'
import Users from './Users'
import Home from './Views/Home'
import CreateUSer from './Views/CreateUser'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)

  //Load user data from server
  useEffect(() => {
    userServices.getAllUsers()
      .then(users => {
        setUsers(users)
      })
  }, [user])


  //Load post data from server
  useEffect(() => {
    postServices.getAllPosts()
      .then(posts => {
        setPosts(posts)
      })
  }, [])

  //Take new post data from PostForm, create POST request
  //update state with new post
  const addPost = (newPost) => {

    postServices.createPost(newPost, user)
      .then(post => {
        setPosts(posts.concat(post))
      })
  }

  /////////////////////////////////////////////Implement better check of user logged in
  const likePost = (post) => {
    console.log("Like post:", user)

    if (user && !post.likes.includes(user.username)) {
      const newPost = {
        ...post,
        likes: post.likes.concat(user.username)
      }
      console.log(newPost)
    }


  }


  //Main body of webPage
  return (
    <Router>
      <nav class="navbar is-dark" role="navigation" aria-label="main-navigation">
        <div class="navbar-menu">
          <div class="navbar-start">
            <Link to="/" class="navbar-item">Home</Link>
            <Link to="/explore" class="navbar-item">Explore</Link>

            {user !== null ?
              <>
                <Link to="/users" class="navbar-item">Users</Link>
                <Link to="/follows" class="navbar-item">Follows</Link>
              </> : <>
                <Link to="/create-account" class="navbar-item">Create Account</Link>
              </>
            } </div>

          <div class="navbar-end">
            {user === null ?
              <>
                <LoginForm user={user} setUser={setUser} />
              </> : <>
                <Link to="/profile" class="navbar-item">Profile</Link>
              </>
            } </div>
        </div>
      </nav>


      <Switch>
        <Route path="/explore"></Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/follows"></Route>
        <Route path="/profile"></Route>
        <Route path="/create-account">
          <CreateUSer setUser={setUser} />
        </Route>
        <Route path="/login">

        </Route>
        <Route path="/">
          <Home posts={posts} users={users} addPost={addPost} likePost={likePost}></Home>

        </Route>
      </Switch>
    </Router>
  )
}

export default App
