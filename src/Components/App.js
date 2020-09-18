import React, { useState, useEffect } from 'react';
import '../App.css';

import LoginForm from './LoginForm'
import postServices from '../services/postServices'
import userServices from '../services/userServices'
import Users from './Users'
import Home from './Views/Home'
import CreateUSer from './Views/CreateUser'
import Explore from './Views/Explore'
import User from './User'

import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from 'react-router-dom'

const App = () => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
  const [isActive, setIsActive] = useState(false);

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
        posts.sort((post1, post2) =>
        new Date(post2.timestamp) - new Date(post1.timestamp)
          )
        setPosts(posts)
      })
  }, [])

  //Take new post data from PostForm, create POST request
  //update state with new post
  const addPost = (newPost) => {

    postServices.createPost(newPost, user)
      .then(post => {
        setPosts([post,...posts])
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
        const updatedPosts = posts.map(
          p => p.id === post.id ? newPost : p)
          setPosts(updatedPosts)
      }

      )
    }


  }


  //Main body of webPage
  return (
    <Router>

      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">

        <div className={`navbar-burger burger ${isActive ? "is-active" : ""}`}>
          <a onClick={() => setIsActive(!isActive)} role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

        </div>
        <div className={`navbar-menu ${isActive ? "is-active has-text-centered" : ""}`}>
          <div className="navbar-start">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/explore" className="navbar-item">Explore</Link>

            {user !== null ?
              <>
                <Link to="/users" className="navbar-item">Users</Link>
                <Link to="/follows" className="navbar-item">Follows</Link>
              </> : <>
                <Link to="/create-account" className="navbar-item">Create Account</Link>
              </>
            } </div>

          <div className="navbar-end">
            {user === null ?
              <>
                <LoginForm user={user} setUser={setUser} className="navbar-item" />
              </> : <>
                <Link to="/profile" className="navbar-item">Profile</Link>
              </>
            } </div>
        </div>
      </nav>


      <Switch>
        <Route path="/explore">
          <Explore posts={posts} users={users} likeHandler={likePost} user={user}/>
        </Route>
        <Route path="/users/:username">
          <User users={users} posts={posts} />
          </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/follows"></Route>
        <Route path="/profile"></Route>
        <Route path="/create-account">
          <CreateUSer setUser={setUser} />
        </Route>
        <Route path="/">
          <Home posts={posts} users={users} addPost={addPost} likePost={likePost} user={user}></Home>

        </Route>
      </Switch>
    </Router>
  )
}

export default App
