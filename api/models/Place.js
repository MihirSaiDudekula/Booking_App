// Importing the mongoose library
const mongoose = require('mongoose')

// Creating a new mongoose schema for defining the structure of a place
const placeSchema = new mongoose.Schema({
    // Defining owner field which is a reference to a User document
    owner: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    // Defining title field as a String
    title: String,
    // Defining address field as a String
    address: String,
    // Defining photos field as an array of Strings
    photos: [String],
    // Defining description field as a String
    description: String,
    // Defining perks field as an array of Strings
    perks: [String],
    // Defining extraInfo field as a String
    extraInfo: String,
    // Defining checkInTime field as a Number
    checkIn: String,
    // Defining checkInTime field again (duplicate)
    // This seems to be an error, as it duplicates the previous field definition
    // It should likely be removed or corrected
    checkOut: String,
    // Defining maxGuests field as a Number
    maxGuests: Number,
    price:Number
});

// Creating a mongoose model based on the defined schema for the 'Place' collection
const placeModel = mongoose.model('Place', placeSchema);

// Exporting the created mongoose model to be used in other files
module.exports = placeModel;
