require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

let posts = require('./sampledata.json').posts
let users = require('./sampledata.json').users

const generateId = (len) => {
  const maxId = len > 0 ? Math.max(...posts.map(
    p => p.id
  )) : 0
  return maxId + 1
}

const getUser = (username) => {
  const user = users.filter(u => u.username === username)[0]
  console.log(user)
  return user
}

const getTokenFrom = request => {
  //Gets value of the 'authorisation' field within headers
  const authorisation = request.get('authorisation')

  //Check it is defined and starts with 'bearer '
  if(authorisation && authorisation.toLowerCase().startsWith('bearer '))
    return authorisation.substring(7)
  else
    return null
}


app.get('/', (request, response) => {
    response.send()
  })

app.get('/api/posts', (request, response) => {
 
    response.json(posts)
})

app.get('/api/posts/:id', (request, response) => {
    const id = Number(request.params.id)
    const post = posts.find(p => p.id === id)
    if (post)
      response.json(post)
    else
      response.status(404).end()
})

app.post('/api/posts', (request, response) => {
  
  const body = request.body

  if(!body.content){
    return response.status(400).json(
      { error: 'content missing' })
  }
  
  const userToken = getTokenFrom(request)
  
  const decodedToken = jwt.verify(userToken, process.env.SECRET)
  
  if(!userToken || decodedToken.id === undefined){
    return response.status(401).json({ error: "Invalid token" })
  }

  const newPost = {...body,
      timestamp: new Date().toISOString(),
      likes : [],
      id: generateId(posts.length),
      user: decodedToken.username
  }

  posts = posts.concat(newPost)
  response.json(newPost)
})

app.post('/api/login', async (request, response) => {
  const {username, password} = request.body
  const user = getUser(username)
  
  if(!user){
    return response.status(401).json({error: "invalid username or password"})
  }

  if(await bcrypt.compare(password, user.password)){
    
    const userForToken = {
      id: user.id,
      username: user.username
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    
    
    return response.status(200).json({token})
  }

  return response.status(401).json({ error: "invalid username or password" })
})


app.get('/api/users', (request, response) => {
    const strippedUsers = users.map(
      u =>  {
            return {
              id : u.id,
              username: u.username,
              avatar: u.avatar,
              follows: u.follows
            }
            
          })
    response.json(users)
})

app.get('/api/users/:id', (request, response) => {
    const id = Number(request.params.id)
    const user = users.find(u => u.id === id)
    if (user)
      response.json(user)
    else
      response.status(404).end()
  })



const PORT = process.env.port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})