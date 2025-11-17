'use client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/* eslint-disable */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
  trip: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
    text: 'Our family trip to Goa was absolutely perfect! Relax Holidays took care of every detail, from the beachfront resort to the amazing water sports. The kids had a blast, and we got the relaxation we needed. Highly recommend!',
    trip: 'Goa Beach Paradise',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Delhi, India',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 5,
    text: 'The Himalayan trek organized by Relax Holidays was a once-in-a-lifetime experience. Professional guides, comfortable accommodations, and breathtaking views. They made everything so easy and stress-free!',
    trip: 'Himalayan Adventure',
  },
  {
    id: 3,
    name: 'Anjali Desai',
    location: 'Pune, India',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 5,
    text: 'Booked a romantic getaway to Kerala backwaters with my husband. The houseboat experience was magical! Relax Holidays understood exactly what we wanted and delivered beyond expectations. Will definitely book again!',
    trip: 'Kerala Romance',
  },
  {
    id: 4,
    name: 'Vikram Patel',
    location: 'Ahmedabad, India',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 5,
    text: 'Excellent service from start to finish! Our Rajasthan heritage tour was well-planned with knowledgeable guides. The hotels were beautiful and the itinerary was perfect. Thank you Relax Holidays!',
    trip: 'Rajasthan Heritage Tour',
  },
  {
    id: 5,
    name: 'Meera Singh',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    rating: 5,
    text: 'As a solo traveler, I was nervous about my first international trip. Relax Holidays made everything seamless! From visa assistance to airport transfers, they were with me every step. Felt safe and well taken care of.',
    trip: 'Dubai Explorer',
  },
  {
    id: 6,
    name: 'Arjun Reddy',
    location: 'Hyderabad, India',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    rating: 5,
    text: 'Corporate retreat organized by Relax Holidays was outstanding! Team building activities, comfortable accommodations, and great food. Our entire team had an amazing time. Professional and reliable service!',
    trip: 'Corporate Retreat',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlay) return;

    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlay, next]);

  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  return (
    <section
      className="py-16 px-4 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-orange-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-red-50 text-red-500 font-semibold text-sm uppercase tracking-wide rounded-full mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Testimonials
          </motion.span>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            What Our{' '}
            <span className="font-signature text-red-500">Travelers</span>{' '}
            <span className="text-gray-900">Say</span>
          </motion.h2>

          <motion.p
            className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Don&apos;t just take our word for it hear from travelers who&apos;ve experienced unforgettable journeys with Relax Holidays.
          </motion.p>
        </motion.div>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 will-change-transform"
                style={{ willChange: 'transform, opacity' }}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
                whileHover={{ scale: 1.02 }}
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-orange-100" />

                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-orange-100 shadow-lg"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-gray-500 text-sm">{testimonials[currentIndex].location}</p>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < testimonials[currentIndex].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 italic">
                  &ldquo;{testimonials[currentIndex].text}&rdquo;
                </p>

                <span className="inline-block bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                  {testimonials[currentIndex].trip}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-white shadow-lg hover:bg-orange-50 transition-colors z-50 relative"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-orange-500' : 'w-2 bg-gray-300'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-selected={index === currentIndex}
                    role="tab"
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-3 rounded-full bg-white shadow-lg hover:bg-orange-50 transition-colors z-50 relative"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg p-8 relative group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 will-change-transform"
              style={{ willChange: 'transform, opacity' }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-orange-100 group-hover:text-orange-200 transition-colors" />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-orange-100 shadow-lg group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-4 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <span className="inline-block bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium group-hover:bg-orange-100 transition-colors">
                {testimonial.trip}
              </span>
            </motion.div>
          )) }
        </div>
      </div>

      {/* Global Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        .font-signature {
          font-family: 'Great Vibes', cursive;
          font-weight: 400;
          font-size: 1.2em;
        }

        /* === Added to prevent flicker of fixed UI (header / whatsapp / hamburger) during animations ===
           Promotes fixed elements to their own composite layer and hints the browser about upcoming changes.
           This is the minimal, non-invasive fix — it usually resolves flicker caused by heavy animating content.
        */
        header,
        .whatsapp-float,
        .hamburger-btn,
        .fixed {
          -webkit-transform: translate3d(0,0,0);
          transform: translate3d(0,0,0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
}
