import cloudinary from '../config/cloudinary.js';

/**
 * Uploads a file buffer to Cloudinary and returns the secure URL.
 * @param fileBuffer The buffer of the file uploaded via Multer
 * @returns Promise resolving to the Cloudinary secure URL
 */
export function uploadToCloudinary(fileBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'Hunizen_App', // Set folder name as requested key name
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result?.secure_url || '');
      }
    );
    uploadStream.end(fileBuffer);
  });
}
