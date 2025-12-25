import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { secureErrorResponse } from "@/lib/api-security";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Require admin authentication
    const authResult = await requireAdmin(req);
    if (!authResult.success) {
      return authResult.response;
    }

    // Calculate date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Fetch analytics in parallel
    const [
      totalStudents,
      activeStudents,
      newStudentsLast7Days,
    ] = await Promise.all([
      // Total students
      prisma.user.count({
        where: { role: "STUDENT" },
      }),
      // Active students (with ACTIVE status in StudentProfile)
      prisma.user.count({
        where: {
          role: "STUDENT",
          StudentProfile: {
            status: "ACTIVE",
          },
        },
      }),
      // New students in last 7 days
      prisma.user.count({
        where: {
          role: "STUDENT",
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      }),
    ]);

    // Note: Query/Feedback count would require storing submissions in DB
    // For now, return 0 as placeholder (can be connected later)
    const queriesFeedbackCount = 0;

    return NextResponse.json({
      success: true,
      analytics: {
        totalStudents,
        activeStudents,
        newStudentsLast7Days,
        queriesFeedbackCount,
      },
    });
  } catch (error) {
    return secureErrorResponse(error, "Failed to fetch analytics");
  }
}

