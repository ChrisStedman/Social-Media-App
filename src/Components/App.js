import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios'
import Posts from './Posts'
import PostForm from './PostForm'

const App = () => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

  //Load user data from server
  useEffect(() => {
    axios.get('http://localhost:3001/users')
    .then(response => {
      setUsers(response.data)
    })
  }, [])

  //Load post data from server
  useEffect(() => {
    axios.get('http://localhost:3001/posts')
    .then(response => {
      setPosts(response.data)
    })
  },[])

  //Take new post data from PostForm, create POST request
  //update state with new post
  const addPost = (newPost) => {
    
    axios.post('http://localHost:3001/posts', newPost)
    .then(response =>{
      setPosts(posts.concat(response.data))
    })
  }


//Main body of webPage
return(
  <div>
    <PostForm addPost={addPost} />
    <Posts posts={posts} users={users}/> 
  </div>
)
}

export default App
