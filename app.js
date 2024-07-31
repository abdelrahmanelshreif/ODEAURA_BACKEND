const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const { Router } = require('express')
const router = Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET)
const { checkUser } = require('./middleware/auth')
const cors = require('cors')
require('dotenv').config()

const app = express()

// middlewares

app.use(
  cors());
app.use(express.json()) // parse incoming requests with JSON payloads
app.use(cookieParser())

// environment variables
const port = process.env.PORT || 3000
const dbURI =
  'mongodb+srv://abdelrahman93955:css@cluster0.en4bwyr.mongodb.net/ODEAURA'

// Connecting to db
mongoose
  .connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB!')
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`)
  })

app.all('*', checkUser) // to get access to user info in all views

app.use(authRoutes)
app.use(userRoutes)
app.use(categoryRoutes)
app.use(productRoutes)
app.use(cartRoutes)
app.use(orderRoutes)
app.use(wishlistRoutes)
