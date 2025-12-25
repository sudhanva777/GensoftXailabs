"use client";

import { useEffect, useState } from "react";
import { Target, Calendar, CheckCircle } from "lucide-react";

interface Progress {
  progressWeek: number;
  progressPercent: number;
  status: string;
}

export default function StudentProgress() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProgress() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/student/progress");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch progress");
        }

        if (data.success) {
          setProgress(data.progress);
        } else {
          throw new Error("Failed to fetch progress");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load progress");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProgress();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-32 mb-4"></div>
          <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (!progress) {
    return null;
  }

  const statusColor =
    progress.status === "COMPLETED"
      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
      : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/20 dark:to-indigo-900/10 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Target className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Program Progress</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">4 Month Track</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
          {progress.status}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Overall Progress
            </span>
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {progress.progressPercent}%
            </span>
          </div>
          <div className="h-3 bg-indigo-200/50 dark:bg-indigo-900/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-500"
              style={{ width: `${progress.progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2 border-t border-indigo-200/50 dark:border-indigo-800/50">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Week</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {progress.progressWeek}/16
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

