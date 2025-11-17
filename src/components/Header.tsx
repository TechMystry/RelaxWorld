"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plane, Menu, X } from "lucide-react";
import Head from "next/head";

const Header = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "About Us", href: "#AboutSection" },
    { label: "Gallery", href: "#gallery" },
  ];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleContactUs = () => {
    setMenuOpen(false);
    router.push("/contact-booking");
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);
      const element = document.getElementById(href.substring(1));
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      e.preventDefault();
      setMenuOpen(false);
      router.push(href);
    }
  };

  return (
    <>
      <Head>
        <title>Relax Holidays</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header
        className={`fixed sessional top-0 left-0 w-full z-50 transition-colors duration-500 ease-in-out ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md text-gray-900"
            : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-extrabold text-2xl tracking-wide select-none"
            onClick={() => setMenuOpen(false)}
          >
            <Plane
              className={`w-6 h-6 transition-colors ${
                scrolled ? "text-red-600" : "text-red-500 animate-pulse"
              }`}
            />
            <span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                Relax
              </span>
              <span className={scrolled ? "text-gray-800" : "text-white"}>
                {" "}
                Holidays
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10 text-lg font-semibold">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`relative group transition-colors duration-300 ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                <span className="group-hover:text-red-500">{label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={handleContactUs}
              className={`px-5 py-2 rounded-full font-semibold shadow-md transition-transform duration-300 hover:scale-105 ${
                scrolled
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                  : "bg-gradient-to-r from-red-400 to-red-500 text-white"
              }`}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition"
          >
            {menuOpen ? (
              <X className="w-7 h-7 text-red-500" />
            ) : (
              <Menu className="w-7 h-7 text-red-500" />
            )}
          </button>
        </div>

        {/* ✅ Side Drawer Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-md flex flex-col items-start justify-start px-6 pt-24 pb-10 space-y-8 transform transition-transform duration-500 ease-in-out z-40 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 p-3 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-8 h-8 text-red-500" />
          </button>

          {navLinks.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="text-xl font-semibold text-white hover:text-red-500 transition-all duration-300"
              style={{
                animation: menuOpen
                  ? `fadeIn 0.4s ease ${i * 0.1 + 0.2}s forwards`
                  : "none",
              }}
            >
              {label}
            </a>
          ))}

          {/* Mobile Contact Button */}
          <button
            onClick={handleContactUs}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-md hover:scale-105 transition-transform text-lg font-semibold"
          >
            Contact Us
          </button>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </header>
    </>
  );
};

export default Header;
