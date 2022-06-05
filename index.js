require('dotenv').config()
const express = require('express')
const path = require('path')
const port = process.env.PORT || 80
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const MongoDbStore = require('connect-mongo')//Will be used to store sessions into DB

var mongoose = require('mongoose')

// Database connection 
const url = 'mongodb://localhost/PizzaTimes';

mongoose.connect(url);
const connection = mongoose.connection

mongoose.connection.on('connected', ()=>{
  console.log("Database Successfully connected....")
})

// Assets 
const app = express();

// Session configuration
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoDbStore.create({
    mongoUrl: url,
  }),
  cookie: {maxAge: 10800000 } //1 hour = 3600000, this cookie life is 3 hr. 
}))
//Passport configurations

const passportConfi = require('./HTTP/config/passport')
const Passport = require('passport')
const { nextTick } = require('process')
const bodyParser = require('body-parser')

passportConfi(Passport)

app.use(passport.initialize())
app.use(passport.session())


// Flash Method to set cookie 
app.use(flash())

// Static Middleware
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, "views")))
// app.use('/admin', admin)

//Global middleware
app.use((req, res, next)=>{
  res.locals.session = req.session
  next()
})
app.use((req, res, next)=>{
  res.locals.user = req.user
  next()
})

// Setting View Engine as ejs 
app.set('view engine', 'ejs');

// Importing user routes
require('./routes/userRoutes')(app)

app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`);
})