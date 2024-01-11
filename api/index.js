const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')
require('dotenv').config() 

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtsecret = process.env.JWT_SECRET
const cookieParser = require('cookie-parser')
app.use(cors({
  credentials:true,
  origin: ['http://localhost:5173','http://localhost:5174', 'http://localhost:3000']
}))

app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGO_URL);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.json('Ok')
})

app.post('/register', async (req, res) => {
  const {username,email,password} = req.body;
  try
  {
    const userDoc = await User.create({
      username,
      email,
      password:bcrypt.hashSync(password,bcryptSalt)
    })
    res.json(userDoc)
  }
  catch(e)
  {
    res.status(422).json(e);
  }

  
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id
          },
          jwtsecret,
          (err, token) => {
            if (err) {
              console.error(err);
              res.status(500).json('Internal Server Error');
            } else {
              res.cookie('token', token, { httpOnly: true }).json(userDoc);
            }
          }
        );
      } else {
        res.status(422).json('Password is incorrect');
      }
    } else {
      res.status(422).json('User does not exist');
    }
  } catch (e) {
    res.status(500).json('Internal Server Error');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  res.json({ token });
  console.log({token})
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})