import InternshipOverview from "@/components/InternshipOverview";
import Link from "next/link";
import { RadialGlowBackground, AnimatedWavesBackground } from "@/components/SVGBackgrounds";

export default function Internship() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="section-padding bg-[#F8FAFC] relative overflow-hidden">
        <RadialGlowBackground />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
              Internship{" "}
              <span className="gradient-text">
                Experience
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              After the training, students enter the internship phase where they perform real tasks.
            </p>
          </div>
        </div>
      </section>

      {/* Internship Overview */}
      <InternshipOverview />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent)]" />
        <AnimatedWavesBackground />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white drop-shadow-lg">
              Ready to Start Your Internship?
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Complete the training program first, then begin your internship journey with real-world tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/program"
                className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] hover:bg-gray-50 font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-2xl hover:shadow-white/20 transform hover:scale-[1.02] inline-block relative"
              >
                <span className="relative z-10">View Training Program</span>
                <div className="absolute inset-0 bg-white rounded-full" />
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white/80 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-full transition-all duration-300 inline-flex items-center justify-center hover:border-white hover:scale-105 shadow-lg"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
