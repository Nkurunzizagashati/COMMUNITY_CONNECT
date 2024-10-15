import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const reviewSchema = new Schema({
	consumer: {
		type: Schema.Types.ObjectId,
		ref: 'Consumer', // Links to the consumer leaving the review
		required: true,
	},
	provider: {
		type: Schema.Types.ObjectId,
		ref: 'Provider', // Links to the service provider
		required: true,
	},
	service: {
		type: Schema.Types.ObjectId,
		ref: 'Service', // Links to the specific service being reviewed
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5, // Rating from 1 to 5
	},
	comment: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
