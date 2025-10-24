'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import { X } from 'lucide-react';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      url: "/Photo_1.jpg",
      title: "Tropical Paradise",
      span: "row-span-2"
    },
    {
      url: "https://images.unsplash.com/photo-1543169564-be8896b30cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      title: "Mountain Adventures"
    },
    {
      url: "https://images.unsplash.com/photo-1593131540982-57778192fc21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      title: "European Cities"
    },
    {
      url: "https://images.unsplash.com/photo-1602410125631-7e736e36797c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      title: "Safari Expeditions",
      span: "col-span-2"
    },
    {
      url: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      title: "Group Adventures"
    },
    {
      url: "https://images.unsplash.com/photo-1722409195473-d322e99621e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      title: "Luxury Resorts"
    },
    {
      url: "https://images.unsplash.com/photo-1665332025142-54d6daee4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      title: "Cultural Wonders"
    },
    {
      url: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      title: "Northern Lights",
      span: "row-span-2"
    },
    {
      url: "https://images.unsplash.com/photo-1507669653186-6d573feb190c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      title: "Desert Dreams"
    },
    {
      url: "https://images.unsplash.com/photo-1746900830074-baf6ddf20bca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      title: "Ocean Cruises"
    }
  ];

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
            <span className="ml-2 font-signature text-5xl text-red-600">
              Dreams
            </span>
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
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${image.span || ''}`}
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
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
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
          />
        </motion.div>
      )}
    </section>
  );
}
