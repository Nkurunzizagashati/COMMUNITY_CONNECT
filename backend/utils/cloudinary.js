import { v2 as cloudinary } from 'cloudinary';

const cloudinaryFileUpload = async (fileToUpload, cloudinaryName) => {
	cloudinary.config({
		cloud_name: cloudinaryName,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});
	try {
		const data = await cloudinary.uploader.upload(fileToUpload, {
			resource_type: 'auto',
		});
		return {
			url: data?.secure_url,
		};
	} catch (error) {
		return error;
	}
};

export { cloudinaryFileUpload };
