import { v2 as cloudinary } from 'cloudinary';

export default new (class cloudinaryConfig {
  config() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  async destination(image: string) {
    try {
      const cloudResponse = await cloudinary.uploader.upload('src/uploadFiles/' + image, { folder: 'threads-app' });
      return cloudResponse.secure_url;
    } catch (error) {
      throw error;
    }
  }
})();
