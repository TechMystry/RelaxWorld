'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    { url: "/Photo_1.jpg", title: "Tropical Paradise", span: "row-span-2" },
    { url: "/Photo_2.jpg", title: "Mountain Adventures" },
    { url: "/Photo_3.jpg", title: "European Cities" },
    { url: "/Photo_4.jpg", title: "Safari Expeditions", span: "col-span-2" },
    { url: "/Photo_5.jpg", title: "Group Adventures" },
    { url: "/Photo_6.jpg", title: "Luxury Resorts" },
    { url: "/Photo_7.jpg", title: "Cultural Wonders" },
    { url: "/Photo_8.jpg", title: "Northern Lights", span: "row-span-2" },
    { url: "/Photo_9.jpg", title: "Desert Dreams" },
    { url: "/Photo_10.jpg", title: "Ocean Cruises" },
  ];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-black">
            Gallery of{" "}
            <span className="ml-2 font-signature text-5xl text-red-600">Dreams</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            A glimpse into the extraordinary experiences awaiting you
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${image.span || ''}`}
              onClick={() => setSelectedImage(image.url)}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-semibold">{image.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <Image
                src={selectedImage}
                alt="Gallery"
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
