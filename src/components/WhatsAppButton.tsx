'use client';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919404014786"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-10 z-[9999] bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
      style={{
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48C18.1 1.05 14.5 0 11 0 4.92 0 0 4.92 0 11c0 1.93.63 3.72 1.7 5.19L0 24l7.9-2.07c1.42.77 3.03 1.24 4.6 1.24 6.08 0 11-4.92 11-11 0-3.5-1.05-7.1-3.98-9.69zM11.02 21.73c-1.38 0-2.74-.36-3.94-1.04l-.28-.17-4.67 1.22 1.25-4.55-.18-.29c-.9-1.41-1.37-3.03-1.37-4.7 0-5.17 4.23-9.4 9.4-9.4 2.51 0 4.87.98 6.63 2.74 1.76 1.76 2.74 4.12 2.74 6.63 0 5.17-4.23 9.4-9.4 9.4z" />
      </svg>
    </a>
  );
}
