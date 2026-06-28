"use client";

import { motion } from "framer-motion";
import { MapPin, Award, Clock, Quote } from "lucide-react";

const timeline = [
  {
    year: "2014",
    icon: MapPin,
    title: "A Small Workshop Opens",
    desc: "Roger started hand-stitching boots in a one-room leather workshop, selling pairs to neighbors and friends.",
  },
  {
    year: "2017",
    icon: Award,
    title: "First Big Order",
    desc: "A local boutique placed an order for 200 pairs. We hired our first two leatherworkers to keep up.",
  },
  {
    year: "2020",
    icon: Clock,
    title: "Going Online",
    desc: "We took the workshop digital, shipping our first leather sneakers to customers across the country.",
  },
  {
    year: "2026",
    icon: Award,
    title: "Worn Worldwide",
    desc: "Today, Roger Wear ships globally — but every pair still passes through the hands of a real craftsman.",
  },
];

export default function OurStoryContent() {
  return (
    <main className="flex-1">
      <section className="hero-gradient relative px-6 sm:px-12 pt-40 pb-24 text-center overflow-hidden">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-amber-700 font-semibold tracking-widest uppercase text-sm mb-4 block"
        >
          Our Story
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-3xl mx-auto"
        >
          ONE BENCH,
          <br />
          <span className="text-amber-700">ONE BELIEF</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-zinc-400 text-lg max-w-xl mx-auto"
        >
          Every brand has a beginning. Ours started with leather scraps,
          a borrowed sewing machine, and a stubborn refusal to compromise on quality.
        </motion.p>
      </section>

      <section className="px-6 sm:px-12 py-20 max-w-3xl mx-auto">
        <div className="relative border-l border-white/10 pl-10">
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative mb-14 last:mb-0"
            >
              <span className="absolute -left-[3.25rem] top-0 w-10 h-10 rounded-full bg-amber-700/15 border border-amber-700/40 flex items-center justify-center">
                <t.icon size={18} className="text-amber-700" />
              </span>
              <span className="text-amber-700 font-bold text-sm tracking-wide">{t.year}</span>
              <h3 className="text-2xl font-extrabold mt-1 mb-2">{t.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 sm:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl px-8 sm:px-16 py-14 text-center relative"
        >
          <Quote className="text-amber-700 mx-auto mb-6" size={36} />
          <p className="text-xl sm:text-2xl font-medium leading-relaxed text-zinc-200">
            &ldquo;We never set out to be the biggest. We just wanted every pair
            leaving our bench to be one we&apos;d wear ourselves.&rdquo;
          </p>
          <p className="mt-6 text-amber-700 font-semibold">— Roger, Founder</p>
        </motion.div>
      </section>
    </main>
  );
}
