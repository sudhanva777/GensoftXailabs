import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/**
 * Avatar Upload API Route (TEMPORARILY DISABLED)
 * 
 * This endpoint has been disabled.
 * To re-enable:
 * 1. Uncomment the code below
 * 2. Restore Cloudinary imports and configuration
 * 3. Re-enable upload functionality in AvatarUpload.tsx component
 */
export async function POST(req: NextRequest) {
  console.log("[Avatar Upload] Request received - Feature disabled");
  
  return NextResponse.json(
    { 
      success: false, 
      message: "Avatar upload is currently disabled" 
    },
    { status: 503 }
  );
}

/* 
 * DISABLED UPLOAD CODE - Uncomment to re-enable
 * 
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadAvatarToCloudinary, deleteAvatarFromCloudinary, extractPublicIdFromUrl } from "@/lib/cloudinary";
import { avatarUploadRateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  console.log("[Avatar Upload] Request received");
  
  try {
    // Rate limiting - prevent abuse
    const identifier = getRateLimitIdentifier(req);
    const rateLimitResult = await avatarUploadRateLimit.limit(identifier);
    
    if (!rateLimitResult.success) {
      console.log("[Avatar Upload] Rate limit exceeded for:", identifier);
      return NextResponse.json(
        { success: false, message: "Too many upload attempts. Please try again later." },
        { 
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rateLimitResult.reset - Date.now()) / 1000)),
          },
        }
      );
    }

    // Check authentication
    const session = await getServerSession(authOptions);
    console.log("[Avatar Upload] Session check:", session?.user?.email ? "Authenticated" : "Not authenticated");

    if (!session?.user?.email) {
      console.log("[Avatar Upload] Unauthorized access attempt");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, image: true },
    });

    if (!user) {
      console.log("[Avatar Upload] User not found:", session.user.email);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    console.log("[Avatar Upload] User found:", user.id);

    // Parse form data
    const formData = await req.formData();
    console.log("[Avatar Upload] FormData parsed");

    // Get file with key "avatar"
    const file = formData.get("avatar") as File | null;
    console.log("[Avatar Upload] File retrieved:", file ? `Yes (${file.name}, ${file.size} bytes)` : "No");

    // Validate file exists
    if (!file) {
      console.log("[Avatar Upload] No file provided");
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    // Early validation - reject oversized files before processing
    if (file.size > MAX_FILE_SIZE) {
      console.log("[Avatar Upload] File too large:", file.size, "bytes");
      return NextResponse.json(
        { success: false, message: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type || !ALLOWED_TYPES.includes(file.type)) {
      console.log("[Avatar Upload] Invalid file type:", file.type);
      return NextResponse.json(
        { success: false, message: "Invalid file type. Only JPG and PNG are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (double check)
    if (file.size === 0) {
      console.log("[Avatar Upload] File is empty");
      return NextResponse.json(
        { success: false, message: "File is empty" },
        { status: 400 }
      );
    }

    console.log("[Avatar Upload] File validation passed");

    // Upload to Cloudinary (streaming, no full memory buffer)
    console.log("[Avatar Upload] Starting Cloudinary upload...");
    let cloudinaryResult;
    try {
      cloudinaryResult = await uploadAvatarToCloudinary(file, user.id);
      console.log("[Avatar Upload] Cloudinary upload successful:", cloudinaryResult.secure_url);
    } catch (cloudinaryError) {
      console.error("[Avatar Upload] Cloudinary upload failed:", cloudinaryError);
      return NextResponse.json(
        { success: false, message: "Failed to upload image. Please try again." },
        { status: 500 }
      );
    }

    // Delete old avatar from Cloudinary if it exists
    if (user.image) {
      const oldPublicId = extractPublicIdFromUrl(user.image);
      if (oldPublicId) {
        console.log("[Avatar Upload] Deleting old avatar:", oldPublicId);
        await deleteAvatarFromCloudinary(oldPublicId);
      }
    }

    // Update user image URL in database
    console.log("[Avatar Upload] Updating database with new avatar URL");
    await prisma.user.update({
      where: { id: user.id },
      data: { image: cloudinaryResult.secure_url },
    });

    console.log("[Avatar Upload] Avatar update complete:", cloudinaryResult.secure_url);

    return NextResponse.json(
      { 
        success: true, 
        message: "Avatar uploaded successfully",
        avatarUrl: cloudinaryResult.secure_url
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Avatar Upload] Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload avatar" },
      { status: 500 }
    );
  }
}
*/
