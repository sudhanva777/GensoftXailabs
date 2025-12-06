import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { Calendar, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import AttendanceTable from "./AttendanceTable";

export default async function AttendancePage({
  searchParams,
}: {
  searchParams: { month?: string; year?: string };
}) {
  const session = await requireStudent();

  if (!session.user?.email) {
    return <div>Error: No user email found</div>;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return <div>Error: User not found</div>;
  }

  // Get all attendance records
  const allAttendance = await prisma.attendance.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  // Calculate attendance percentage
  const totalDays = allAttendance.length;
  const presentDays = allAttendance.filter((a) => a.status === "PRESENT").length;
  const attendancePercentage =
    totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  // Filter by month/year if provided
  const month = searchParams.month ? parseInt(searchParams.month) : null;
  const year = searchParams.year ? parseInt(searchParams.year) : null;

  let filteredAttendance = allAttendance;
  if (month && year) {
    filteredAttendance = allAttendance.filter((a) => {
      const date = new Date(a.date);
      return date.getMonth() + 1 === month && date.getFullYear() === year;
    });
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Attendance</h1>
        <p className="text-gray-600">View your attendance records</p>
      </div>

      {/* Attendance Percentage Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm mb-1">Attendance Percentage</p>
            <p className="text-4xl font-bold text-gray-900">{attendancePercentage}%</p>
            <p className="text-sm text-gray-500 mt-1">
              {presentDays} present out of {totalDays} total days
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] rounded-xl">
            <TrendingUp className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      <AttendanceTable
        attendance={filteredAttendance.map((a) => ({
          ...a,
          date: a.date.toISOString(),
          createdAt: a.createdAt.toISOString(),
        }))}
        allAttendance={allAttendance.map((a) => ({
          ...a,
          date: a.date.toISOString(),
          createdAt: a.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}

