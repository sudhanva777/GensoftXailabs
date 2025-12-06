import React from "react";
import { Target, Lightbulb, Users, GraduationCap } from "lucide-react";
import TeamMembers from "@/components/TeamMembers";
import { RadialGlowBackground } from "@/components/SVGBackgrounds";

export default function About() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="section-padding bg-[#F8FAFC] relative overflow-hidden">
        <RadialGlowBackground />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
              About{" "}
              <span className="gradient-text">
                Apex Tech Innovation
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Empowering the next generation of Data Scientists
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Apex Tech Innovation Pvt Ltd is an online-first Data Science training institute focused on teaching practical, job-oriented skills. Students learn through tasks, assignments, and a major project followed by internship-like experience.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe that the best way to learn Data Science is by doing. Our curriculum is designed to bridge the gap between theoretical knowledge and real-world application, ensuring our students are job-ready from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-[#EEF2FF]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-8 text-center">
              <Target size={32} strokeWidth={2} className="text-[#4F46E5] mx-auto mb-4 icon-glow" />
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide practical Data Science education accessible to all students.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-8 text-center">
              <Lightbulb size={32} strokeWidth={2} className="text-[#4F46E5] mx-auto mb-4 icon-glow" />
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To build India's most trusted data-focused training ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Philosophy */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 text-center">
              Our Training Philosophy
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6">
                <GraduationCap size={32} strokeWidth={2} className="text-[#4F46E5] mb-3 icon-glow" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Learn by Doing
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hands-on practice is at the core of our teaching methodology.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6">
                <Lightbulb size={32} strokeWidth={2} className="text-[#4F46E5] mb-3 icon-glow" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {"Practical Tasks > Theory"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We prioritize real-world application over theoretical concepts.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6">
                <Users size={32} strokeWidth={2} className="text-[#4F46E5] mb-3 icon-glow" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Student-Focused Learning
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every student gets personalized attention and support.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6">
                <Target size={32} strokeWidth={2} className="text-[#4F46E5] mb-3 icon-glow" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Outcome-Based Training
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our goal is to make you job-ready, not just certificate-ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-padding bg-[#EEF2FF]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 text-center">
              Who This Is For
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Students</h3>
                <p className="text-gray-600 leading-relaxed">
                  Current students looking to add Data Science skills to their portfolio.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fresh Graduates</h3>
                <p className="text-gray-600 leading-relaxed">
                  Recent graduates seeking to enter the Data Science field.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Switchers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Professionals looking to transition into Data Science careers.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Anyone Wanting Data Science Skills</h3>
                <p className="text-gray-600 leading-relaxed">
                  Anyone with the passion and dedication to learn Data Science.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <TeamMembers />
    </div>
  );
}

