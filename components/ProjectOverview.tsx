"use client";

import { FolderKanban, Lightbulb, BarChart3, Presentation, Cpu, FileText, CheckCircle } from "lucide-react";

const requirements = [
  {
    icon: FolderKanban,
    title: "Choose a Real Dataset",
    description: "Select a dataset relevant to your interests",
  },
  {
    icon: Lightbulb,
    title: "Define a Problem",
    description: "Identify the business problem to solve",
  },
  {
    icon: BarChart3,
    title: "Perform Full EDA",
    description: "Comprehensive exploratory data analysis",
  },
  {
    icon: Presentation,
    title: "Apply Visualization",
    description: "Create meaningful visualizations",
  },
  {
    icon: Cpu,
    title: "Build ML Model (Optional)",
    description: "Implement simple machine learning models",
  },
  {
    icon: FileText,
    title: "Write Full Report",
    description: "Document your entire project journey",
  },
];

const submissions = [
  "Notebook (Jupyter/IPython)",
  "Report PDF",
  "Presentation Slides",
];

export default function ProjectOverview() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Major Project (Mandatory for Certification)
            </h2>
            <p className="text-lg text-gray-600">
              Every learner must complete one major project to receive their Data Science certificate.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Project Requirements
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {requirements.map((req, index) => (
                <div key={index} className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6">
                  <req.icon size={32} strokeWidth={2} className="text-[#4F46E5] mb-3 icon-glow" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {req.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{req.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Submission Includes
              </h3>
              <ul className="space-y-3">
                {submissions.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle size={20} strokeWidth={2} className="text-[#4F46E5] mt-0.5 flex-shrink-0 icon-glow" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200/50 shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Certification Depends On
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle size={24} strokeWidth={2} className="text-[#4F46E5] mt-0.5 flex-shrink-0 icon-glow-pulse" />
                  <span className="text-gray-700">Major project submission</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={24} strokeWidth={2} className="text-[#4F46E5] mt-0.5 flex-shrink-0 icon-glow-pulse" />
                  <span className="text-gray-700">Attendance requirement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
