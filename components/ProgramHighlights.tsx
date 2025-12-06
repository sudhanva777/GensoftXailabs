import { Code2, BarChart3, AreaChart, Calculator, Cpu, FolderKanban, ListChecks } from "lucide-react";

const highlights = [
  { icon: Code2, title: "Python", description: "Master Python for data science" },
  { icon: BarChart3, title: "Data Analysis", description: "Analyze real-world datasets" },
  { icon: AreaChart, title: "Visualization", description: "Create stunning visualizations" },
  { icon: Calculator, title: "Statistics", description: "Learn statistical concepts" },
  { icon: Cpu, title: "ML Basics", description: "Introduction to Machine Learning" },
  { icon: FolderKanban, title: "One Major Project", description: "Complete a real-world project" },
  { icon: ListChecks, title: "Internship Tasks", description: "Gain practical experience" },
];

export default function ProgramHighlights() {
  return (
    <section className="section-padding bg-[#FAFAFF]">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Program Highlights
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to become a successful Data Scientist
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="card text-center group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 -z-10" />
              <div className="relative z-10">
                <highlight.icon size={32} strokeWidth={2} className="text-[#4F46E5] mx-auto mb-3 icon-glow" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

