import Link from "next/link";
import { DocumentArrowDownIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { School, UserCheck, FolderKanban, BadgeCheck } from "lucide-react";
import { RadialGlowBackground } from "./SVGBackgrounds";

export default function Hero() {
  const highlights = [
    { text: "100% Practical Learning", icon: School },
    { text: "Beginner Friendly", icon: UserCheck },
    { text: "One Major Project", icon: FolderKanban },
    { text: "Internship Certificate", icon: BadgeCheck },
  ];

  return (
    <section className="relative bg-[#F8FAFC] section-padding overflow-hidden">
      {/* SVG Radial Glow Background */}
      <RadialGlowBackground />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#EEF2FF] rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-32 h-32 bg-[#EEF2FF] rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-[#EEF2FF] rounded-full blur-3xl animate-float opacity-45" style={{ animationDelay: '4s' }} />
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Become a Job-Ready{" "}
            <span className="gradient-text">
              Data Scientist
            </span>{" "}
            in 1–3 Months
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            Apex Tech Innovation Pvt Ltd provides structured, hands-on Data Science training with one major real-world project and an internship experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/contact" 
              className="btn-primary inline-flex items-center justify-center"
            >
              Apply Now
            </Link>
            <Link 
              href="#syllabus" 
              className="btn-secondary inline-flex items-center justify-center"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Download Syllabus
            </Link>
            <Link 
              href="/contact" 
              className="bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] inline-flex items-center justify-center hover:border-indigo-300"
            >
              <PhoneIcon className="h-5 w-5 mr-2" />
              Book Counselling Call
            </Link>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="card text-center"
              >
                <highlight.icon size={32} strokeWidth={2} className="text-[#4F46E5] mx-auto mb-3 icon-glow animate-float" style={{ animationDelay: `${index * 0.5}s` }} />
                <p className="text-sm md:text-base font-semibold text-gray-700">
                  {highlight.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

