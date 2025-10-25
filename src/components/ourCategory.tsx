'use client';

/* eslint-disable */

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Category = {
  name: string;
  id: string;
  image: string;
  alt: string;
};

const categories: readonly Category[] = [
  { name: 'Corporate', id: 'corporate-tours', image: '/Corporate.jpg', alt: 'Cruise ship in the sea' },
  { name: 'Schools', id: 'school-tours', image: '/Photo_2.jpg', alt: 'People hiking in the mountains' },
  { name: 'Groups', id: 'group-tours', image: '/Photo_3.jpg', alt: 'Airplane over a tropical island' },
  { name: 'Solo', id: 'solo-trips', image: '/Solo.jpg', alt: 'Coral reef with fish' },
  { name: 'Honeymoon', id: 'honeymoon-packages', image: '/Photo_1.jpg', alt: 'Person walking in the desert' },
] as const;

export default function TourCategories() {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);

  /* ---------- Intersection Observer ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    // ✅ Copy the ref value into a local variable
    const currentSection = sectionRef.current;

    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, [hasAnimated]);

  /* ---------- Auto-play (mobile) ---------- */
  useEffect(() => {
    if (!hasAnimated || !isAutoPlay) return;

    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((i) => (i + 1) % categories.length);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hasAnimated, isAutoPlay]);

  const nextCard = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % categories.length);
  }, []);

  const prevCard = useCallback(() => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + categories.length) % categories.length);
  }, []);

  const goToIndex = useCallback(
    (idx: number) => {
      setDirection(idx > activeIndex ? 1 : -1);
      setActiveIndex(idx);
    },
    [activeIndex]
  );

  const handleReadMore = () => router.push('/Services');

  /* ---------- Touch swipe ---------- */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextCard() : prevCard();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.08] bg-[url('/pattern.svg')] bg-repeat bg-center pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Header */}
        <motion.h2
          className="text-2xl md:text-3xl italic text-red-400 font-serif mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Wonderful Planning For You
        </motion.h2>

        <motion.h3
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our Exclusive Experiences
        </motion.h3>

        {/* ---------- Desktop Staggered Grid ---------- */}
        <div className="hidden md:flex justify-center items-end gap-8 lg:gap-10">
          {hasAnimated &&
            categories.map((cat, idx) => {
              const offsets = ['translate-y-8', 'translate-y-4', 'translate-y-0', 'translate-y-4', 'translate-y-8'] as const;
              const rotates = ['-rotate-[4deg]', '-rotate-[2deg]', 'rotate-0', 'rotate-[2deg]', 'rotate-[4deg]'] as const;

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.15 }}
                  className={`flex flex-col items-center transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${offsets[idx]} ${rotates[idx]}`}
                  whileHover={{ rotate: 0 }}
                >
                  <div className="relative w-56 h-72 rounded-3xl overflow-hidden shadow-xl bg-white group">
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 300px"
                      priority={idx < 3}
                      loading={idx >= 3 ? 'lazy' : 'eager'}
                    />
                  </div>

                  <h4 className="mt-4 text-lg font-semibold text-gray-900">{cat.name}</h4>

                  <button
                    onClick={handleReadMore}
                    className="mt-1 text-sm text-gray-500 hover:text-teal-600 transition-colors"
                    aria-label={`Explore ${cat.name} tour packages`}
                  >
                    Read More
                  </button>
                </motion.div>
              );
            })}
        </div>

        {/* ---------- Mobile Carousel ---------- */}
        <div
          className="md:hidden relative w-full h-96 flex justify-center items-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction}>
            {hasAnimated && (
              <motion.div
                key={categories[activeIndex].id}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 300 : -300,
                    opacity: 0,
                    scale: 0.85,
                  }),
                  center: { x: 0, opacity: 1, scale: 1 },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -300 : 300,
                    opacity: 0,
                    scale: 0.85,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute w-64 rounded-3xl overflow-hidden shadow-2xl bg-white"
              >
                <div className="relative w-full h-72">
                  <Image
                    src={categories[activeIndex].image}
                    alt={categories[activeIndex].alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </div>

                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {categories[activeIndex].name}
                  </h4>

                  <button
                    onClick={handleReadMore}
                    className="mt-1 text-sm text-gray-500 hover:text-teal-600 transition-colors"
                    aria-label={`Explore ${categories[activeIndex].name} tour packages`}
                  >
                    Read More
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={prevCard}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg z-10 hover:bg-white transition-all"
            aria-label="Previous tour category"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={nextCard}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg z-10 hover:bg-white transition-all"
            aria-label="Next tour category"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeIndex ? 'bg-teal-600 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to ${categories[i].name} category`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
