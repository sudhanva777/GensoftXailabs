"use client";

import { useEffect, useState } from "react";
import { Users, UserCheck, TrendingUp, MessageSquare } from "lucide-react";

interface Analytics {
  totalStudents: number;
  activeStudents: number;
  newStudentsLast7Days: number;
  queriesFeedbackCount: number;
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/admin/analytics");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch analytics");
        }

        if (data.success) {
          setAnalytics(data.analytics);
        } else {
          throw new Error("Failed to fetch analytics");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load analytics");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 animate-pulse"
          >
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-24 mb-3"></div>
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg mb-8">
        {error}
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <AnalyticsCard
        icon={Users}
        label="Total Students"
        value={analytics.totalStudents}
        description="All registered students"
        gradient="from-indigo-500/10 to-indigo-600/5"
        iconColor="text-indigo-600 dark:text-indigo-400"
        iconBg="bg-indigo-100 dark:bg-indigo-900/30"
      />
      <AnalyticsCard
        icon={UserCheck}
        label="Active Students"
        value={analytics.activeStudents}
        description="Currently active"
        gradient="from-green-500/10 to-green-600/5"
        iconColor="text-green-600 dark:text-green-400"
        iconBg="bg-green-100 dark:bg-green-900/30"
      />
      <AnalyticsCard
        icon={TrendingUp}
        label="New Students (7d)"
        value={analytics.newStudentsLast7Days}
        description="Joined this week"
        gradient="from-blue-500/10 to-blue-600/5"
        iconColor="text-blue-600 dark:text-blue-400"
        iconBg="bg-blue-100 dark:bg-blue-900/30"
      />
      <AnalyticsCard
        icon={MessageSquare}
        label="Queries / Feedback"
        value={analytics.queriesFeedbackCount}
        description="Total received"
        gradient="from-purple-500/10 to-purple-600/5"
        iconColor="text-purple-600 dark:text-purple-400"
        iconBg="bg-purple-100 dark:bg-purple-900/30"
      />
    </div>
  );
}

function AnalyticsCard({
  icon: Icon,
  label,
  value,
  description,
  gradient,
  iconColor,
  iconBg,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  description: string;
  gradient: string;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <div className={`group bg-gradient-to-br ${gradient} rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 ${iconBg} rounded-lg`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-500">{description}</p>
    </div>
  );
}

