import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { FolderKanban, Upload, FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import ProjectSubmissionForm from "./ProjectSubmissionForm";

export default async function ProjectPage() {
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

  const submission = await prisma.projectSubmission.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "UNDER_REVIEW":
        return "bg-blue-100 text-blue-800";
      case "SUBMITTED":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="h-5 w-5" />;
      case "REJECTED":
        return <XCircle className="h-5 w-5" />;
      case "UNDER_REVIEW":
        return <Clock className="h-5 w-5" />;
      case "SUBMITTED":
        return <Clock className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Major Project</h1>
        <p className="text-gray-600">Submit your major project for review</p>
      </div>

      {!submission || submission.status === "NOT_SUBMITTED" ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit Your Project</h2>
            <p className="text-gray-600">
              Upload your project files (PDF or ZIP) and provide details about your work.
            </p>
          </div>
          <ProjectSubmissionForm />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FolderKanban className="h-8 w-8 text-[#4F46E5]" />
                <h2 className="text-2xl font-bold text-gray-900">Project Submission</h2>
              </div>
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                  submission.status
                )}`}
              >
                {getStatusIcon(submission.status)}
                {submission.status.replace("_", " ")}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <p className="text-gray-900 font-semibold">{submission.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <p className="text-gray-600 whitespace-pre-wrap">{submission.description}</p>
              </div>

              {submission.fileUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project File
                  </label>
                  <a
                    href={submission.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#4F46E5] hover:underline"
                  >
                    <FileText size={20} />
                    <span>View/Download Project File</span>
                  </a>
                </div>
              )}

              {submission.githubRepo && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Repository
                  </label>
                  <a
                    href={submission.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4F46E5] hover:underline"
                  >
                    {submission.githubRepo}
                  </a>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submitted At
                  </label>
                  <p className="text-gray-600">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </p>
                </div>
                {submission.reviewedAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reviewed At
                    </label>
                    <p className="text-gray-600">
                      {new Date(submission.reviewedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {submission.feedback && (
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{submission.feedback}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

