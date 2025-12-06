"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { AnimatedWavesBackground } from "./SVGBackgrounds";
import ContactQuickActions from "./ContactQuickActions";

export default function FinalCTA() {
  return (
    <section className="section-padding bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] text-white relative overflow-hidden">
      {/* Soft radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent)]" />
      
      {/* Animated Waves Background */}
      <AnimatedWavesBackground />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
            Start Your Data Science Journey Today
          </h2>
          <p className="text-lg md:text-xl mb-10 text-indigo-100 leading-relaxed">
            Join hundreds of students who have transformed their careers with our practical Data Science program.
          </p>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] hover:bg-gray-50 font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-2xl hover:shadow-white/20 transform hover:scale-[1.02] relative"
              >
                <span className="relative z-10">Apply Now</span>
                <div className="absolute inset-0 bg-white rounded-full" />
              </Link>
              <Link 
                href="/contact" 
                className="bg-transparent border-2 border-white/70 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-full transition-all duration-300 inline-flex items-center justify-center hover:border-white hover:scale-[1.02] shadow-lg"
              >
                <Phone size={20} strokeWidth={2} className="mr-2" />
                Book Counselling
              </Link>
            </div>
            <div className="pt-4">
              <ContactQuickActions />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
