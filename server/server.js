require('dotenv').config()
const express = require('express')
const app = express()
const apiRouter = require('./controllers/api')
const cors = require('cors')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(apiRouter)
app.use(middleware.errorMiddleware)


const PORT = process.env.port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})