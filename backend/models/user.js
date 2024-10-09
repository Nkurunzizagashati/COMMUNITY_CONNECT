const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['consumer', 'provider'], // 'consumer' for normal users, 'provider' for businesses or artisans
		required: true,
	},
	phone: {
		type: String,
	},
	profileImage: {
		type: String, // URL to the profile image
	},
	services: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Service', // Links to the services they offer
		},
	],
	availability: {
		type: Map, // A map where key is the day of the week and value is an array of available time slots
		of: [String],
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review',
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('User', userSchema);

export default User;
