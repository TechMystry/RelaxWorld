'use client'
import { FaUsers, FaGlobeAmericas, FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const [years, setYears] = useState(0);
  const [trips, setTrips] = useState(0);
  const [clients, setClients] = useState(0);

  useEffect(() => {
    let y = 0, t = 0, c = 0;
    const interval = setInterval(() => {
      if (y < 12) setYears(++y);
      if (t < 800) setTrips(prev => prev + 20);
      if (c < 99) setClients(++c);
      if (y >= 12 && t >= 800 && c >= 99) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const whyUsCards = [
    {
      icon: <FaGlobeAmericas className="text-red-500 text-5xl" />,
      title: 'Global Expertise',
      desc: 'Years of experience planning trips worldwide, ensuring smooth journeys every time.',
    },
    {
      icon: <FaUsers className="text-red-500 text-5xl" />,
      title: 'Customer Focused',
      desc: 'Clients are at the heart of everything we do, with personalized service tailored to your needs.',
    },
    {
      icon: <FaStar className="text-red-500 text-5xl" />,
      title: 'Trusted & Rated',
      desc: 'Dedication to quality and safety has earned us a reputation for excellence.',
    },
  ];

  return (
    <section id="AboutSection" className="relative bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-start gap-12">
        {/* Left Section - About Us */}
        <motion.div
          className="flex-1 flex flex-col gap-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-red-500 font-semibold uppercase tracking-wide text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            About Us
          </motion.span>
          <motion.h1 
            className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We Make Travel <span className="text-red-500 font-signature">Memorable</span>
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            At Relax Holidays, we craft unforgettable journeys for travelers worldwide. Our experienced team ensures every trip is safe, seamless, and tailored to your adventure.
          </motion.p>
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            With over a decade of expertise and a passion for travel, we go the extra mile to ensure every journey exceeds expectations.
          </motion.p>
        </motion.div>

        {/* Right Section - Why Us + Stats */}
        <div className="flex-1 flex flex-col gap-12">
          {/* Why Us Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyUsCards.map((card, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4 cursor-pointer hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="mt-1"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {card.icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.h3 
                    className="text-lg font-semibold text-gray-800 mb-1"
                    whileHover={{ y: -2, color: "#dc2626" }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.title}
                  </motion.h3>
                  <p className="text-gray-600 text-sm">{card.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Stats Counters */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white p-8 rounded-xl shadow-xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h3 
                className="text-4xl font-bold text-red-500"
                whileHover={{ scale: 1.1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {years}+
              </motion.h3>
              <p className="text-gray-600 mt-1 text-sm">Years of Experience</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.h3 
                className="text-4xl font-bold text-red-500"
                whileHover={{ scale: 1.1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {trips >= 800 ? 800 : trips}+
              </motion.h3>
              <p className="text-gray-600 mt-1 text-sm">Trips Planned</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h3 
                className="text-4xl font-bold text-red-500"
                whileHover={{ scale: 1.1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {clients}%
              </motion.h3>
              <p className="text-gray-600 mt-1 text-sm">Happy Clients</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Custom Font Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        
        .font-signature {
          font-family: 'Great Vibes', cursive;
          font-weight: 400;
          font-size: 1.2em;
          line-height: 1.2;
        }
      `}</style>
    </section>
  );
}