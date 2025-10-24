"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      rating: 5,
      text: "Our family trip to Goa was absolutely perfect! Relax Holidays took care of every detail, from the beachfront resort to the amazing water sports. The kids had a blast, and we got the relaxation we needed. Highly recommend!",
      trip: "Goa Beach Paradise"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 5,
      text: "The Himalayan trek organized by Relax Holidays was a once-in-a-lifetime experience. Professional guides, comfortable accommodations, and breathtaking views. They made everything so easy and stress-free!",
      trip: "Himalayan Adventure"
    },
    {
      id: 3,
      name: "Anjali Desai",
      location: "Pune, India",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rating: 5,
      text: "Booked a romantic getaway to Kerala backwaters with my husband. The houseboat experience was magical! Relax Holidays understood exactly what we wanted and delivered beyond expectations. Will definitely book again!",
      trip: "Kerala Romance"
    },
    {
      id: 4,
      name: "Vikram Patel",
      location: "Ahmedabad, India",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      rating: 5,
      text: "Excellent service from start to finish! Our Rajasthan heritage tour was well-planned with knowledgeable guides. The hotels were beautiful and the itinerary was perfect. Thank you Relax Holidays!",
      trip: "Rajasthan Heritage Tour"
    },
    {
      id: 5,
      name: "Meera Singh",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      rating: 5,
      text: "As a solo traveler, I was nervous about my first international trip. Relax Holidays made everything seamless! From visa assistance to airport transfers, they were with me every step. Felt safe and well taken care of.",
      trip: "Dubai Explorer"
    },
    {
      id: 6,
      name: "Arjun Reddy",
      location: "Hyderabad, India",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      rating: 5,
      text: "Corporate retreat organized by Relax Holidays was outstanding! Team building activities, comfortable accommodations, and great food. Our entire team had an amazing time. Professional and reliable service!",
      trip: "Corporate Retreat"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 px-4 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-red-500 font-semibold text-sm sm:text-base uppercase tracking-wide px-4 py-2 bg-red-50 rounded-full">
              Testimonials
            </span>
          </motion.div>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            What Our{' '}
            <span className="ml-2 text-red-500 font-signature">Travelers</span>
            <span className="ml-2 font-bold text-gray-900">Say</span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Don't just take our word for it - hear from travelers who've experienced unforgettable journeys with Relax Holidays
          </motion.p>
        </motion.div>

        {/* Mobile View - Single Card */}
        <div className="lg:hidden">
          <motion.div
            className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          >
            <motion.div
              className="absolute top-6 right-6 w-12 h-12 text-orange-100"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Quote />
            </motion.div>
            
            <div className="relative z-10">
              <motion.div 
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-orange-100 shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonials[currentIndex].location}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <motion.p 
                className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                "{testimonials[currentIndex].text}"
              </motion.p>

              <motion.div 
                className="inline-block bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                {testimonials[currentIndex].trip}
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div 
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.button
              onClick={prev}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-orange-50 transition-colors"
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </motion.button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-orange-500' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-orange-50 transition-colors"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </motion.button>
          </motion.div>
        </div>

        {/* Desktop View - Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg transition-shadow p-8 relative group hover:shadow-[0_10px_20px_rgba(220,38,38,0.5)] hover:-translate-y-2"
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
            >
              <motion.div
                className="absolute top-6 right-6 w-12 h-12 text-orange-100 group-hover:text-orange-200 transition-colors"
                initial={{ rotate: -15, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
              >
                <Quote />
              </motion.div>

              <div className="relative z-10">
                <motion.div 
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                >
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-orange-100 shadow-lg group-hover:scale-110"
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="flex gap-1 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.4 }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p 
                  className="text-gray-700 leading-relaxed mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
                >
                  "{testimonial.text}"
                </motion.p>

                <motion.div 
                  className="inline-block bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium group-hover:bg-orange-100"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {testimonial.trip}
                </motion.div>
              </div>
            </motion.div>
          ))}
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