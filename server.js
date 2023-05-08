require('dotenv').config()
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const { Model, default: mongoose } = require("mongoose")
const PORT = process.env.PORT || 8000
const UserRouter = require('./Routers/UserRouter')
const MarketRouter = require('./Routers/MarketRouter')
const ErrorMiddleware = require('./Middlewares/ErrorMiddleware')
const app = express()
const db = require("./DB")

db()

app.use(express.json())
app.use(cookieParser())
app.use(cors({preflightContinue: true, credentials: true, origin: 'http://127.0.0.1:5173'}))
app.use('/api', UserRouter)
app.use('/api', MarketRouter)
app.use(ErrorMiddleware)

app.enable('trust proxy');


app.listen(PORT, () => {console.log(`Listening ${PORT}!`)})



