// Import required packages and modules
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Import the 'cookie-parser' middleware for handling cookies in Express
// Use the 'cookie-parser' middleware to parse cookies in incoming requests
const cookieParser = require('cookie-parser');
const User = require('./models/User.js'); // Import the User model from a file
require('dotenv').config(); // Load environment variables from a .env file

// Generate a salt for bcrypt hashing and get JWT secret from environment variables
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtsecret = process.env.JWT_SECRET;

app.use(
  cors({
    credentials: true, // Allow credentials (cookies) to be sent with cross-origin requests
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'], // Allow requests from these specified origins
  })
);

app.use(express.json()); // Use middleware to parse JSON bodies in requests
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies
mongoose.connect(process.env.MONGO_URL); // Connect to MongoDB using the provided URL

// Define a basic route to send 'Hello World!' as a response
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define a test route to send 'Ok' as a JSON response
app.get('/test', (req, res) => {
  res.json('Ok');
});

// Define a route for user registration
app.post('/register', async (req, res) => {
  // Destructure relevant information (username, email, password) from the request body
  const { username, email, password } = req.body;
  try {
    // Attempt to create a new user using the User model and provided information
    const userDoc = await User.create({
      username,
      email,
      // Hash the provided password using bcrypt before storing it in the database
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    // Send a JSON response containing the created user information
    res.json(userDoc);
  } catch (e) {
    // If an error occurs during registration, handle it by sending a JSON response with a 422 status code
    res.status(422).json(e);
  }
});


// Define a route for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find a user by email in the database
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      // If user exists, compare the provided password with the stored hashed password
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        // If password is correct, sign a JWT token and set it as a cookie
        // Generate a JSON Web Token (JWT) for authentication
        jwt.sign(
          {
            email: userDoc.email, 
            id: userDoc._id 
            // Include user's email and user's ID in the token payload
          },
          jwtsecret, // Use the JWT secret for signing the token
          (err, token) => {
            // Callback function executed after JWT is generated
            if (err) {
              // If an error occurs during JWT generation, log the error and send a 500 Internal Server Error response
              console.error(err);
              res.status(500).json('Internal Server Error');
            } else {
              // If JWT is successfully generated, set it as an HTTP-only cookie and send it in the response
              res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true}).json(userDoc).on('error', (err) => console.error('Error setting cookie:', err));
            }
          }
        );

      } else {
        res.status(422).json('Password is incorrect'); // Handle incorrect password
      }
    } else {
      res.status(422).json('User does not exist'); // Handle non-existent user
    }
  } catch (e) {
    res.status(500).json('Internal Server Error'); // Handle unexpected errors
  }
});


// Define a route to retrieve and log the token from cookies
// Define a route for handling requests to the '/profile' endpoint
app.get('/profile', (req, res) => {
  // Extract the 'token' from the cookies in the incoming request
  const { token } = req.cookies;

  // Check if a token exists
  if (token) {
    // Verify the token using jwt.verify
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
      // Handle errors during token verification
      if (err) throw err;

      // Destructure relevant information (email, username, _id) from the user data obtained from the token
      const { email, username, _id } = await User.findById(userData.id);

      // Send a JSON response containing the user information
      res.json({
        email,
        username,
        _id
      });
    });
  } else {
    // If no token exists, send a JSON response with null
    res.json(null);
  }
});

// Define a route to handle user logout
app.post('/logout', (req, res) => {
  try {
    // Try to clear the 'token' cookie by setting its value to an empty string
    res.cookie('token', '', { expires: new Date(0), httpOnly: true, sameSite: 'None', secure: true });

    // Send a JSON response indicating a successful logout
    res.json(true);
  } catch (error) {
    // If an error occurs during the logout process, handle it
    console.error('Error clearing token cookie:', error);

    // Send a 500 Internal Server Error response with an error message
    res.status(500).json('Internal Server Error');
  }
});


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
