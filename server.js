require('dotenv').config()
const cookieSession = require('cookie-session');
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
const session = require('express-session')

db()

// app.use(
//     cookieSession({
//       secret: 'yourSecret',
//       sameSite: 'none',
//       secure: true,
//       httpOnly: true,
//     }),
//   );


app.use(cookieParser())
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

app.use(cors({sameSite: "Lax", sameSiteMode: "Lax", preflightContinue: true, credentials: true, origin: ['http://127.0.0.1:5173', 'http://localhost:5173']}))

app.enable('trust proxy')
app.use(express.json())
app.use('/api', UserRouter)
app.use('/api', MarketRouter)
app.use(ErrorMiddleware)



app.listen(PORT, () => {console.log(`Listening ${PORT}!`)})



