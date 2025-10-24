"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  // Quick links
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "About Us", href: "/#AboutSection" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact Us", href: "/contact-booking" },
  ];

  // Services: all go to /services
  const services = [
    { name: "Corporate Tours", href: "/Services" },
    { name: "School Tours", href: "/Services" },
    { name: "Group Tours", href: "/Services" },
    { name: "Solo Travel", href: "/Services" },
    { name: "Honeymoon Tours", href: "/Services" },
    { name: "Customized Packages", href: "/Services" },
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email.");
      return;
    }
    setStatus("Thanks! We’ll send you the best travel deals.");
    setEmail("");
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919404014786"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-10 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.52 3.48C18.1 1.05 14.5 0 11 0 4.92 0 0 4.92 0 11c0 1.93.63 3.72 1.7 5.19L0 24l7.9-2.07c1.42.77 3.03 1.24 4.6 1.24 6.08 0 11-4.92 11-11 0-3.5-1.05-7.1-3.98-9.69zm-9.5 18.25c-1.38 0-2.74-.36-3.94-1.04l-.28-.17-4.67 1.22 1.25-4.55-.18-.29c-.9-1.41-1.37-3.03-1.37-4.7 0-5.17 4.23-9.4 9.4-9.4 2.51 0 4.87.98 6.63 2.74 1.76 1.76 2.74 4.12 2.74 6.63 0 5.17-4.23 9.4-9.4 9.4zm5.27-7.37c-.28-.14-1.64-.81-1.89-.91-.25-.1-.43-.14-.61.14-.18.28-.69.91-.84 1.1-.15.18-.3.2-.55.07-.25-.14-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.28.37-.42.12-.14.16-.25.25-.42.08-.18.04-.33-.02-.47-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.15-.01-.33-.01-.51-.01-.18 0-.47.07-.72.34-.25.28-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.94 2.97 4.7 4.15 3.27 1.36 3.27.91 3.87.86.59-.05 1.91-.78 2.18-1.53.27-.75.27-1.39.19-1.52-.08-.13-.25-.2-.53-.34z" />
        </svg>
      </a>

      {/* Footer */}
      <footer className="relative bg-[#0b1320] text-gray-300 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/footer.png"
            alt="Footer background"
            fill
            className="object-cover opacity-60"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0b1320]/70" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 z-10">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Email</p>
                <a
                  href="mailto:info@relaxholidays.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  info@relaxholidays.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Call us</p>
                <p>+91 94040 14786</p>
                <p>+91 88559 94999</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Head Office</p>
                <p>Pune, Maharashtra</p>
                <p>India - 411028</p>
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* About Us */}
            <div>
              <h4 className="text-white font-bold mb-4">About Us</h4>
              <p className="text-sm text-gray-400 mb-4">
                Relax Holidays seamlessly connects travelers to memorable
                experiences and unique tours.
              </p>
              <div className="flex gap-3">
                <Link href="https://facebook.com" target="_blank">
                  <Facebook className="w-5 h-5 hover:text-white transition-colors" />
                </Link>
                <Link href="https://twitter.com" target="_blank">
                  <Twitter className="w-5 h-5 hover:text-white transition-colors" />
                </Link>
                <Link href="https://instagram.com" target="_blank">
                  <Instagram className="w-5 h-5 hover:text-white transition-colors" />
                </Link>
                <Link href="https://linkedin.com" target="_blank">
                  <Linkedin className="w-5 h-5 hover:text-white transition-colors" />
                </Link>
                <Link href="https://youtube.com" target="_blank">
                  <Youtube className="w-5 h-5 hover:text-white transition-colors" />
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                {services.map((service, i) => (
                  <li key={i}>
                    <Link
                      href={service.href}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-3">
                Subscribe for the latest travel deals and packages.
              </p>
              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-l bg-[#1b2234] text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="px-4 py-2 bg-blue-500 rounded-r hover:bg-blue-600 transition-colors">
                  →
                </button>
              </form>
              {status && <p className="mt-2 text-green-400 text-sm">{status}</p>}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
            <p>© {new Date().getFullYear()} Relax Holidays. All rights reserved.</p>
            <p>
              Website developed by{" "}
              <Link
                href="https://wa.me/8805526198"
                target="_blank"
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                TechMystry
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
