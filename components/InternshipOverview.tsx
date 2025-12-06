"use client";

import { Clock4, CheckCircle, FileText, BarChart3, Presentation, Lightbulb, Laptop } from "lucide-react";

const tasks = [
  {
    icon: FileText,
    title: "Data Cleaning",
    description: "Clean and preprocess real datasets",
  },
  {
    icon: BarChart3,
    title: "EDA",
    description: "Perform exploratory data analysis",
  },
  {
    icon: Presentation,
    title: "Visualization Dashboards",
    description: "Create interactive dashboards",
  },
  {
    icon: FileText,
    title: "Reports",
    description: "Write comprehensive analysis reports",
  },
  {
    icon: Lightbulb,
    title: "Insights Presentation",
    description: "Present findings to stakeholders",
  },
];

export default function InternshipOverview() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              How Internship Works
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              After the training, students enter the internship phase where they perform real tasks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card text-center">
              <Clock4 size={32} strokeWidth={2} className="text-[#4F46E5] mx-auto mb-3 icon-glow" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Duration</h3>
              <p className="text-gray-600">2–8 weeks</p>
            </div>
            <div className="card text-center">
              <FileText size={32} strokeWidth={2} className="text-[#4F46E5] mx-auto mb-3 icon-glow" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Weekly Tasks</h3>
              <p className="text-gray-600">Assigned and reviewed regularly</p>
            </div>
            <div className="card text-center">
              <Laptop size={32} strokeWidth={2} className="text-[#4F46E5] mx-auto mb-3 icon-glow" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Remote/Online</h3>
              <p className="text-gray-600">Work from anywhere</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Example Tasks
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, index) => (
                <div key={index} className="card">
                  <task.icon size={32} strokeWidth={2} className="text-[#4F46E5] mb-3 icon-glow" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {task.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{task.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200/50 shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Certification Rules (IMPORTANT)
            </h3>
            <p className="text-gray-700 mb-4">
              Certificate is awarded ONLY if:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-6 w-6 text-[#4F46E5] mt-0.5 flex-shrink-0 icon-glow-pulse" />
                <span className="text-gray-700">1 major project is submitted</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-6 w-6 text-[#4F46E5] mt-0.5 flex-shrink-0 icon-glow-pulse" />
                <span className="text-gray-700">Student meets attendance requirement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
