const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('./models/User.js')
require('dotenv').config() 

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(cors({
  credentials:true,
  origin: ['http://localhost:5173', 'http://localhost:3000']
}))

app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.json('Ok')
})

app.post('/register', async (req, res) => {
  const {username,email,password} = req.body;
  const userDoc = await User.create({
    username,
    email,
    password:bcrypt.hashSync(password,bcryptSalt)
  })
  res.json(userDoc)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})