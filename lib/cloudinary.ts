/**
 * Cloudinary Utility (TEMPORARILY DISABLED)
 * 
 * Cloudinary integration has been disabled.
 * To re-enable:
 * 1. Uncomment the imports and code below
 * 2. Ensure CLOUDINARY_* environment variables are set
 * 3. Re-enable the API route at app/api/upload/avatar/route.ts
 * 4. Re-enable upload functionality in components/AvatarUpload.tsx
 */

// DISABLED - Uncomment to re-enable
// import { v2 as cloudinary } from 'cloudinary';
// import { Readable } from 'stream';

// Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

/**
 * Upload image to Cloudinary using streaming (memory-efficient)
 * DISABLED - Returns error
 */
export async function uploadAvatarToCloudinary(
  file: File,
  userId: string
): Promise<{ secure_url: string; public_id: string }> {
  throw new Error('Cloudinary upload is disabled');
  
  /* DISABLED CODE - Uncomment to re-enable
  // Validate Cloudinary config
  if (!process.env.CLOUDINARY_CLOUD_NAME || 
      !process.env.CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary configuration is missing');
  }

  // Convert File to Buffer (memory-efficient chunked approach)
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Create a readable stream from buffer for Cloudinary
  const stream = Readable.from(buffer);

  // Generate unique public_id
  const publicId = `avatars/${userId}-${Date.now()}`;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'avatars',
        public_id: publicId,
        resource_type: 'image',
        format: 'auto',
        transformation: [
          {
            width: 400,
            height: 400,
            crop: 'fill',
            gravity: 'face',
            quality: 'auto:good',
          },
        ],
        overwrite: false,
        invalidate: true,
      },
      (error, result) => {
        if (error) {
          console.error('[Cloudinary] Upload error:', error);
          reject(new Error('Failed to upload image to Cloudinary'));
        } else if (result) {
          console.log('[Cloudinary] Upload successful:', result.secure_url);
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        } else {
          reject(new Error('No result from Cloudinary upload'));
        }
      }
    );

    stream.pipe(uploadStream);
  });
  */
}

/**
 * Delete image from Cloudinary
 * DISABLED - No-op function
 */
export async function deleteAvatarFromCloudinary(publicId: string): Promise<void> {
  // Disabled - no operation
  console.log('[Cloudinary] Delete disabled - publicId:', publicId);
  
  /* DISABLED CODE - Uncomment to re-enable
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log('[Cloudinary] Deleted:', publicId);
  } catch (error) {
    console.error('[Cloudinary] Delete error:', error);
  }
  */
}

/**
 * Extract public_id from Cloudinary URL
 * Still functional for URL parsing
 */
export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const match = url.match(/\/v\d+\/(.+)\.(jpg|jpeg|png|webp)/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
