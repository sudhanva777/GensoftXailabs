"use client";

import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ContactQuickActions() {
  // TODO: Replace with actual phone number
  const phoneNumber = "+91XXXXXXXXXX";
  const whatsappNumber = "91XXXXXXXXXX";
  const whatsappMessage = "Hi%20Apex%20Tech,%20I%20am%20interested%20in%20your%20Data%20Science%20program.";

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link
        href={`tel:${phoneNumber}`}
        className="group flex items-center gap-3 px-6 py-4 bg-white border-2 border-transparent bg-clip-padding rounded-full font-semibold text-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 transform hover:scale-[1.05] relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(white, white), linear-gradient(to right, #4F46E5, #6366F1, #3B82F6)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <Phone size={20} strokeWidth={2} className="text-[#4F46E5] group-hover:scale-110 transition-transform duration-300" />
        <span>Call Us</span>
      </Link>

      <Link
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 transform hover:scale-[1.05]"
      >
        <MessageCircle size={20} strokeWidth={2} className="group-hover:scale-110 transition-transform duration-300" />
        <span>Chat on WhatsApp</span>
      </Link>
    </div>
  );
}

