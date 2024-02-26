const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express();

//middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))



//database connection
mongoose
.connect("mongodb://127.0.0.1:27017/db1")
.then(()=>console.log('Database Connected'))
.catch((err)=> console.log('Database note connected', err))


app.use('/', require('./routes/authRoutes'))

const PORT = 8001;
app.listen ( PORT, ()=> console.log(`Server is running at port ${PORT}`))