"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, FileText, X } from "lucide-react";

interface SubmitTaskFormProps {
  taskId: string;
  studentTaskId: string;
  existingSubmission?: {
    id: string;
    answerText: string | null;
    fileUrl: string | null;
    status: string;
    feedback: string | null;
  } | null;
}

export default function SubmitTaskForm({
  taskId,
  studentTaskId,
  existingSubmission,
}: SubmitTaskFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [answerText, setAnswerText] = useState(existingSubmission?.answerText || "");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(
    existingSubmission?.fileUrl || null
  );

  const canSubmit = !existingSubmission || existingSubmission.status === "REJECTED";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/zip",
        "application/x-zip-compressed",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only PDF, ZIP, JPG, and PNG files are allowed");
        return;
      }
      // Validate file size (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!answerText.trim() && !file) {
      setError("Please provide either a text answer or upload a file");
      setIsLoading(false);
      return;
    }

    if (!canSubmit) {
      setError("This task has already been submitted and accepted");
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("taskId", taskId);
      formDataToSend.append("studentTaskId", studentTaskId);
      formDataToSend.append("answerText", answerText);
      if (file) {
        formDataToSend.append("file", file);
      }
      if (existingSubmission) {
        formDataToSend.append("submissionId", existingSubmission.id);
      }

      const response = await fetch("/api/student/tasks/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit task");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit task");
    } finally {
      setIsLoading(false);
    }
  };

  if (!canSubmit && existingSubmission?.status === "ACCEPTED") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-green-800">
          <FileText className="h-5 w-5" />
          <span className="font-semibold">Task Accepted</span>
        </div>
        {existingSubmission.feedback && (
          <p className="text-sm text-green-700 mt-2">{existingSubmission.feedback}</p>
        )}
      </div>
    );
  }

  if (existingSubmission?.status === "REJECTED") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <div className="mb-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-red-800 mb-2">
              <X className="h-5 w-5" />
              <span className="font-semibold">Task Rejected - Please fix and resubmit</span>
            </div>
            {existingSubmission.feedback && (
              <p className="text-sm text-red-700">{existingSubmission.feedback}</p>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="answerText" className="block text-sm font-medium text-gray-700 mb-2">
              Answer <span className="text-red-500">*</span>
            </label>
            <textarea
              id="answerText"
              rows={6}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
              placeholder="Enter your answer or solution..."
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Provide a text answer or upload a file (or both)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Upload (Optional)
            </label>
            {filePreview && !file && (
              <div className="mb-2 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <a
                    href={filePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#4F46E5] hover:underline"
                  >
                    View current file
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            {!filePreview && (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#4F46E5] transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[#4F46E5] hover:text-[#4338ca] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#4F46E5]"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        accept=".pdf,.zip,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, ZIP, JPG, PNG up to 10MB</p>
                </div>
              </div>
            )}
            {file && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-900">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Resubmitting...
              </>
            ) : (
              <>
                <Upload size={20} />
                Resubmit Task
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Submit Task</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="answerText" className="block text-sm font-medium text-gray-700 mb-2">
            Answer <span className="text-red-500">*</span>
          </label>
          <textarea
            id="answerText"
            rows={6}
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            placeholder="Enter your answer or solution..."
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Provide a text answer or upload a file (or both)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File Upload (Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#4F46E5] transition-colors">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-[#4F46E5] hover:text-[#4338ca] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#4F46E5]"
                >
                  <span>Upload a file</span>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept=".pdf,.zip,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF, ZIP, JPG, PNG up to 10MB</p>
            </div>
          </div>
          {file && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-900">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Upload size={20} />
              Submit Task
            </>
          )}
        </button>
      </form>
    </div>
  );
}

