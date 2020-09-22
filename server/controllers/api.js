const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Post = require('../models/posts')
const User = require('../models/users')
const path = require('path')

const apiRouter = express.Router()

//Take user request and return token
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


//Return all posts
apiRouter.get('/api/posts', (request, response) => {
  Post.find({}).then(result => {
    response.json(result)
  })
})

//Return post with matching id
apiRouter.get('/api/posts/:id', (request, response) => {
  Post.findById(request.params.id)
  .then(result => {
    response.json(result)
  })
})

//Update post with matching id
apiRouter.put('/api/posts/:id', (request, response) => {

  const userToken = getTokenFrom(request)
  const decodedToken = jwt.verify(userToken, process.env.SECRET)

  if (!userToken || decodedToken.id === undefined) {
    return response.status(401).json({ error: "Invalid token" })
  }
  
  //Return post if found - else return not found message
  Post.findByIdAndUpdate(request.params.id, request.body, {new: true})
  .then (
    updatedPost => {
      return response.status(200).json(updatedPost)
    }
  ).catch (error => {
    return response.status(400).json({ error: "Post not found" })
  })
})

//Add new post
apiRouter.post('/api/posts', (request, response) => {
  const body = request.body

  //If contains no body, reject update
  if (!body.content) {
    return response.status(400).json(
      { error: 'content missing' })
  }

  const userToken = getTokenFrom(request)
  const decodedToken = jwt.verify(userToken, process.env.SECRET)

  if (!userToken || decodedToken.id === undefined) {
    return response.status(401).json({ error: "Invalid token" })
  }

  //Create newPost in post schema using content and generate other fields
  const newPost = new Post({
    user: decodedToken.username,
    timestamp: new Date().toISOString(),
    content: body.content,
    likes: []
  })

  newPost.save().then(result => {
    response.json(result)
  })
})

//Delete post with matching id
apiRouter.delete('/api/posts/:id', (request, response) => {
  const userToken = getTokenFrom(request)
  const decodedToken = jwt.verify(userToken, process.env.SECRET)

  if (!userToken || decodedToken.id === undefined) {
    return response.status(401).json({ error: "Invalid token" })
  }

  Post.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})

//User login
apiRouter.post('/api/login', async (request, response) => {
  const { username, password } = request.body

  //Find user based on username
  const userList = await User.find({"username": username})
  const user = userList[0]

  //If user not found, return invalid message
  if (!user) {
    return response.status(401).json({ error: "invalid username or password" })
  }
 
  if (await bcrypt.compare(password, user.password)) {

    //Create token
    const userForToken = {
      id: user.id,
      username: user.username
    }

    //Remove password and return to user
    //Used to not send hash passwords as part of data
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

//Get all users - Return data with passwords stripped out
apiRouter.get('/api/users', async (request, response) => {

  //Get all user data and strip out passwords
  const users = await User.find({})
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

//Get user with matching ID
apiRouter.get('/api/users/:id', (request, response) => {
  User.findById(request.params.id)
  .then(user => {
    const strippedUser = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      follows: user.follows
    }
    response.json(strippedUser)
  })

})

//Create new user - Return token
apiRouter.post('/api/users', async (request, response) => {
  const { username, password } = request.body

  const foundUsers = await User.find({"username": username})
  
  //If a user is found with same username - return error
  if (foundUsers[0]) {
    return response.status(401).json({ error: "User already exists." })
  }

  //Get hash based on password
  const passHash = await bcrypt.hash(password, 10)

  //Generate new user object
  const newUser = new User({
    username: username,
    password: passHash,
    avatar: `http://robohash.org/${username}`,
    follows: [],
  })

  //Do not return result - Must return token
  newUser.save().then(result => {

  })

  const userForToken = {
    id: newUser.id,
    username: newUser.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  //Strip out password and return
  const strippedUser = {
    username: newUser.username,
    avatar: newUser.avatar,
    follows: newUser.follows,
    id: newUser.id
  }

  return response.status(200).json({ token, details: strippedUser })
})

//Update with matching id - Used to set follows
apiRouter.put('/api/users/:id', async (request, response) => {
  const userToken = getTokenFrom(request)
  const decodedToken = jwt.verify(userToken, process.env.SECRET)

  if (!userToken || decodedToken.id === undefined) {
    return response.status(401).json({ error: "Invalid token" })
  }

  const body = request.body

  //Find user in database and set follows field to body
  let updatedUser = await User.findById(request.params.id)
  updatedUser.follows = body.follows

  //Use updatedUser to replace user in database
  User.findByIdAndUpdate(request.params.id, updatedUser, {new: true})
  .then (
    updatedUser => {
      return response.status(200).json(updatedUser)
    }
  ).catch (error => {
    return response.status(400).json({ error: "User not found" })
  })
})

//Delete user with matching id
apiRouter.delete('/api/users/:id', async (request, response) => {

  const userToken = getTokenFrom(request)
  const decodedToken = jwt.verify(userToken, process.env.SECRET)

  if (!userToken || decodedToken.id === undefined) {
    return response.status(401).json({ error: "Invalid token" })
  }

  //Find user and delete
  User.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
})

apiRouter.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = apiRouter