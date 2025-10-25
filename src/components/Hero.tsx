'use client';

import Head from "next/head";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    } else {
      controls.start({ opacity: 0, y: 40 });
    }
  }, [controls, inView]);

  return (
    <main className="relative overflow-hidden">
      <Head>
        <title>WanderAway — Discover Your Next Adventure</title>
        <meta
          name="description"
          content="Discover unforgettable travel experiences — from hidden gems to bucket-list destinations."
        />
      </Head>

      <div className="relative min-h-screen flex flex-col-reverse md:flex-row bg-black">
        {/* Background */}
        <Image
          src="/Hero.jpg"
          alt="Travel background with mountains and sea"
          fill
          priority
          className="object-cover object-center select-none will-change-transform brightness-90"
          sizes="100vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />

        {/* Content */}
        <div
          ref={ref}
          className="relative z-10 container mx-auto px-5 sm:px-8 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0"
        >
          {/* Text Section */}
          <motion.div
            animate={controls}
            initial={{ opacity: 0, y: 40 }}
            className="max-w-lg text-center md:text-left order-1 md:order-1"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg">
              Turn Your <span className="text-yellow-400 font-italic">Dreams</span> Into Destination
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-yellow-200 mb-4">
              Adventure. Culture. Memories.
            </p>
            <p className="text-gray-100 text-base sm:text-lg md:text-xl">
              We create unforgettable travel experiences — from hidden gems to bucket-list destinations.
            </p>
          </motion.div>

          {/* Polaroid Photos */}
          <div className="relative w-full md:w-1/2 flex justify-center md:justify-end order-0 md:order-2 mb-8 md:mb-0">
            <div className="relative w-[90%] sm:w-[520px] md:w-[620px] h-[320px] sm:h-[420px] flex items-center justify-center">
              {/* Photo 1 */}
              <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 40, rotate: -10 }}
                whileHover={{ rotate: -4, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="absolute bg-white p-2 sm:p-3 rounded-lg shadow-2xl shadow-indigo-500/20 top-10 left-8 sm:top-16 sm:left-16 z-10 will-change-transform"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-md" />
                <Image
                  src="/Photo_1.jpg"
                  alt="Tropical beach with palm trees"
                  width={224}
                  height={288}
                  loading="lazy"
                  className="rounded-md object-cover w-44 h-56 sm:w-56 sm:h-72"
                />
              </motion.div>

              {/* Photo 2 */}
              <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 40, rotate: 10 }}
                whileHover={{ rotate: 2, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="absolute bg-white p-2 sm:p-3 rounded-lg shadow-2xl shadow-indigo-500/20 top-6 right-10 sm:top-12 sm:right-20 z-20 will-change-transform"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-md" />
                <Image
                  src="/Photo_2.jpg"
                  alt="Mountain adventure with hikers"
                  width={224}
                  height={288}
                  loading="lazy"
                  className="rounded-md object-cover w-44 h-56 sm:w-56 sm:h-72"
                />
              </motion.div>

              {/* Photo 3 */}
              <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 40, rotate: -6 }}
                whileHover={{ rotate: -1, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="absolute bg-white p-2 sm:p-3 rounded-lg shadow-2xl shadow-indigo-500/20 top-28 left-20 sm:top-36 sm:left-40 z-30 will-change-transform"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-md" />
                <Image
                  src="/Photo_3.jpg"
                  alt="City exploration with skyline view"
                  width={224}
                  height={288}
                  loading="lazy"
                  className="rounded-md object-cover w-44 h-56 sm:w-56 sm:h-72"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
