import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { secureErrorResponse } from "@/lib/api-security";
import { z } from "zod";
import { sanitizeText } from "@/lib/api-security";

export const dynamic = 'force-dynamic';

const createNotificationSchema = z.object({
  userId: z.string().uuid().optional(), // Optional for admin to send to specific user
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
});

// GET - Fetch notifications for current user
export async function GET(req: NextRequest) {
  try {
    const authResult = await requireAuth(req);
    if (!authResult.success) {
      return authResult.response;
    }

    // Get user ID from database
    const currentUser = await prisma.user.findUnique({
      where: { email: authResult.session.user.email! },
      select: { id: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const userId = currentUser.id;
    const userRole = authResult.session.user.role as string;

    // Get query params
    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const limit = parseInt(searchParams.get("limit") || "50");

    // Build where clause
    const where: any = { userId };
    if (unreadOnly) {
      where.isRead = false;
    }

    // Fetch notifications
    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        message: true,
        isRead: true,
        createdAt: true,
      },
    });

    // Count unread notifications
    const unreadCount = await prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    return secureErrorResponse(error, "Failed to fetch notifications");
  }
}

// POST - Create notification (admin only, or system-generated)
export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAuth(req);
    if (!authResult.success) {
      return authResult.response;
    }

    const session = authResult.session;
    const userRole = session.user.role as string;
    
    // Get user ID from database
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const currentUserId = currentUser.id;

    // Parse and validate body
    const body = await req.json();
    const validation = createNotificationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { userId: targetUserId, title, message } = validation.data;

    // Sanitize inputs
    const sanitizedTitle = sanitizeText(title, 200);
    const sanitizedMessage = sanitizeText(message, 1000);

    // Determine target user
    let finalUserId = targetUserId || currentUserId;

    // If admin specified userId, use it; otherwise send to current user
    // Admin can send to any user
    if (userRole !== "ADMIN" && targetUserId && targetUserId !== currentUserId) {
      return NextResponse.json(
        { error: "Forbidden - You can only create notifications for yourself" },
        { status: 403 }
      );
    }

    // Create notification
    const notification = await prisma.notification.create({
      data: {
        id: crypto.randomUUID(),
        userId: finalUserId,
        title: sanitizedTitle,
        message: sanitizedMessage,
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      notification,
      message: "Notification created successfully",
    }, { status: 201 });
  } catch (error) {
    return secureErrorResponse(error, "Failed to create notification");
  }
}

