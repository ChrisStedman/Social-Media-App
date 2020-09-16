const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

let posts = require('./sampledata.json').posts
let users = require('./sampledata.json').users

const generateId = () => {
  const maxId = posts.length > 0 ? Math.max(...posts.map(
    p => p.id
  )) : 0
  return maxId + 1
}

const getUser = (username) => {
  const user = users.filter(u => u.username === username)[0]
  console.log(user)
  return user
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
  
  const newPost = {...body,
      timestamp: new Date().toISOString(),
      likes : [],
      id: generateId()
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
    const token = jwt.sign(userForToken, "secret")
    
    
    return response.status(200).json({token})
  }

  return response.status(401).json({ error: "invalid username or password" })
})


app.get('/api/users', (request, response) => {
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



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})