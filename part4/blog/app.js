const config = require('./utils/config')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

console.log('connected to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlPArser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error in connection to MongoDB:', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app