"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  { src: "/products/artisan-edge-black/1.jpg", name: "Artisan Edge" },
  { src: "/products/royal-crest-black/1.jpg", name: "Royal Crest" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

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
        Roger Wear blends premium comfort with bold leather craftsmanship.
        Built for movement, made to turn heads.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-10 flex gap-4"
      >
        <Link
          href="/shop"
          className="bg-amber-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-amber-600 transition-transform hover:scale-105"
        >
          Shop Collection
        </Link>
        <Link
          href="/our-story"
          className="border border-white/20 px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
        >
          Explore More
        </Link>
      </motion.div>

      <div className="relative mt-16 w-[280px] sm:w-[420px] md:w-[480px] aspect-square">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[active].src}
            initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: 4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 rounded-3xl overflow-hidden bg-white/5 border border-white/10 drop-shadow-[0_30px_60px_rgba(138,90,54,0.25)]"
          >
            <Image
              src={slides[active].src}
              alt={slides[active].name}
              fill
              priority
              sizes="(max-width: 640px) 280px, (max-width: 768px) 420px, 480px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setActive(i)}
              aria-label={`Show ${s.name}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-amber-700" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
