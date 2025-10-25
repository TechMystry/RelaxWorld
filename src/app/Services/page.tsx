"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Briefcase, School, Users, Heart, User } from "lucide-react";

export default function ServicesPage() {
  const router = useRouter();
  const pathname = usePathname();

  // Scroll to section on load if hash exists
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 400);
        }
      }
    }
  }, [pathname]);

  const services = [
    {
      id: "corporate-tours",
      name: "Corporate Tours",
      icon: <Briefcase className="w-8 h-8 text-blue-400" />,
      image: "/corporate.jpg",
      gradient: "from-blue-600/20 to-blue-400/10",
      description:
        "Empower your team with exclusive corporate retreats, team-building activities, and global conferences. Our corporate tours combine productivity and leisure in seamless experiences.",
      moreContent:
        "Relax Holidays crafts corporate experiences with personalized itineraries, luxury accommodations, and innovative team-building workshops. Impress your clients, reward your employees, and create unforgettable memories.",
    },
    {
      id: "school-tours",
      name: "School Tours",
      icon: <School className="w-8 h-8 text-green-400" />,
      image: "/school.png",
      gradient: "from-green-600/20 to-green-400/10",
      description:
        "Educational trips designed to inspire students. We ensure safe, fun-filled, and interactive tours that blend learning with adventure.",
      moreContent:
        "From historical landmarks to nature expeditions, Relax Holidays offers tailor-made school tours that foster curiosity, teamwork, and personal growth. Our expert guides ensure every trip is educational, safe, and fun.",
    },
    {
      id: "group-tours",
      name: "Group Tours",
      icon: <Users className="w-8 h-8 text-yellow-400" />,
      image: "/group.png",
      gradient: "from-yellow-600/20 to-yellow-400/10",
      description:
        "Travel together, laugh together. Perfect for families, friends, and clubs — our group tours are packed with curated experiences and easy coordination.",
      moreContent:
        "Relax Holidays offers group travel packages that cover everything — from lodging, transport, and guided activities to customized meals and entertainment. Experience stress-free group travel with endless memories.",
    },
    {
      id: "solo-trips",
      name: "Solo Trips",
      icon: <User className="w-8 h-8 text-purple-400" />,
      image: "/solo.jpg",
      gradient: "from-purple-600/20 to-purple-400/10",
      description:
        "Travel your way — explore destinations at your own pace, meet new people, and discover yourself through incredible solo adventures.",
      moreContent:
        "Relax Holidays curates solo travel adventures for every type of explorer — cultural immersions, adventure sports, wellness retreats, or offbeat trails. Connect with locals and fellow travelers effortlessly.",
    },
    {
      id: "honeymoon-packages",
      name: "Honeymoon Packages",
      icon: <Heart className="w-8 h-8 text-pink-400" />,
      image: "/honeymoon.png",
      gradient: "from-pink-600/20 to-pink-400/10",
      description:
        "Celebrate love with handpicked romantic getaways, luxury stays, and unforgettable moments crafted especially for couples.",
      moreContent:
        "From private villas, candlelight dinners, to exclusive experiences like hot-air balloon rides or spa retreats, Relax Holidays ensures every honeymoon is dreamy and memorable.",
    },
  ];

  return (
    <section className="relative bg-[#0b1320] text-gray-300 overflow-hidden min-h-screen">
      {/* Background Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/footer.png"
          alt="Background"
          fill
          className="object-cover opacity-40"
        />
      </div>
      <div className="absolute inset-0 bg-[#0b1320]/80" />

      {/* Back to Home Button */}
      <div className="relative z-20 text-center pt-6">
        <motion.button
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.1, backgroundColor: "#1e3a8a" }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-2 text-white bg-blue-600 rounded-full shadow-md font-semibold text-sm md:text-base transition-all"
        >
          ← Back to Home
        </motion.button>
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-serif"
        >
          Relax Holidays
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-mono"
        >
          Explore packages designed for every traveler — corporate getaways,
          school trips, romantic honeymoons, or solo adventures. Let us craft
          your dream journey.
        </motion.p>
      </div>

      {/* Services List */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24 space-y-32">
        {services.map((service, index) => (
          <motion.div
            id={service.id}
            key={service.id}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 rounded-xl"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${service.gradient} rounded-xl`}
              />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 space-y-4">
              <div className="flex items-center gap-3">
                {service.icon}
                <h2 className="text-3xl font-bold text-white font-serif">
                  {service.name}
                </h2>
              </div>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-sans">
                {service.description}
              </p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-mono">
                {service.moreContent}
              </p>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/contact-booking")}
                className="mt-4 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-all shadow-md"
              >
                Enquire Now →
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
