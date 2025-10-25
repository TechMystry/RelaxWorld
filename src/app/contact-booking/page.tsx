'use client';

/* eslint-disable */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Users,
  Calendar,
  CheckCircle,
  X,
  ArrowLeft,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormData {
  organizationType: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  groupSize: string;
  destination: string;
  travelDate: string;
  message: string;
  honeypot: string;
}

interface Errors {
  [key: string]: string | null;
}

const FORMCARRY_ENDPOINT = 'https://formcarry.com/s/rVz9oG79OaR';

const destinations = [
  'Individual Trip',
  'Shimla - Manali (Himachal)',
  'Kerala Tour',
  'Rajasthan (Ajmer - Pushkar - Udaipur - Jaipur)',
  'Vishakhapatnam',
  'Hyderabad - Ramoji - Wonderla',
  'Mahabaleshwar - Pratapgarh - Raigadh',
  'Nagpur - Tadoba',
  'Kevadia (Statue of Unity)',
  'Amritsar - Delhi - Jaipur - Agra',
  'Bangalore - Mysore - Wonderla',
  'Bangalore - Mysore - Ooty - Coonoor',
  'Daman',
  'Goa Beach Tour',
  'Golden Triangle (Delhi - Jaipur - Agra)',
  'Mahabaleshwar - Imagica - Lonavala',
  'Custom Package',
] as const;

export default function ContactBooking() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const [formData, setFormData] = useState<FormData>({
    organizationType: 'school',
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    groupSize: '',
    destination: '',
    travelDate: '',
    message: '',
    honeypot: '',
  });

  // Auto-close popup after 3 seconds
  useEffect(() => {
    if (!showPopup) return;
    const timer = setTimeout(() => {
      setShowPopup(false);
      setFormData({
        organizationType: 'school',
        organizationName: '',
        contactPerson: '',
        email: '',
        phone: '',
        groupSize: '',
        destination: '',
        travelDate: '',
        message: '',
        honeypot: '',
      });
      setErrors({});
    }, 3000);
    return () => clearTimeout(timer);
  }, [showPopup]);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.organizationType) newErrors.organizationType = 'Organization type is required';
    if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?\d{10,15}$/.test(cleanPhone)) {
      newErrors.phone = 'Invalid phone number (10-15 digits)';
    }

    if (!formData.groupSize) {
      newErrors.groupSize = 'Group size is required';
    } else if (parseInt(formData.groupSize) < 1) {
      newErrors.groupSize = 'Group size must be at least 1';
    }

    if (!formData.destination) newErrors.destination = 'Destination is required';
    if (formData.honeypot.trim()) return false; // Bot detected

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const formDataToSend = new FormData(e.currentTarget);

    try {
      const response = await fetch(FORMCARRY_ENDPOINT, {
        method: 'POST',
        body: formDataToSend,
        headers: { Accept: 'application/json' },
      });

      const result = await response.json();

      if (response.ok && result.code === 200) {
        setShowPopup(true);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to send. Please email us at info@relaxholidays.com' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact-booking" className="relative py-20 bg-gray-50 overflow-hidden min-h-screen">
        {/* Background Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-20">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur text-gray-900 font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 border border-white/50 hover:border-red-200 mb-8 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Back to home page"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-full mb-4">
              Get in Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book Your{' '}
              <span className="font-signature text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                Journey
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Special packages for schools, colleges, corporate groups, and individual trips.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: Phone,
                    title: 'Call Us',
                    desc: 'Available 12/7 for bookings and support',
                    links: ['+91 94040 14786', '+91 88559 94999'],
                    href: (num: string) => `tel:${num.replace(/\s/g, '')}`,
                  },
                  {
                    icon: Mail,
                    title: 'Email Us',
                    desc: 'Get response within 24 hours',
                    links: ['info@relaxholidays.com', 'bookings@relaxholidays.com'],
                    href: (email: string) => `mailto:${email}`,
                  },
                  {
                    icon: MapPin,
                    title: 'Visit Office',
                    desc: '12/7 Availability',
                    content: 'Pune, Maharashtra, India 411028',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-2">{item.desc}</p>
                        {item.links ? (
                          <div>
                            {item.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={item.href(link)}
                                className="block text-red-600 font-semibold hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-700 font-medium">{item.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why Book */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-red-600 mb-6">Why Book With Us?</h3>
                <ul className="space-y-4">
                  {[
                    'Special student, corporate & individual discounts',
                    '1 teacher complimentary for every 25 students',
                    'Group insurance policy included',
                    'Safe & secure travel arrangements',
                    'Experienced tour coordinators',
                    'Owned by Dastagir Khan',
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-red-600">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <AnimatePresence>
                {showPopup && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowPopup(false)}
                    role="dialog"
                    aria-modal="true"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                      className="bg-white rounded-2xl p-8 max-w-md w-full relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setShowPopup(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label="Close success message"
                      >
                        <X className="w-6 h-6" />
                      </button>
                      <div className="text-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-12 h-12 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-gray-600">Your request has been submitted.</p>
                        <p className="text-sm text-gray-500 mt-2">We’ll contact you within 24 hours.</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="absolute left-[-9999px]"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Organization Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Organization Type *
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  >
                    {['school', 'college', 'corporate', 'group', 'individual'].map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() +
                          type.slice(1).replace('corporate', 'Corporate / IT Firm').replace('group', 'Group Travel')}
                      </option>
                    ))}
                  </select>
                  {errors.organizationType && (
                    <p className="text-red-500 text-xs mt-1">{errors.organizationType}</p>
                  )}
                </div>

                {/* Name & Contact */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      placeholder="School/College/Company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                    />
                    {errors.organizationName && (
                      <p className="text-red-500 text-xs mt-1">{errors.organizationName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                    />
                    {errors.contactPerson && (
                      <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>
                    )}
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 94040 14786"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Group Size & Destination */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <Users className="w-4 h-4 inline mr-1" /> Group Size *
                    </label>
                    <input
                      type="number"
                      name="groupSize"
                      value={formData.groupSize}
                      onChange={handleChange}
                      min="1"
                      placeholder="25"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                    />
                    {errors.groupSize && (
                      <p className="text-red-500 text-xs mt-1">{errors.groupSize}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Destination *
                    </label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                    >
                      <option value="">Select destination</option>
                      {destinations.map((dest) => (
                        <option key={dest} value={dest}>
                          {dest}
                        </option>
                      ))}
                    </select>
                    {errors.destination && (
                      <p className="text-red-500 text-xs mt-1">{errors.destination}</p>
                    )}
                  </div>
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" /> Preferred Travel Date
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Additional Requirements
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Budget, special requests, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Submit booking request"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Sending...' : 'Request Quote Now'}
                </button>

                {errors.submit && (
                  <p className="text-red-500 text-center text-sm" role="alert">
                    {errors.submit}
                  </p>
                )}

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our Terms & Privacy Policy.
                </p>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Global Styles */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
          .font-signature {
            font-family: 'Great Vibes', cursive;
            font-size: 1.5em;
          }
          .bg-gray-50::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url('/world-map-bg.png') center/cover no-repeat;
            opacity: 0.06;
            z-index: 0;
            pointer-events: none;
          }
        `}</style>
      </section>
    </>
  );
}