import Link from "next/link";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Program", href: "/program" },
    { name: "Internship", href: "/internship" },
    { name: "Major Project", href: "/project" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[#0f172a] text-gray-300 border-t border-gray-800/30">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <Logo variant="text" className="mb-4" />
            <p className="text-gray-400 mb-4 leading-relaxed">
              Empowering students with practical Data Science skills through hands-on training and real-world projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <a
                  href="mailto:apextechsolution17@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  apextechsolution17@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <a
                  href="tel:+91-XXXXXXXXXX"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  +91-XXXXXXXXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/30 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Apex Tech Innovation Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

