'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'About Us', href: '/#AboutSection' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact Us', href: '/contact-booking' },
  ] as const;

  const services = [
    { name: 'Corporate Tours', href: '/Services' },
    { name: 'School Tours', href: '/Services' },
    { name: 'Group Tours', href: '/Services' },
    { name: 'Solo Travel', href: '/Services' },
    { name: 'Honeymoon Tours', href: '/Services' },
    { name: 'Customized Packages', href: '/Services' },
  ] as const;

  const socialLinks = [
    { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ] as const;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter a valid email.');
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setStatus('Thanks! You’ll receive the best travel deals soon.');
    setEmail('');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStatus(null);
    }, 4000);

    setIsSubmitting(false);
  };

  useEffect(() => {
    const refCopy = timeoutRef.current;
    return () => {
      if (refCopy) clearTimeout(refCopy);
    };
  }, []);

  return (
    <footer className="relative bg-[#0b1320] text-gray-300 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/footer.png"
          alt="Footer background"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
      </div>
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
                info@relaxworld.in
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
          <div>
            <h4 className="text-white font-bold mb-4">About Us</h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Relax Holidays seamlessly connects travelers to memorable experiences and unique tours.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-3">
              Subscribe for the latest travel deals and packages.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-0">
              <input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email for newsletter"
                className="flex-1 px-3 py-2 rounded-l bg-[#1b2234] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 rounded-r hover:bg-blue-600 transition-all text-white font-bold flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
            </form>
            {status && (
              <p
                className={`mt-2 text-sm transition-opacity duration-300 ${
                  status.includes('valid') ? 'text-red-400' : 'text-green-400'
                }`}
                role="alert"
                aria-live="polite"
              >
                {status}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Relax Holidays. All rights reserved.</p>
          <p>
            Website developed by{' '}
            <Link
              href="https://wa.me/8805526198"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors"
            >
              TechMystry
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
