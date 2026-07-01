"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    src: "/hero-brown.jpg",
    tag: "New Collection",
    heading: "CRAFTED FOR",
    highlight: "GREATNESS",
    sub: "Premium leather shoes that speak before you do.",
  },
  {
    src: "/hero-black-1.jpg",
    tag: "Best Seller",
    heading: "STEP INTO",
    highlight: "YOUR STYLE",
    sub: "Handcrafted leather. Built for movement, made to turn heads.",
  },
  {
    src: "/hero-black-2.jpg",
    tag: "Trending Now",
    heading: "WEAR THE",
    highlight: "DIFFERENCE",
    sub: "Roger Wear — where comfort meets bold craftsmanship.",
  },
];

const badges = [
  "100% Genuine Leather",
  "Cash on Delivery",
  "7-Day Returns",
  "Pakistan-wide",
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[active];

  return (
    <>
      {/* ── DESKTOP ── */}
      <section className="hidden md:block relative min-h-screen overflow-hidden">

        {/* Full screen background image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slide.src}
              alt="Roger Wear"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Very subtle vignette — just edges, not center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

        {/* Frosted glass card — left side, vertically centered */}
        <div className="absolute inset-0 flex items-center">
          <div className="ml-6 xl:ml-10 w-72 xl:w-80 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-3xl p-6 xl:p-8"
              style={{
                background: "rgba(0,0,0,0.60)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Tag */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={slide.tag}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="inline-block bg-amber-700/30 border border-amber-700/50 text-amber-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4"
                >
                  {slide.tag}
                </motion.span>
              </AnimatePresence>

              {/* Heading */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={slide.heading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl xl:text-4xl font-extrabold leading-tight tracking-tight mb-3"
                >
                  {slide.heading}
                  <br />
                  <span className="text-amber-700">{slide.highlight}</span>
                </motion.h1>
              </AnimatePresence>

              {/* Subtitle */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={slide.sub}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-zinc-300 text-xs leading-relaxed mb-5"
                >
                  {slide.sub}
                </motion.p>
              </AnimatePresence>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-1.5 mb-6">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="flex items-center gap-1 text-xs text-zinc-300 bg-white/8 border border-white/10 px-2 py-1 rounded-full truncate"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-700 shrink-0" />
                    {b}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <Link
                  href="/shop"
                  className="bg-amber-700 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 text-sm text-center"
                >
                  Shop Now
                </Link>
                <Link
                  href="/our-story"
                  className="border border-white/25 hover:bg-white/10 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm text-center"
                >
                  Our Story
                </Link>
              </div>

              {/* Dots */}
              <div className="flex gap-2 mt-7">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === active ? "w-7 bg-amber-700" : "w-2 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MOBILE ── */}
      <section className="flex flex-col md:hidden min-h-screen pt-20">

        {/* Shoe image — top, clean, no text */}
        <div className="relative flex-1 overflow-hidden min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src={slide.src}
                alt="Roger Wear"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span
              key={slide.tag}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 left-4 bg-amber-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
            >
              {slide.tag}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Text panel — bottom, pure black */}
        <div className="bg-black px-6 pt-7 pb-10 shrink-0">
          <AnimatePresence mode="wait">
            <motion.h1
              key={slide.heading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold leading-tight tracking-tight mb-3"
            >
              {slide.heading}
              <br />
              <span className="text-amber-700">{slide.highlight}</span>
            </motion.h1>
          </AnimatePresence>

          <p className="text-zinc-400 text-sm mb-5 leading-relaxed">{slide.sub}</p>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {badges.map((b) => (
              <span
                key={b}
                className="flex items-center gap-1.5 text-xs text-zinc-300 bg-white/5 border border-white/10 px-3 py-2 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                {b}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/shop" className="bg-amber-700 hover:bg-amber-600 text-white font-bold px-6 py-4 rounded-full text-center transition-colors">
              Shop Collection
            </Link>
            <Link href="/our-story" className="border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center hover:bg-white/5 transition-colors">
              Our Story
            </Link>
          </div>

          <div className="flex justify-center gap-2 mt-7">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-amber-700" : "w-2 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
