import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const providerSchema = new Schema({
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
	profileImage: {
		type: String,
	},
	services: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Service', // Links to services they offer
		},
	],
	availability: {
		type: Map, // A map where key is the day of the week and value is an array of available time slots
		of: [String],
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review', // Reviews for this provider
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Provider = mongoose.model('Provider', providerSchema);
export default Provider;
