'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface Tour {
  name: string;
  image: string;
  description: string;
  details: string;
}

export default function FavoriteTourPlaces() {
  const tours: Tour[] = [
    {
      name: "Haseen Himachal",
      image: "/Destination/himachal.jpg",
      description: "Explore Delhi, Shimla, and Manali with Relax Holidays.",
      details: `Day 1: Dept. by Train in reserved compartments for New Delhi. Breakfast, lunch, evening Dinner in train.
Day 2: Arrival New Delhi Railway Station, move to Shimla by bus. Check into hotel, relax and overnight stay.
Day 3: Kufri sightseeing, lunch at hotel, free time at Mall Road, dinner, depart for Manali night journey.
Day 4: Morning arrival at Manali, visit Rohtang Pass, Vashist hot water springs, dinner, overnight stay.
Day 5: Hadimba Devi Temple, Buddhist Monastery, lunch, free time, dinner, night bus to Delhi.
Day 6: Delhi sightseeing: Qutub Minar, Red Fort, Lotus Temple, Rashtrapati Bhavan, India Gate, Jantar Mantar, overnight stay.
Day 7: Shopping & individual activities, move to station for return train.
Day 8: Arrival at Pune. Tour ends in happy memories.`,
    },
    {
      name: "Kerala Tour",
      image: "/Destination/kerala.jpg",
      description: "Discover Cochin, Alleppey, Thekkady, Munnar, and Wonderla.",
      details: `Day 1: Pune to Bangalore by train.
Day 2: Arrive Bangalore, enjoy Wonderla, evening move to Cochin by night train.
Day 3: Ernakulum arrival, local sightseeing.
Day 4: Munnar sightseeing: Mattupetty Dam, Kunssale Lake, Echo Point, Rajamalai for Nilgiri Thars. Overnight stay.
Day 5: Local sightseeing Munnar.
Day 6: Thekkady spice garden & Periyar wildlife sanctuary. Optional boating & elephant ride.
Day 7: Alleppey houseboat cruise, lunch on board, evening train to Pune.
Day 8: Whole day-night train journey.
Day 9: Arrival at Pune. Tour ends in happy memories.`,
    },
    {
      name: "Royal Rajasthan",
      image: "/Destination/royal-rajasthan.jpg",
      description: "Ajmer, Pushkar, Udaipur, Jaipur exploration with cultural immersion.",
      details: `Day 1: Pune railway departure to Jaipur, night journey.
Day 2: Jaipur arrival, check-in hotel, relax & shopping.
Day 3: Jaipur sightseeing: City Palace, Bagore ki Haweli, Fatehpur Lake, Ambrai Ghat, Mansoon Palace, Jagdish Temple.
Day 4: Ajmer: Dargah visit, Pushkar: Brahma Temple, overnight journey to Udaipur.
Day 5: Udaipur: City Palace, Fateh Sagar Lake, Saheliyon Ki Bari, Jagdish Temple, dinner & overnight stay.
Day 6: Jaipur return, catch return train, night journey.
Day 7: Arrival at Pune. Tour ends in happy memories.`,
    },
    {
      name: "Statue of Unity",
      image: "/Destination/Statue-of-unity.jpg",
      description: "Explore Historic and World Tallest Statue of Unity",
      details: `Day 1: Pune to Hyderabad by night train.
Day 2: Hyderabad: Birla Mandir, Planetarium, Necklace Road, Tank Band, Lumbini Park, overnight stay.
Day 3: Full day Ramoji Film City, lunch provided, return to hotel, overnight stay.
Day 4: Wonderla Park full day, dinner, night train back to Pune.
Day 5: Arrival at Pune. Tour ends in happy memories.`,
    },
  ];

  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="container mx-auto px-4 text-left">
        {/* Header with viewport trigger */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:gap-2">
            <motion.span 
              className="text-red-500 text-sm font-medium px-3 py-1 bg-red-50 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Destination Hot
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mt-1 sm:mt-0 leading-tight">
              Most Favorite Tour Places
            </h2>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <Link
              href="/destinations"
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:-translate-y-1 font-semibold text-lg"
            >
              Explore All Destinations
            </Link>
          </motion.div>
        </motion.div>

        {/* Tours Grid - Individual card animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tours.map((tour, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1 
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.15 
              }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 group cursor-pointer flex flex-col hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 bg-gradient-to-b from-white to-gray-50"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              <motion.div 
                className="relative w-full h-48 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  className="object-cover rounded-t-2xl transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>

              <motion.div 
                className="p-6 flex flex-col flex-1 justify-between"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.h3 
                    className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tour.name}
                  </motion.h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {tour.description}
                  </p>
                </motion.div>
                
                <motion.div 
                  className="flex gap-3 mt-auto pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedTour(tour)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center px-5 py-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    View Details
                  </motion.button>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href="/contact-booking"
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-center px-5 py-3 rounded-lg font-semibold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex items-center justify-center"
                    >
                      Book Now
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tour Details Modal */}
        {selectedTour && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedTour(null)}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl relative"
              initial={{ opacity: 0, scale: 0.7, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 flex items-center justify-center text-gray-700 hover:text-red-500"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedTour(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="flex flex-col lg:flex-row h-full">
                <motion.div 
                  className="relative w-full lg:w-1/2 h-80 lg:h-full overflow-hidden"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Image
                    src={selectedTour.image}
                    alt={selectedTour.name}
                    fill
                    className="object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
                    sizes="600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>
                
                <motion.div 
                  className="lg:w-1/2 p-8 lg:p-12 flex flex-col gap-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2 leading-tight">
                      {selectedTour.name}
                    </h2>
                    <p className="text-gray-500 text-lg italic">
                      *Itineraries start from Pune, customizable by your boarding point.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="flex-1 overflow-y-auto max-h-96 pr-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {selectedTour.details.split('\n').map((line, idx) => {
                      if (!line.trim()) return null;
                      const dayMatch = line.match(/Day (\d+)/);
                      if (dayMatch) {
                        const dayNumber = dayMatch[1];
                        const content = line.replace(/Day \d+: /, '').trim();
                        return (
                          <motion.div
                            key={idx}
                            className="flex gap-4 items-start mb-6 pb-4 border-b border-gray-100 last:border-b-0"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              delay: idx * 0.05, 
                              duration: 0.4 
                            }}
                          >
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                              {dayNumber}
                            </div>
                            <p className="text-gray-700 text-base leading-relaxed">{content}</p>
                          </motion.div>
                        );
                      }
                      return null;
                    })}
                  </motion.div>

                  <motion.div 
                    className="flex gap-4 pt-4 mt-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <motion.button
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedTour(null)}
                      className="flex-1 bg-gray-100 text-gray-800 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                    >
                      Close
                    </motion.button>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href="/contact-booking"
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex items-center justify-center text-lg"
                      >
                        Book Now
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Custom Scrollbar & Line Clamp Styles */}
        <style jsx global>{`
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          /* Custom scrollbar for Webkit browsers */
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: transparent;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 3px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        `}</style>
      </div>
    </section>
  );
}