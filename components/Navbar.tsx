"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Program", href: "/program" },
    { name: "Internship", href: "/internship" },
    { name: "Major Project", href: "/project" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const userRole = session?.user ? (session.user as any).role : null;

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo variant="symbol" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "gradient-text font-semibold"
                    : "text-gray-700 hover:gradient-text"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {status === "loading" ? null : !session ? (
              <>
                <Link href="/auth/login" className="text-gray-700 hover:gradient-text font-medium">
                  Login
                </Link>
                <Link href="/contact" className="btn-primary text-sm">
                  Apply Now
                </Link>
              </>
            ) : userRole === "ADMIN" ? (
              <>
                <Link href="/admin" className="btn-primary text-sm">
                  Admin
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm flex items-center gap-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/student" className="btn-primary text-sm">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm flex items-center gap-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-colors duration-200 px-4 py-2 rounded-lg ${
                    pathname === link.href
                      ? "gradient-text font-semibold bg-indigo-50/50"
                      : "text-gray-700 hover:gradient-text"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {status === "loading" ? null : !session ? (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-gray-700 hover:gradient-text font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-primary mx-4 text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Apply Now
                  </Link>
                </>
              ) : userRole === "ADMIN" ? (
                <>
                  <Link
                    href="/admin"
                    className="btn-primary mx-4 text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="mx-4 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/student"
                    className="btn-primary mx-4 text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="mx-4 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
