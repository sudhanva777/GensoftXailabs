import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { requireAuth, requireAdmin } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { secureErrorResponse } from "@/lib/api-security";
import { z } from "zod";

export const dynamic = 'force-dynamic';

const updateProgressSchema = z.object({
  progressWeek: z.number().int().min(1).max(16).optional(),
  progressPercent: z.number().int().min(0).max(100).optional(),
  status: z.enum(["ACTIVE", "COMPLETED"]).optional(),
});

// GET - Fetch student progress
export async function GET(req: NextRequest) {
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

    const userId = currentUser.id;

    // Get userId from query params if admin
    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("userId");

    let finalUserId = userId;

    // Admin can view any student's progress
    if (userRole === "ADMIN" && targetUserId) {
      finalUserId = targetUserId;
    } else if (userRole !== "ADMIN" && targetUserId && targetUserId !== userId) {
      // Students can only view their own progress
      return NextResponse.json(
        { error: "Forbidden - You can only view your own progress" },
        { status: 403 }
      );
    }

    // Fetch student profile with progress
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: finalUserId },
      select: {
        progressWeek: true,
        progressPercent: true,
        status: true,
        programTrack: true,
      },
    });

    if (!studentProfile) {
      // Return default values if profile doesn't exist
      return NextResponse.json({
        success: true,
        progress: {
          progressWeek: 1,
          progressPercent: 0,
          status: "ACTIVE",
        },
      });
    }

    return NextResponse.json({
      success: true,
      progress: {
        progressWeek: studentProfile.progressWeek || 1,
        progressPercent: studentProfile.progressPercent || 0,
        status: studentProfile.status || "ACTIVE",
      },
    });
  } catch (error) {
    return secureErrorResponse(error, "Failed to fetch progress");
  }
}

// PATCH - Update student progress
export async function PATCH(req: NextRequest) {
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

    const userId = currentUser.id;

    // Parse and validate request body
    const body = await req.json();
    const validation = updateProgressSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { progressWeek, progressPercent, status } = validation.data;

    // Get userId from body if admin (admin can update any student)
    const targetUserId = body.userId || userId;

    if (userRole !== "ADMIN" && targetUserId !== userId) {
      return NextResponse.json(
        { error: "Forbidden - You can only update your own progress" },
        { status: 403 }
      );
    }

    // Update or create student profile
    const existingProfile = await prisma.studentProfile.findUnique({
      where: { userId: targetUserId },
    });

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (progressWeek !== undefined) updateData.progressWeek = progressWeek;
    if (progressPercent !== undefined) updateData.progressPercent = progressPercent;
    if (status !== undefined) updateData.status = status;

    if (existingProfile) {
      await prisma.studentProfile.update({
        where: { userId: targetUserId },
        data: updateData,
      });
    } else {
      await prisma.studentProfile.create({
        data: {
          id: crypto.randomUUID(),
          userId: targetUserId,
          ...updateData,
          progressWeek: progressWeek || 1,
          progressPercent: progressPercent || 0,
          status: status || "ACTIVE",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Progress updated successfully",
    });
  } catch (error) {
    return secureErrorResponse(error, "Failed to update progress");
  }
}

