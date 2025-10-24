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
    { label: "About Us", href: "#AboutSection" },  // NOTE this matches id on AboutUs section
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

  // Navigate to Contact Booking page
  const handleContactUs = () => {
    setMenuOpen(false);
    router.push("/contact-booking");
  };

  // Handle nav link click for smooth scroll or navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg text-gray-900"
            : "bg-gradient-to-b from-black/50 via-black/25 to-transparent text-white"
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
                scrolled ? "text-orange-500" : "text-yellow-300 animate-pulse"
              }`}
            />
            <span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500">
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
                <span className="group-hover:text-yellow-400">{label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-yellow-300 to-orange-400 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={handleContactUs}
              className={`px-5 py-2 rounded-full font-semibold shadow-md transition-transform duration-300 hover:scale-105 ${
                scrolled
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                  : "bg-gradient-to-r from-yellow-300 to-orange-400 text-gray-900"
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
              <X className="w-7 h-7 text-yellow-400" />
            ) : (
              <Menu className="w-7 h-7 text-yellow-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center space-y-10 transition-all duration-500 ease-in-out ${
            menuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          {navLinks.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="text-3xl font-semibold text-white hover:text-yellow-400 transition-all"
              style={{
                animation: menuOpen
                  ? `fadeIn 0.5s ease ${i * 0.1 + 0.2}s forwards`
                  : "none",
              }}
            >
              {label}
            </a>
          ))}

          {/* Mobile Contact Button */}
          <button
            onClick={handleContactUs}
            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-md hover:scale-105 transition-all text-xl font-semibold"
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
