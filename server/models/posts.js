const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log("connecting to", url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log("Connected to MongoDB")
})
.catch(error => {
    console.log("Error connecting to MongoDB:", error.message)
})

const postSchema = new mongoose.Schema({
    user: String,
    timestamp: String,
    content : String,
    likes: [String],
  })
  
  //Transform data to rename id field and remove version
  postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const Post = mongoose.model('Post', postSchema)

  module.exports = Post
  