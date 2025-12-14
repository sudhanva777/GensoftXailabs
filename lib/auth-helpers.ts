import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

// Helper to get session without redirects
// Pages should handle redirects themselves using getServerSession directly
export async function getCurrentSession() {
  return getServerSession(authOptions);
}

