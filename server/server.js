const express = require('express')
const app = express()
const cors = require('cors')
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
  console.log(body)
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