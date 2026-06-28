"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero-gradient relative flex flex-col items-center justify-center text-center pt-40 pb-24 px-6 overflow-hidden min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-700/15 rounded-full blur-3xl" />
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-amber-700 font-semibold tracking-widest uppercase text-sm mb-4"
      >
        Spring / Summer Collection
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-5xl sm:text-7xl md:text-8xl font-extrabold leading-[0.95] tracking-tight max-w-4xl"
      >
        STEP INTO
        <br />
        <span className="text-amber-700">YOUR STYLE</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-6 text-zinc-400 text-lg max-w-xl"
      >
        Roger Wear blends premium comfort with bold street design.
        Built for movement, made to turn heads.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-10 flex gap-4"
      >
        <button className="bg-amber-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-amber-600 transition-transform hover:scale-105">
          Shop Collection
        </button>
        <button className="border border-white/20 px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
          Explore More
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        whileHover={{ rotate: 0, scale: 1.04 }}
        className="mt-16 w-[280px] sm:w-[420px] md:w-[520px]"
      >
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-[0_30px_60px_rgba(253,224,71,0.25)]">
          <path d="M40 320c20-30 60-50 100-55 30-4 55-20 70-45 10-17 25-30 45-35 25-6 50 2 65 22 10 14 25 22 42 24 35 4 70-6 95-30 12-12 30-15 45-7 18 10 25 32 16 50-10 20-30 33-52 38-40 9-70 38-105 55-45 22-95 30-145 25-55-6-110-20-160-30-10-2-18-10-16-22z" fill="#8a5a36"/>
          <path d="M40 320c20-30 60-50 100-55 30-4 55-20 70-45 10-17 25-30 45-35 25-6 50 2 65 22 10 14 25 22 42 24 35 4 70-6 95-30 12-12 30-15 45-7 18 10 25 32 16 50-10 20-30 33-52 38-40 9-70 38-105 55-45 22-95 30-145 25-55-6-110-20-160-30-10-2-18-10-16-22z" stroke="#000" strokeWidth="6"/>
          <ellipse cx="120" cy="330" rx="90" ry="18" fill="#111"/>
        </svg>
      </motion.div>
    </section>
  );
}
