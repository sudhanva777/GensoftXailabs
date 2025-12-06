import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { RadialGlowBackground } from "@/components/SVGBackgrounds";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog",
  description: "Insights, tips, and guides for aspiring Data Scientists",
};

export default function Blog() {
  const allPosts = getAllPosts();

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="section-padding bg-[#F8FAFC] relative overflow-hidden">
        <RadialGlowBackground />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Insights, tips, and guides for aspiring Data Scientists
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-custom">
          <BlogClient posts={allPosts} />
        </div>
      </section>
    </div>
  );
}
