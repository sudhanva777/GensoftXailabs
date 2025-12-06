"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface ProjectReviewFormProps {
  submissionId: string;
  currentStatus: string;
}

export default function ProjectReviewForm({
  submissionId,
  currentStatus,
}: ProjectReviewFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
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
      const response = await fetch("/api/admin/projects/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          action,
          feedback: feedback || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to review project");
      }

      setSuccess(true);
      router.refresh();
      setTimeout(() => {
        router.push("/admin/projects");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to review project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Review Project</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
          Project reviewed successfully! Redirecting...
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Action <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setAction("approve")}
            className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
              action === "approve"
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-green-300"
            }`}
          >
            <CheckCircle
              className={`h-5 w-5 ${action === "approve" ? "text-green-600" : "text-gray-400"}`}
            />
            <span className="font-medium">Approve Project</span>
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
            <span className="font-medium">Reject Project</span>
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
          Feedback (Optional)
        </label>
        <textarea
          id="feedback"
          rows={6}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
          placeholder="Provide feedback to the student..."
        />
        <p className="mt-1 text-xs text-gray-500">
          Feedback is especially helpful when rejecting a project
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !action || currentStatus !== "SUBMITTED"}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            {action === "approve" ? (
              <>
                <CheckCircle size={20} />
                Approve Project
              </>
            ) : (
              <>
                <XCircle size={20} />
                Reject Project
              </>
            )}
          </>
        )}
      </button>

      {currentStatus !== "SUBMITTED" && (
        <p className="text-sm text-gray-500 text-center">
          This project has already been reviewed
        </p>
      )}
    </form>
  );
}

