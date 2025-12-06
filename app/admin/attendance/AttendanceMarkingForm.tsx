"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Calendar, CheckCircle, XCircle } from "lucide-react";

interface Student {
  id: string;
  name: string | null;
  email: string | null;
}

interface AttendanceMarkingFormProps {
  students: Student[];
}

export default function AttendanceMarkingForm({ students }: AttendanceMarkingFormProps) {
  const router = useRouter();
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState<"PRESENT" | "ABSENT" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    if (!selectedStudent || !status) {
      setError("Please select a student and status");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedStudent,
          date: selectedDate,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to mark attendance");
      }

      setSuccess(true);
      setSelectedStudent("");
      setStatus(null);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark attendance");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
          Attendance marked successfully!
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Student <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            required
          >
            <option value="">Choose a student...</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name || student.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStatus("PRESENT")}
              className={`flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                status === "PRESENT"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-300"
              }`}
            >
              <CheckCircle
                className={`h-5 w-5 ${status === "PRESENT" ? "text-green-600" : "text-gray-400"}`}
              />
              <span className="font-medium">Present</span>
            </button>
            <button
              type="button"
              onClick={() => setStatus("ABSENT")}
              className={`flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                status === "ABSENT"
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-red-300"
              }`}
            >
              <XCircle
                className={`h-5 w-5 ${status === "ABSENT" ? "text-red-600" : "text-gray-400"}`}
              />
              <span className="font-medium">Absent</span>
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !selectedStudent || !status}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Marking...
          </>
        ) : (
          <>
            <Calendar size={20} />
            Mark Attendance
          </>
        )}
      </button>
    </form>
  );
}

