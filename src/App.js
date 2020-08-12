import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/users')
    .then(response => {
      setUsers(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3001/posts')
    .then(response => {
      setPosts(response.data)
    })
  },[])

return(
  users.map(u => <p>{u.id}</p>)
)
}

export default App;
