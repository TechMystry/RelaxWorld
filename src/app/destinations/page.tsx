'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Star, Search } from "lucide-react";

interface Package {
  id: number;
  name: string;
  image: string;
  description: string;
  details: string;
  duration: string;
  rating: number;
  reviews: number;
}

export default function AllDestinations() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const packages: Package[] = [
    {
      id: 1,
      name: "Goa Beach Escape",
      image: "/Destination/goa-beach.jpg",
      description: "Sun-kissed beaches, vibrant nightlife & Portuguese heritage with DJ musical night.",
      details: `Day 1: Pune to Goa by bus. Check-in hotel, beach time, DJ night.
Day 2: Calangute Beach, Dona Paula sightseeing, beach shopping.
Day 3: Local sightseeing, water sports, evening beach party.
Day 4: Return journey to Pune. Tour ends in happy memories.`,
      duration: "4 Days / 3 Nights",
      rating: 4.9,
      reviews: 2847,
    },
    {
      id: 2,
      name: "Statue of Unity Tour",
      image: "/Destination/Statue-of-unity.jpg",
      description: "World's tallest statue with stunning valley views & adventure activities.",
      details: `Day 1: Pune to Kevadia by bus. Check-in hotel, relax.
Day 2: Statue of Unity, Valley of Flowers, Sardar Sarovar Dam.
Day 3: Aarogya Van, local sightseeing, musical DJ night.
Day 4: Return journey to Pune. Tour ends in happy memories.`,
      duration: "4 Days / 3 Nights",
      rating: 4.8,
      reviews: 1923,
    },
    {
      id: 3,
      name: "Hyderabad - Ramoji Film City",
      image: "/Destination/ramoji-film-city.jpg",
      description: "Largest film studio complex with thrilling rides, gardens & DJ night.",
      details: `Day 1: Pune to Hyderabad by train. Check-in hotel.
Day 2: Birla Mandir, NTR Garden, Planetarium sightseeing.
Day 3: Full day Ramoji Film City, musical DJ night.
Day 4: Return train to Pune. Tour ends in happy memories.`,
      duration: "4 Days / 3 Nights",
      rating: 4.9,
      reviews: 3156,
    },
    {
      id: 4,
      name: "Mahabaleshwar - Imagica - Lonavala",
      image: "/Destination/Mahabaleshwar.jpg",
      description: "Hill station adventure with theme park thrills & scenic viewpoints.",
      details: `Day 1: Pune to Mahabaleshwar by bus. Check-in hotel.
Day 2: Mahabaleshwar points, Pratapgarh Fort sightseeing.
Day 3: Imagica Theme Park full day enjoyment.
Day 4: Lonavala sightseeing, return to Pune.`,
      duration: "4 Days / 3 Nights",
      rating: 4.7,
      reviews: 2134,
    },
    {
      id: 5,
      name: "Hyderabad - Ramoji - Wonderla",
      image: "/Destination/wonderla.jpg",
      description: "Double adventure with film city & water park excitement.",
      details: `Day 1: Pune to Hyderabad by train. Check-in hotel.
Day 2: Ramoji Film City full day, musical DJ night.
Day 3: Wonderla Water Park full day enjoyment.
Day 4: Birla Mandir, Lumbini Park, return train to Pune.
Day 5: Arrival Pune. Tour ends in happy memories.`,
      duration: "5 Days / 4 Nights",
      rating: 4.8,
      reviews: 2891,
    },
    {
      id: 6,
      name: "Vishakhapatnam Tour",
      image: "/Destination/visakhapatnam.jpg",
      description: "Coastal paradise with valleys, beaches & submarine museum.",
      details: `Day 1: Pune to Vishakhapatnam by train.
Day 2: RK Beach, Submarine Museum sightseeing.
Day 3: Bora Caves, local sightseeing.
Day 4: Araku Valley full day trip.
Day 5: Shopping, return train journey.
Day 6: Arrival Pune. Tour ends in happy memories.`,
      duration: "6 Days / 5 Nights",
      rating: 4.8,
      reviews: 1678,
    },
    {
      id: 7,
      name: "Bangalore - Mysore - Wonderla",
      image: "/Destination/mysore.jpg",
      description: "Royal palaces, gardens & thrilling water park adventures.",
      details: `Day 1: Pune to Bangalore by train.
Day 2: Wonderla Water Park full day.
Day 3: Mysore Palace, Chamundi Hills sightseeing.
Day 4: Brindavan Gardens, local sightseeing.
Day 5: Bangalore sightseeing, return train.
Day 6: Arrival Pune. Tour ends in happy memories.`,
      duration: "7 Days / 6 Nights",
      rating: 4.7,
      reviews: 2345,
    },
    {
      id: 8,
      name: "Golden Triangle",
      image: "/Destination/golden-triangle.jpg",
      description: "Iconic journey through India's golden triangle of heritage.",
      details: `Day 1: Pune to Delhi by train.
Day 2: Delhi sightseeing - Red Fort, Qutub Minar.
Day 3: Delhi to Agra, Taj Mahal visit.
Day 4: Agra Fort, travel to Jaipur.
Day 5: Amber Fort, City Palace sightseeing.
Day 6: Jaipur local sightseeing, return train.
Day 7: Arrival Pune. Tour ends in happy memories.`,
      duration: "7 Days / 6 Nights",
      rating: 4.9,
      reviews: 4567,
    },
    {
      id: 9,
      name: "Royal Rajasthan",
      image: "/Destination/royal-rajasthan.jpg",
      description: "Majestic forts, palaces & lakes of royal Rajasthan.",
      details: `Day 1: Pune to Jaipur by train.
Day 2: Jaipur sightseeing, musical DJ night.
Day 3: Ajmer Dargah, Pushkar Brahma Temple.
Day 4: Travel to Udaipur, City Palace.
Day 5: Fateh Sagar Lake, Saheliyon Ki Bari.
Day 6: Udaipur sightseeing, return train.
Day 7: Arrival Pune. Tour ends in happy memories.`,
      duration: "7 Days / 6 Nights",
      rating: 4.8,
      reviews: 3892,
    },
    {
      id: 10,
      name: "Haseen Himachal",
      image: "/Destination/himachal.jpg",
      description: "Snow-capped mountains, adventure & Himalayan beauty.",
      details: `Day 1: Pune to Delhi by train, then bus to Shimla.
Day 2: Kufri sightseeing, Mall Road.
Day 3: Night journey to Manali.
Day 4: Rohtang Pass, Vashist hot springs.
Day 5: Hadimba Temple, Monastery, Mall Road.
Day 6: Delhi sightseeing, return train.
Day 7: Shopping, final departure.
Day 8: Arrival Pune. Tour ends in happy memories.`,
      duration: "8 Days / 7 Nights",
      rating: 4.9,
      reviews: 5123,
    },
    {
      id: 11,
      name: "Bangalore - Mysore - Ooty - Coonoor",
      image: "/Destination/ooty.jpg",
      description: "Hill station paradise with palaces & scenic viewpoints.",
      details: `Day 1: Pune to Bangalore by train.
Day 2: Mysore Palace, Chamundi Hills.
Day 3: Travel to Ooty, Botanical Garden.
Day 4: Doddabetta Peak, lake boating.
Day 5: Coonoor sightseeing, tea gardens.
Day 6: Ooty local sightseeing.
Day 7: Return train journey.
Day 8: Arrival Pune. Tour ends in happy memories.`,
      duration: "7 Days / 6 Nights",
      rating: 4.8,
      reviews: 2789,
    },
    {
      id: 12,
      name: "Amritsar - Delhi - Jaipur - Agra",
      image: "/Destination/amritsar.jpg",
      description: "Spiritual & historical journey across North India.",
      details: `Day 1: Pune to Amritsar by train.
Day 2: Golden Temple, Wagah Border ceremony.
Day 3: Travel to Delhi, sightseeing.
Day 4: Delhi to Agra, Taj Mahal.
Day 5: Agra Fort, travel to Jaipur.
Day 6: Amber Fort, City Palace.
Day 7: Jaipur sightseeing, return train.
Day 8: Arrival Pune. Tour ends in happy memories.`,
      duration: "8 Days / 7 Nights",
      rating: 4.9,
      reviews: 4231,
    },
    {
      id: 13,
      name: "Kerala Complete Package",
      image: "/Destination/kerala.jpg",
      description: "God's own country with houseboats, tea gardens & wildlife.",
      details: `Day 1: Pune to Bangalore, Wonderla Park.
Day 2: Night train to Cochin.
Day 3: Ernakulam sightseeing.
Day 4: Munnar - Mattupetty Dam, Echo Point.
Day 5: Munnar local sightseeing.
Day 6: Thekkady - Spice garden, wildlife sanctuary.
Day 7: Alleppey houseboat stay.
Day 8: Return train journey.
Day 9: Arrival Pune. Tour ends in happy memories.`,
      duration: "9 Days / 8 Nights",
      rating: 4.9,
      reviews: 5678,
    },
  ];

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } as any },
  };

  const getProgressWidth = (duration: string) => {
    const days = parseInt(duration.match(/\d+/)?.[0] || "1");
    return `${Math.min((days / 10) * 100, 100)}%`;
  };

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-20 h-20 bg-red-100/50 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-red-100/30 rounded-full blur-xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4"
        >
          <div className="flex flex-col sm:flex-row items-center sm:gap-2">
            <h2 className="text-3xl font-bold text-gray-800 mt-1 sm:mt-0">All Tour Packages</h2>
          </div>
          <Link
            href="/"
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by package name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 pr-12 rounded-xl border-2 border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 shadow-lg transition-all duration-300 text-lg"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Packages Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col group relative"
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative w-full h-48">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index === 0}
                />

                {/* Rating */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-gray-900">{pkg.rating}</span>
                  <span className="text-xs text-gray-500">({pkg.reviews.toLocaleString()})</span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-500 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">{pkg.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    {pkg.duration}
                  </div>
                </div>
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="flex-1 bg-blue-500 text-white text-center px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm shadow-md hover:shadow-lg"
                  >
                    View Details
                  </button>
                  <Link
                    href="/contact-booking"
                    className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-center px-4 py-2 rounded-md text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Package Details Modal */}
        {selectedPackage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPackage(null)}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] p-6 overflow-hidden shadow-2xl relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-3xl font-bold transition-all duration-200 hover:scale-110"
              >
                &times;
              </button>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative md:w-1/2 h-64 md:h-auto w-full">
                  <Image
                    src={selectedPackage.image}
                    alt={selectedPackage.name}
                    fill
                    className="object-cover rounded-2xl shadow-md"
                    sizes="600px"
                  />
                </div>
                <div className="md:w-1/2 flex flex-col">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedPackage.name}</h2>
                  <p className="text-gray-400 text-sm mb-4 italic">
                    *Itineraries start from Pune, customizable by your boarding point.
                  </p>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-red-500 mb-2">
                      <Calendar className="w-4 h-4" />
                                            {selectedPackage.duration}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: getProgressWidth(selectedPackage.duration) }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Day-wise Details */}
                  <div className="flex-1 max-h-[50vh] overflow-y-auto no-scrollbar">
                    {selectedPackage.details.split('\n').map((line, idx) => {
                      if (!line.trim()) return null;
                      const dayMatch = line.match(/Day (\d+)/);
                      if (dayMatch) {
                        const dayNumber = dayMatch[1];
                        const content = line.replace(/Day \d+: /, '').trim();
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex gap-4 items-start mb-3"
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                              {dayNumber}
                            </div>
                            <p className="text-gray-700">{content}</p>
                          </motion.div>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex gap-4 justify-end flex-wrap">
                    <button
                      onClick={() => setSelectedPackage(null)}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Close
                    </button>
                    <Link
                      href="/contact-booking"
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
}

