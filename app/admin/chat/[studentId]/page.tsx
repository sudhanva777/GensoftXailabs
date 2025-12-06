import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChatInterface from "./ChatInterface";

export default async function AdminChatPage({
  params,
}: {
  params: { studentId: string };
}) {
  const session = await requireAdmin();

  // Get current admin user
  if (!session.user?.email) {
    return <div>Error: No user email found</div>;
  }

  const admin = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!admin) {
    return <div>Error: Admin not found</div>;
  }

  // Get student
  const student = await prisma.user.findUnique({
    where: { id: params.studentId },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!student || student.role !== "STUDENT") {
    notFound();
  }

  const studentName = student.name || student.email || "Student";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          href="/admin/chat"
          className="text-[#4F46E5] hover:underline mb-4 inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Messages
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#EEF2FF] rounded-lg">
            <User className="h-6 w-6 text-[#4F46E5]" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Chat with {studentName}</h1>
            <p className="text-gray-600">Respond to student messages</p>
          </div>
        </div>
      </div>

      <ChatInterface currentUserId={admin.id} otherUserId={student.id} otherUserName={studentName} />
    </div>
  );
}

