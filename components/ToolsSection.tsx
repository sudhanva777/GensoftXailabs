"use client";

const tools = [
  "Python",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Seaborn",
  "Excel",
  "PowerBI",
  "Jupyter Notebook",
  "Sklearn",
];

export default function ToolsSection() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Tools You Learn
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Master industry-standard tools used by Data Scientists worldwide
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="px-6 py-3 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] text-white rounded-full font-semibold text-sm md:text-base shadow-md hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
