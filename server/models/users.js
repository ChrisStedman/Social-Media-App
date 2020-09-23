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

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar : String,
    follows: [String],
  })
  
  //Transform data to rename id field and remove version
  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const User = mongoose.model('User', userSchema)

  module.exports = User
  