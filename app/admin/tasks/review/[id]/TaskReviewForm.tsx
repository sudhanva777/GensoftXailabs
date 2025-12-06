"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface TaskReviewFormProps {
  submissionId: string;
  currentStatus: string;
  studentTaskId: string;
  taskId: string;
}

export default function TaskReviewForm({
  submissionId,
  currentStatus,
  studentTaskId,
  taskId,
}: TaskReviewFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [action, setAction] = useState<"accept" | "reject" | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    if (!action) {
      setError("Please select an action");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/tasks/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          action,
          feedback: feedback || null,
          studentTaskId,
          taskId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to review task");
      }

      setSuccess(true);
      router.refresh();
      setTimeout(() => {
        router.push("/admin/tasks/review");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to review task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Review Task</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
          Task reviewed successfully! Redirecting...
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Action <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setAction("accept")}
            className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
              action === "accept"
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-green-300"
            }`}
          >
            <CheckCircle
              className={`h-5 w-5 ${action === "accept" ? "text-green-600" : "text-gray-400"}`}
            />
            <span className="font-medium">Accept Task</span>
          </button>
          <button
            type="button"
            onClick={() => setAction("reject")}
            className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
              action === "reject"
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-red-300"
            }`}
          >
            <XCircle
              className={`h-5 w-5 ${action === "reject" ? "text-red-600" : "text-gray-400"}`}
            />
            <span className="font-medium">Reject Task</span>
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
          Feedback {action === "reject" && <span className="text-red-500">*</span>}
        </label>
        <textarea
          id="feedback"
          rows={6}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
          placeholder="Provide feedback to the student..."
          required={action === "reject"}
        />
        <p className="mt-1 text-xs text-gray-500">
          Feedback is required when rejecting a task
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !action || currentStatus !== "PENDING"}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            {action === "accept" ? (
              <>
                <CheckCircle size={20} />
                Accept Task
              </>
            ) : (
              <>
                <XCircle size={20} />
                Reject Task
              </>
            )}
          </>
        )}
      </button>

      {currentStatus !== "PENDING" && (
        <p className="text-sm text-gray-500 text-center">
          This task has already been reviewed
        </p>
      )}
    </form>
  );
}

