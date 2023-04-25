require('dotenv').config()
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const { Model, default: mongoose } = require("mongoose")
const User = require("./Models/User")
const PORT = process.env.PORT || 8000
const UserRouter = require('./Routers/UserRouter')
const ErrorMiddleware = require('./Middlewares/ErrorMiddleware')
const app = express()




app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', UserRouter)
app.use(ErrorMiddleware)




app.listen(PORT, () => {console.log(`Listening ${PORT}!`)})



