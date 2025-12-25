import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { secureErrorResponse } from "@/lib/api-security";
import { z } from "zod";

export const dynamic = 'force-dynamic';

const markReadSchema = z.object({
  notificationId: z.string().uuid().optional(), // If not provided, mark all as read
});

// PATCH - Mark notification(s) as read
export async function PATCH(req: NextRequest) {
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

    // Parse body
    const body = await req.json().catch(() => ({}));
    const validation = markReadSchema.safeParse(body);

    if (!validation.success && Object.keys(body).length > 0) {
      return NextResponse.json(
        { error: "Invalid notification ID format" },
        { status: 400 }
      );
    }

    const { notificationId } = validation.data || {};

    if (notificationId) {
      // Mark specific notification as read
      const notification = await prisma.notification.findUnique({
        where: { id: notificationId },
      });

      if (!notification) {
        return NextResponse.json(
          { error: "Notification not found" },
          { status: 404 }
        );
      }

      // Verify ownership
      if (notification.userId !== userId) {
        return NextResponse.json(
          { error: "Forbidden - You can only mark your own notifications as read" },
          { status: 403 }
        );
      }

      await prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true },
      });

      return NextResponse.json({
        success: true,
        message: "Notification marked as read",
      });
    } else {
      // Mark all notifications as read
      await prisma.notification.updateMany({
        where: {
          userId,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: "All notifications marked as read",
      });
    }
  } catch (error) {
    return secureErrorResponse(error, "Failed to update notification");
  }
}

