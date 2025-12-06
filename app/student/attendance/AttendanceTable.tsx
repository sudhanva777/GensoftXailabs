"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, CheckCircle, XCircle } from "lucide-react";

interface Attendance {
  id: string;
  date: string;
  status: string;
  createdAt: string;
}

interface AttendanceTableProps {
  attendance: Attendance[];
  allAttendance: Attendance[];
}

export default function AttendanceTable({ attendance, allAttendance }: AttendanceTableProps) {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Get unique months and years from all attendance
  const months = Array.from(
    new Set(
      allAttendance.map((a) => {
        const date = new Date(a.date);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      })
    )
  ).sort()
    .reverse();

  const handleFilter = () => {
    if (selectedMonth) {
      const [year, month] = selectedMonth.split("-");
      router.push(`/student/attendance?month=${month}&year=${year}`);
    } else {
      router.push("/student/attendance");
    }
  };

  const clearFilter = () => {
    setSelectedMonth("");
    setSelectedYear("");
    router.push("/student/attendance");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-[#4F46E5]" />
            Attendance Records
          </h2>
          <div className="flex items-center gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            >
              <option value="">All Months</option>
              {months.map((month) => {
                const [year, monthNum] = month.split("-");
                const date = new Date(parseInt(year), parseInt(monthNum) - 1);
                return (
                  <option key={month} value={month}>
                    {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </option>
                );
              })}
            </select>
            <button
              onClick={handleFilter}
              className="btn-primary text-sm px-4 py-2"
            >
              Filter
            </button>
            {selectedMonth && (
              <button
                onClick={clearFilter}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {attendance.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No attendance records found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === "PRESENT"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.status === "PRESENT" ? (
                        <CheckCircle size={14} />
                      ) : (
                        <XCircle size={14} />
                      )}
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

