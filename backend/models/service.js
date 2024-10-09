const serviceSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	provider: {
		type: Schema.Types.ObjectId,
		ref: 'User', // Links to the provider (artisan or business)
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String, // e.g., 'Plumber', 'Electrician', 'Handyman'
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
