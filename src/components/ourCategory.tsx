'use client';
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TourCategories() {
  const router = useRouter();

  // Categories without Customized
  const categories = [
    { name: "Corporate", id: "corporate-tours", image: "/Corporate.jpg", alt: "Cruise ship in the sea" },
    { name: "Schools", id: "school-tours", image: "/Photo_2.jpg", alt: "People hiking in the mountains" },
    { name: "Groups", id: "group-tours", image: "/Photo_3.jpg", alt: "Airplane over a tropical island" },
    { name: "Solo", id: "solo-trips", image: "/Solo.jpg", alt: "Coral reef with fish" },
    { name: "Honeymoon", id: "honeymoon-packages", image: "/Photo_1.jpg", alt: "Person walking in the desert" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  // Auto-scroll for mobile carousel
  useEffect(() => {
    if (!hasAnimated) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hasAnimated, categories.length]);

  const prevCard = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const nextCard = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % categories.length);
  };

  // Navigate to Services page only
  const handleReadMore = () => {
    router.push("/Services");
  };

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] bg-[url('/pattern.svg')] bg-repeat bg-center"></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl italic text-red-400 font-serif mb-2">
          Wonderful Planning For You
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
          Our Exclusive Experiences
        </h3>

        {/* Desktop layout */}
        <div className="hidden md:flex justify-center items-end space-x-10">
          {hasAnimated && categories.map((category, index) => {
            const offsets = ["translate-y-8", "translate-y-4", "translate-y-0", "translate-y-4", "translate-y-8"];
            const rotates = ["-rotate-[4deg]", "-rotate-[2deg]", "rotate-0", "rotate-[2deg]", "rotate-[4deg]"];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.2 }}
                className={`flex flex-col items-center transition-transform duration-500 hover:scale-105 ${offsets[index]} ${rotates[index]} will-change-transform`}
              >
                <div className="w-56 h-72 rounded-3xl overflow-hidden shadow-lg bg-white transform-gpu">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    className="object-cover rounded-3xl transition-transform duration-700 ease-out hover:scale-110"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mt-4">{category.name}</h4>
                <button
                  onClick={handleReadMore}
                  className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
                >
                  Read More
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative w-full h-96 flex justify-center items-center">
          <AnimatePresence initial={false} custom={direction}>
            {hasAnimated && categories.map((category, index) => {
              if (index !== activeIndex) return null;

              const xOffset = direction > 0 ? 120 : -120;

              return (
                <motion.div
                  key={category.id}
                  initial={{ x: xOffset, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: -xOffset, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute w-64 rounded-3xl overflow-hidden shadow-lg bg-white"
                >
                  <div className="relative w-full h-72">
                    <Image
                      src={category.image}
                      alt={category.alt}
                      fill
                      className="object-cover rounded-3xl"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
                    <button
                      onClick={handleReadMore}
                      className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
                    >
                      Read More
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Carousel buttons */}
          <button
            onClick={prevCard}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-50 hover:bg-gray-100 transition"
          >
            ◀
          </button>
          <button
            onClick={nextCard}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-50 hover:bg-gray-100 transition"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
