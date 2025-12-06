"use client";

import { ClipboardCheck, UserPlus, BookOpen, FolderKanban, Briefcase, GraduationCap, Briefcase as JobIcon } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Apply",
    description: "Submit your application",
  },
  {
    icon: UserPlus,
    title: "Join the Program",
    description: "Get onboarded and set up",
  },
  {
    icon: BookOpen,
    title: "Learn + Weekly Tasks",
    description: "Complete weekly assignments",
  },
  {
    icon: FolderKanban,
    title: "One Major Project",
    description: "Build your portfolio project",
  },
  {
    icon: Briefcase,
    title: "Internship Tasks",
    description: "Gain real-world experience",
  },
  {
    icon: GraduationCap,
    title: "Certification",
    description: "Receive your certificate",
  },
  {
    icon: JobIcon,
    title: "Job Applications",
    description: "Start your career journey",
  },
];

export default function StudentJourney() {
  return (
    <section className="section-padding bg-[#EEF2FF]">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Your Student Journey
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            From application to job-ready Data Scientist
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Mobile: Horizontal scroll */}
          <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-4 min-w-max">
              {steps.map((step, index) => (
                <div key={index} className="flex-shrink-0 w-64">
                  <div className="card text-center h-full">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                        <step.icon size={32} strokeWidth={2} className="text-white" />
                      </div>
                      <div className="px-3 py-1 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] text-white text-xs font-bold rounded-full mb-2">
                        Step {index + 1}
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden lg:grid grid-cols-7 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] opacity-20 -z-10" style={{ width: 'calc(100% - 1.5rem)' }} />
                )}
                
                <div className="card text-center h-full">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                      <step.icon size={32} strokeWidth={2} className="text-white" />
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] text-white text-xs font-bold rounded-full mb-2">
                      Step {index + 1}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
