import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth";

export async function requireStudent() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/login");
  const role = (session.user as any).role;
  if (role !== "STUDENT") redirect("/admin");
  return session;
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/login");
  const role = (session.user as any).role;
  if (role !== "ADMIN") redirect("/student");
  return session;
}

export async function getCurrentSession() {
  return getServerSession(authOptions);
}

