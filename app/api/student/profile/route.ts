import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { phone, programTrack } = await req.json();

    // Update user phone
    await prisma.user.update({
      where: { id: userId },
      data: { phone: phone || null },
    });

    // Update or create student profile
    const existingProfile = await prisma.studentProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      await prisma.studentProfile.update({
        where: { userId },
        data: {
          programTrack: programTrack || null,
        },
      });
    } else {
      await prisma.studentProfile.create({
        data: {
          userId,
          programTrack: programTrack || null,
        },
      });
    }

    return NextResponse.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

