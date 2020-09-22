const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Post = require('../models/posts')
const User = require('../models/users')

let posts = require('../sampledata.json').posts
let users = require('../sampledata.json').users

const apiRouter = express.Router()

const generateId = (len) => {
  const maxId = len > 0 ? Math.max(...posts.map(
    p => p.id
  )) : 0
  return maxId + 1
}

const getUser = (username) => {
  const user = users.filter(u => u.username === username)[0]
  return user
}

const getTokenFrom = request => {
  //Gets value of the 'authorisation' field within headers
  const authorisation = request.get('authorisation')

  //Check it is defined and starts with 'bearer '
  if (authorisation && authorisation.toLowerCase().startsWith('bearer '))
    return authorisation.substring(7)
  else
    return null
}


apiRouter.get('/', (request, response) => {
  response.send()
})

apiRouter.get('/api/posts', (request, response) => {
  Post.find({}).then(result => {
    response.json(result)
  })
})

apiRouter.get('/api/posts/:id', (request, response) => {
  Post.findById(request.params.id)
  .then(result => {
    console.log(result)
    response.json(result)
  })
  
})

apiRouter.put('/api/posts/:id', (request, response) => {

  const userToken = getTokenFrom(request)
  const decodedToken = jwt.verify(userToken, process.env.SECRET)

  if (!userToken || decodedToken.id === undefined) {
    return response.status(401).json({ error: "Invalid token" })
  }
  console.log(request.params)
  Post.findByIdAndUpdate(request.params.id, request.body, {new: true})
  .then (
    updatedPost => {
      return response.status(200).json(updatedPost)
    }
  ).catch (error => {
    return response.status(400).json({ error: "Post not found" })
  })
  

})

apiRouter.post('/api/posts', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json(
      { error: 'content missing' })
  }

  const userToken = getTokenFrom(request)
  const decodedToken = jwt.verify(userToken, process.env.SECRET)

  if (!userToken || decodedToken.id === undefined) {
    return response.status(401).json({ error: "Invalid token" })
  }

  const newPost = new Post({
    user: decodedToken.username,
    timestamp: new Date().toISOString(),
    content: body.content,
    likes: []
  })

  newPost.save().then(result => {
    console.log(result)
    response.json(result)
  })

})

apiRouter.delete('/api/posts/:id', (request, response) => {

  const userToken = getTokenFrom(request)
  const decodedToken = jwt.verify(userToken, process.env.SECRET)

  if (!userToken || decodedToken.id === undefined) {
    return response.status(401).json({ error: "Invalid token" })
  }

  const id = Number(request.params.id)
  posts = posts.filter(post => post.id != id)
  response.status(204).end()

})

apiRouter.post('/api/login', async (request, response) => {
  const { username, password } = request.body
  const user = getUser(username)

  if (!user) {
    return response.status(401).json({ error: "invalid username or password" })
  }

  if (await bcrypt.compare(password, user.password)) {

    const userForToken = {
      id: user.id,
      username: user.username
    }

    const strippedUser = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      follows: user.follows

    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    return response.status(200).json({ token, details: strippedUser })
  }

  return response.status(401).json({ error: "invalid username or password" })
})

apiRouter.post('/api/users', async (request, response) => {
  const { username, password } = request.body

  if (getUser(username)) {
    return response.status(401).json({ error: "User already exists." })
  }

  const passHash = await bcrypt.hash(password, 10)
  const newUser = {
    username: username,
    password: passHash,
    avatar: `http://robohash.org/${username}`,
    follows: [],
    id: users.length
  }

  users = users.concat(newUser)

  const userForToken = {
    id: newUser.id,
    username: newUser.username
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  const strippedUser = {
    username: newUser.username,
    avatar: newUser.avatar,
    follows: newUser.follows,
    id: newUser.id
  }

  return response.status(200).json({ token, details: strippedUser })
})


apiRouter.get('/api/users', (request, response) => {
  const strippedUsers = users.map(
    u => {
      return {
        id: u.id,
        username: u.username,
        avatar: u.avatar,
        follows: u.follows
      }
    })
  response.json(strippedUsers)
})

apiRouter.put('/api/users/:id', (request, response) => {
  const userToken = getTokenFrom(request)
  const decodedToken = jwt.verify(userToken, process.env.SECRET)

  if (!userToken || decodedToken.id === undefined) {
    return response.status(401).json({ error: "Invalid token" })
  }

  const id = Number(request.params.id)
  const body = request.body
  const user = users.find(u => u.id === id)
  user.follows = body.follows

  if (!user) {
    response.status(404).end()
  }



  users = users.map(u => u.id === id ? user : u)

  response.status(200).json(body)

})

apiRouter.delete('/api/users/:id', (request, response) => {

  const userToken = getTokenFrom(request)
  const decodedToken = jwt.verify(userToken, process.env.SECRET)

  if (!userToken || decodedToken.id === undefined) {
    return response.status(401).json({ error: "Invalid token" })
  }

  const id = Number(request.params.id)
  users = users.filter(user => user.id != id)
  response.status(204).end()
})

module.exports = apiRouter