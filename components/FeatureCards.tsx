import { School, BookOpen, Clock, Briefcase, Users, DollarSign } from "lucide-react";

const features = [
  {
    icon: School,
    title: "Hands-on Real Learning",
    description: "Learn by doing with practical tasks and real-world datasets.",
  },
  {
    icon: BookOpen,
    title: "Industry-Relevant Curriculum",
    description: "Curriculum designed to match current industry requirements.",
  },
  {
    icon: Clock,
    title: "1–3 Month Structured Tracks",
    description: "Flexible duration options to fit your schedule and goals.",
  },
  {
    icon: Briefcase,
    title: "Internship Included",
    description: "Gain real experience through our internship program.",
  },
  {
    icon: Users,
    title: "Personal Mentor Support",
    description: "Get guidance from experienced mentors throughout your journey.",
  },
  {
    icon: DollarSign,
    title: "Affordable & Student Friendly",
    description: "Quality education at prices accessible to all students.",
  },
];

export default function FeatureCards() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We provide the best learning experience for aspiring Data Scientists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card text-center group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Subtle gradient border on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 -z-10" />
              <div className="relative z-10">
                <feature.icon size={32} strokeWidth={2} className="text-[#4F46E5] mx-auto mb-4 icon-glow" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

