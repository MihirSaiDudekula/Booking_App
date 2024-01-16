const mongoose = require('mongoose')
const placeSchema = new mongoose.Schema({
	owner:{mongoose.Schema.Types.ObjectID,ref:'User'},
	title: String,
	address: String,
	photos: [String],
	description: String,
	perks:[String],
	extraInfo:String,
	checkInTime:Number,
	checkInTime:Number,
	maxGuests:Number
});

const placeModel = mongoose.model('Place',placeSchema);
module.exports=placeModel;