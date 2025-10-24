'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Users, Calendar, CheckCircle, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
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
  // Honeypot for spam protection (hidden field)
  honeypot: string;
}

interface Errors {
  [key: string]: string | null;
}

export default function ContactBooking() {
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

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Replace with your Formcarry endpoint URL from Step 2
  const FORMCARRY_ENDPOINT = 'https://formcarry.com/s/rVz9oG79OaR';

  const validateForm = () => {
    const newErrors: Errors = {};
    
    if (!formData.organizationType) newErrors.organizationType = 'Organization type is required';
    if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?\d{10,12}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.groupSize) {
      newErrors.groupSize = 'Group size is required';
    } else if (parseInt(formData.groupSize) < 1) {
      newErrors.groupSize = 'Group size must be at least 1';
    }
    if (!formData.destination) newErrors.destination = 'Destination is required';
    // Honeypot check: If filled, it's likely a bot
    if (formData.honeypot.trim()) {
      newErrors.honeypot = 'Spam detected';
      return false; // Block submission
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name as keyof Errors]) {
      setErrors({ ...errors, [e.target.name]: null });
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
        body: formDataToSend, // Sends all form fields automatically
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Form submitted successfully to Formcarry');
        setIsSubmitted(true);
        setShowPopup(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
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
      } else {
        throw new Error(`Submission failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ ...errors, submit: 'Failed to send. Please try again or email us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
  ];

  return (
    <section id="contact-booking" className="relative py-20 bg-gray-50 overflow-hidden min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-20">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-sm"
        >
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-900 font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:bg-white hover:-translate-y-1 transition-all duration-300 border border-white/50 hover:border-red-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-full mb-4 shadow-sm">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your{' '}
            <span className="font-signature text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
              Journey
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Special packages for schools, colleges, corporate groups, and individual trips. Get instant quotes and expert guidance!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact Cards */}
            <div className="space-y-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600 mb-2">Available 12/7 for bookings and support</p>
                    <a href="tel:+919404014786" className="text-red-600 font-semibold hover:underline">
                      +91 94040 14786
                    </a>
                    <br />
                    <a href="tel:+918855994999" className="text-red-600 font-semibold hover:underline">
                      +91 88559 94999
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600 mb-2">Get response within 24 hours</p>
                    <a href="mailto:info@relaxholidays.com" className="text-red-600 font-semibold hover:underline">
                      info@relaxholidays.com
                    </a>
                    <br />
                    <a href="mailto:bookings@relaxholidays.com" className="text-red-600 font-semibold hover:underline">
                      bookings@relaxholidays.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Office</h3>
                    <p className="text-gray-600 mb-2">12/7 Availability</p>
                    <p className="text-gray-700 font-medium">
                      Pune, Maharashtra, India 411028
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Book with Us */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-red-600 mb-6">Why Book With Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-600">Special student, corporate & individual discounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-600">1 teacher complimentary for every 25 students</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-600">Group insurance policy included</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-600">Safe & secure travel arrangements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-600">Experienced tour coordinators</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-600">Owned by Dastagir Khan</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-8 relative"
          >
            <AnimatePresence>
              {showPopup && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    className="bg-white rounded-2xl p-8 max-w-md w-full relative"
                  >
                    <button
                      onClick={() => setShowPopup(false)}
                      className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 transition"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-12 h-12 text-red-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                      <p className="text-gray-600 mb-4">
                        Your booking request has been submitted successfully.
                      </p>
                      <p className="text-sm text-gray-500">
                        Our team will contact you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isSubmitted && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from humans, visible to bots */}
                <div style={{ position: 'absolute', left: '-9999px' }}>
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    aria-hidden="true"
                    placeholder="Leave empty"
                  />
                </div>

                {/* Organization Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Organization Type *
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-black placeholder-gray-500"
                  >
                    <option value="school">School</option>
                    <option value="college">College</option>
                    <option value="corporate">Corporate / IT Firm</option>
                    <option value="group">Group Travel</option>
                    <option value="individual">Individual</option>
                  </select>
                  {errors.organizationType && <p className="text-red-500 text-xs mt-1">{errors.organizationType}</p>}
                </div>

                {/* Organization Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    required
                    placeholder="Enter school/college/company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-black placeholder-gray-500"
                  />
                  {errors.organizationName && <p className="text-red-500 text-xs mt-1">{errors.organizationName}</p>}
                </div>

                {/* Contact Person & Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-black placeholder-gray-500"
                    />
                    {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-black placeholder-gray-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone & Group Size */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 94040 14786"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-black placeholder-gray-500"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Group Size *
                    </label>
                    <input
                      type="number"
                      name="groupSize"
                      value={formData.groupSize}
                      onChange={handleChange}
                      required
                      placeholder="Number of travelers"
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-black placeholder-gray-500"
                    />
                    {errors.groupSize && <p className="text-red-500 text-xs mt-1">{errors.groupSize}</p>}
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Preferred Destination *
                  </label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-black placeholder-gray-500"
                  >
                    <option value="">Select a destination</option>
                    {destinations.map((dest, index) => (
                      <option key={index} value={dest}>
                        {dest}
                      </option>
                    ))}
                  </select>
                  {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Preferred Travel Date
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-black placeholder-gray-500"
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
                    placeholder="Tell us about your requirements, budget, special requests..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-black placeholder-gray-500 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Sending...' : 'Request Quote Now'}
                </button>

                {errors.submit && <p className="text-red-500 text-xs text-center">{errors.submit}</p>}

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our Terms & Conditions and Privacy Policy
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Reusable Background Theme Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        .bg-gray-50 {
          background: linear-gradient(
            180deg,
            rgba(249, 250, 251, 1) 0%, /* gray-50 */
            rgba(249, 250, 251, 1) 100% /* gray-50 */
          );
          position: relative;
          overflow: hidden;
        }
        .bg-gray-50::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('/world-map-bg.png') no-repeat center/cover;
          opacity: 0.06;
          z-index: 0;
        }
        .font-signature {
          font-family: 'Great Vibes', cursive;
          font-weight: 400;
          font-size: 1.5em;
          line-height: 1.2;
        }
      `}</style>
    </section>
  );
}