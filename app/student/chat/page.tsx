import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MessageCircle } from "lucide-react";
import ChatInterface from "./ChatInterface";

export default async function StudentChatPage() {
  const session = await getServerSession(authOptions);

  const sessionUser = session?.user;
  if (!sessionUser) redirect("/auth/login");
  if (sessionUser.role !== "STUDENT") redirect("/admin");

  if (!sessionUser.email) {
    return <div>Error: No user email found</div>;
  }

  const user = await prisma.user.findUnique({
    where: { email: sessionUser.email },
    select: { id: true },
  });

  if (!user) {
    return <div>Error: User not found</div>;
  }

  // Get all admins
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true, name: true, email: true },
  });

  if (admins.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-12 text-center">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Admins Available</h2>
          <p className="text-gray-600">There are no administrators available to chat with.</p>
        </div>
      </div>
    );
  }

  // Use the first admin as the default receiver
  const adminId = admins[0].id;
  const adminName = admins[0].name || admins[0].email || "Admin";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Chat with Admin</h1>
        <p className="text-gray-600">Send messages to your administrator</p>
      </div>

      <ChatInterface currentUserId={user.id} otherUserId={adminId} otherUserName={adminName} />
    </div>
  );
}

