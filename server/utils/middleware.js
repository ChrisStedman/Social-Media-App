const { response } = require("express")

const requestLogger = (request, response, next) => {
    console.log(request.method, request.path)
    console.log(request.body)
    console.log('---')
    next()

}

const errorMiddleware = (error, request, response, next) => {
    console.log("Error:", error.name)
    response.status(500).send({Error: error.name})
    next()
}

module.exports = {requestLogger, errorMiddleware}