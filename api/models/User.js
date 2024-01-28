// Importing the mongoose library
const mongoose = require('mongoose')

// Creating a new mongoose schema for defining the structure of a user
const userSchema = new mongoose.Schema({
    // Defining username field as a String
    username: String,
    // Defining email field as a String with additional constraints
    email: {
        type: String,
        unique: true  // Ensures email addresses are unique in the collection
    },
    // Defining password field as a String
    password: String
})

// Creating a mongoose model based on the defined schema for the 'User' collection
const userModel = mongoose.model('User', userSchema);

// Exporting the created mongoose model to be used in other files
module.exports = userModel;
