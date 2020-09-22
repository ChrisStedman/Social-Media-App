//Script for loading contents of json file and sending to MongoDB
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.json())

const Post = require('./models/posts')
let posts = require('./sampledata.json').posts

const User = require('./models/users')
let users = require('./sampledata.json').users

posts.map(record => {
    
    const newPost = new Post({
        user : record.user,
        timestamp : record.timestamp,
        content : record.content,
        likes : record.likes
    })

    newPost.save().then(result => {
        console.log("post record saved")
    })
})

users.map(record => {
    
    const newUser = new User({
        username : record.username,
        password : record.password,
        avatar : record.avatar,
        follows : record.follows
    })

    newUser.save().then(result => {
        console.log("user record saved")
    })
})

//mongoose.connection.close()