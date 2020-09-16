import React, {useState, useEffect} from 'react';
import '../App.css';
import Posts from './Posts'
import PostForm from './PostForm'
import LoginForm from './LoginForm'
import postServices from '../services/postServices'
import userServices from '../services/userServices'

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
  }, [])

 
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
    .then(post =>{
      setPosts(posts.concat(post))
    })
  }


//Main body of webPage
return(
  <div>
    <LoginForm user={user} setUser={setUser} />
    <PostForm addPost={addPost} />
    <Posts posts={posts} users={users}/> 
  </div>
)
}

export default App
