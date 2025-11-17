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
Day 5: Udaipur: City Palace, Fate Sagar Lake, Saheliyon Ki Bari, Jagdish Temple, dinner & overnight stay.
Day 6: Jaipur return, catch return train, night journey.
Day 7: Arrival at Pune. Tour ends in happy memories.`,
    },
    {
      name: "Statue of Unity",
      image: "/Destination/Statue-of-unity.jpg",
      description: "Explore Historic and World Tallest Statue of Unity",
      details: `Day 1: Departure from Pune by train to Vadodara. Night journey.
Day 2: Arrival Vadodara, transfer to Kevadia (Statue of Unity). Check-in hotel, relax.
Day 3: Visit Statue of Unity (Viewing Gallery, Museum, Laser Show), Sardar Sarovar Dam, Valley of Flowers, Cactus Garden, Ekta Mall. Evening free.
Day 4: Jungle Safari at Zarwani, Nauka Vihar (Boating), Arogya Van, Children Nutrition Park. Overnight stay.
Day 5: Visit Vishwa Van, Dino Trail, Unity Glow Garden. Evening departure to Vadodara.
Day 6: Morning train back to Pune.
Day 7: Arrival Pune. Tour ends with patriotic memories and pride.`,
    },
  ];

  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="container mx-auto px-4 text-left">
        {/* Header */}
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
            >
              Destination Hot
            </motion.span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mt-1 sm:mt-0 leading-tight">
              Most Favorite Tour Places
            </h2>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} className="group">
            <Link
              href="/destinations"
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:-translate-y-1 font-semibold text-lg"
            >
              Explore All Destinations
            </Link>
          </motion.div>
        </motion.div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tours.map((tour, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 group cursor-pointer flex flex-col hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  className="object-cover rounded-t-2xl transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {tour.description}
                  </p>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setSelectedTour(tour)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold text-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    View Details
                  </button>
                  <Link
                    href="/contact-booking"
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold text-sm text-center hover:shadow-2xl hover:-translate-y-1 transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MODAL - IMAGE 10000% GUARANTEED (AB CHUTIYA NAHI BANEGA) */}
        {selectedTour && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTour(null)}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-3xl flex flex-col lg:flex-row relative"
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTour(null)}
                className="absolute top-4 right-4 z-50 w-14 h-14 bg-white/95 rounded-full shadow-2xl flex items-center justify-center hover:bg-red-50 transition-all"
              >
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* LEFT SIDE: IMAGE - AB PAKKI DIKHEGI (TRIPLE FORCE LOAD) */}
              <div className="relative w-full lg:w-1/2 h-64 lg:h-full bg-gray-300">
                {/* Triple Force Reload Trick */}
                <Image
                  key={selectedTour.image + "_force1_" + Date.now()}
                  src={selectedTour.image + "?v=" + Date.now()} // Cache busting URL
                  alt={selectedTour.name}
                  fill
                  priority
                  unoptimized
                  className="object-cover object-center absolute inset-0"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onLoadingComplete={() => console.log("Image loaded:", selectedTour.image)}
                  onError={(e) => {
                    console.error("Image failed:", selectedTour.image);
                    e.currentTarget.src = selectedTour.image; // retry
                  }}
                />
                {/* Fallback visible placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <p className="text-gray-500 text-xl">Loading {selectedTour.name} Image...</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 text-white pointer-events-none">
                  <h2 className="text-5xl font-bold drop-shadow-2xl">{selectedTour.name}</h2>
                  <p className="text-2xl opacity-90">Relax Holidays Special Package</p>
                </div>
              </div>

              {/* RIGHT SIDE: DETAILS */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-3">{selectedTour.name}</h2>
                <p className="text-gray-600 italic mb-8 text-lg">
                  *Itineraries start from Pune, fully customizable by your boarding point.
                </p>

                <div className="space-y-6">
                  {selectedTour.details.split('\n').map((line, idx) => {
                    const dayMatch = line.match(/Day (\d+):/);
                    if (dayMatch) {
                      const dayNum = dayMatch[1];
                      const text = line.replace(/Day \d+:\s*/, '').trim();
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.07, duration: 0.5 }}
                          className="flex gap-5 items-start"
                        >
                          <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-2xl flex-shrink-0">
                            {dayNum}
                          </div>
                          <p className="text-gray-700 leading-relaxed pt-2 text-base">
                            {text}
                          </p>
                        </motion.div>
                      );
                    }
                    return null;
                  })}
                </div>

                <div className="flex gap-4 mt-12">
                  <button
                    onClick={() => setSelectedTour(null)}
                    className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
                  >
                    Close
                  </button>
                  <Link
                    href="/contact-booking"
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-700 text-white py-4 rounded-xl font-bold text-lg text-center shadow-2xl hover:shadow-red-500/50 transition-all"
                  >
                    Book Now Instantly
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Styles */}
        <style jsx global>{`
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </section>
  );
}