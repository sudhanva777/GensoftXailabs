import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Require authentication for API route
 * Returns user session or null
 */
export async function requireAuth(req: NextRequest): Promise<{
  success: true;
  session: any;
} | {
  success: false;
  response: NextResponse;
}> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  return {
    success: true,
    session,
  };
}

/**
 * Require admin role for API route
 */
export async function requireAdmin(req: NextRequest): Promise<{
  success: true;
  session: any;
} | {
  success: false;
  response: NextResponse;
}> {
  const authResult = await requireAuth(req);

  if (!authResult.success) {
    return authResult;
  }

  const userRole = authResult.session.user.role as string;

  if (userRole !== "ADMIN") {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      ),
    };
  }

  return {
    success: true,
    session: authResult.session,
  };
}

/**
 * Require student role for API route
 */
export async function requireStudent(req: NextRequest): Promise<{
  success: true;
  session: any;
} | {
  success: false;
  response: NextResponse;
}> {
  const authResult = await requireAuth(req);

  if (!authResult.success) {
    return authResult;
  }

  const userRole = authResult.session.user.role as string;

  if (userRole !== "STUDENT") {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Forbidden - Student access required" },
        { status: 403 }
      ),
    };
  }

  return {
    success: true,
    session: authResult.session,
  };
}

