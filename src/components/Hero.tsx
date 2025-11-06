"use client";

import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Dancing_Script } from "next/font/google";

const signatureFont = Dancing_Script({ subsets: ["latin"], weight: ["700"] });

const heroSlides = [
  {
    id: 1,
    image: "/Hero.jpg",
    title: "Turn Your Dreams Into Destinations",
    subtitle: "Adventure. Culture. Memories.",
    description:
      "We create unforgettable travel experiences — from hidden gems to bucket-list destinations.",
    highlight: "Dreams",
    cta: "Explore Destinations",
  },
  {
    id: 2,
    image: "/Photo_1.jpg",
    title: "Group Travel Made Easy",
    subtitle: "Friends. Family. Together.",
    description:
      "Experience the joy of traveling with your loved ones. Custom group packages designed for unforgettable bonding.",
    highlight: "Group",
    cta: "Plan Group Trip",
  },
  {
    id: 3,
    image: "/Photo_2.jpg",
    title: "Educational Tours for Students",
    subtitle: "Learn. Explore. Grow.",
    description:
      "Safe and enriching travel experiences for schools and colleges. Combining education with adventure.",
    highlight: "Educational",
    cta: "Book Student Tour",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentData = heroSlides[currentSlide];

  return (
    <main className="relative overflow-hidden">
      <Head>
        <title>WanderAway — Discover Your Next Adventure</title>
        <meta
          name="description"
          content="Discover unforgettable travel experiences — from hidden gems to bucket-list destinations."
        />
      </Head>

      <div className="relative min-h-screen flex items-center justify-center bg-black">
        {/* Background Images */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.9,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className="absolute inset-0"
          >
            <Image
              src={currentData.image}
              alt={currentData.title}
              fill
              priority={currentSlide === 0}
              className="object-cover object-center select-none brightness-[0.55] contrast-110"
              sizes="100vw"
            />
            {/* Layered Overlays for better visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          </motion.div>
        </AnimatePresence>

        {/* Text Content */}
        <div className="relative z-10 container mx-auto px-6 sm:px-10 py-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              >
                {/* Subtitle */}
                <motion.p
                  className="text-red-400 text-sm sm:text-base md:text-lg font-semibold mb-5 tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentData.subtitle}
                </motion.p>

                {/* Main Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {currentData.title.split(currentData.highlight)[0]}
                  <span
                    className={`text-red-500 italic relative inline-block ${signatureFont.className}`}
                  >
                    {currentData.highlight}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    />
                  </span>
                  {currentData.title.split(currentData.highlight)[1]}
                </h1>

                {/* Description */}
                <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
                  {currentData.description}
                </p>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.5)] hover:shadow-[0_0_25px_rgba(255,0,0,0.7)] transition-all duration-300"
                >
                  {currentData.cta}
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? "w-10 h-3 bg-red-600"
                  : "w-3 h-3 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}