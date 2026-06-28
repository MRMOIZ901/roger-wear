"use client";

import { motion } from "framer-motion";
import { Hammer, Leaf, Globe, Users } from "lucide-react";

const values = [
  {
    icon: Hammer,
    title: "Handcrafted Quality",
    desc: "Every pair is finished by skilled hands using full-grain leather, not assembly-line shortcuts.",
  },
  {
    icon: Leaf,
    title: "Sustainably Sourced",
    desc: "Our leather is sourced from tanneries committed to responsible, low-impact production.",
  },
  {
    icon: Globe,
    title: "Made for the Street",
    desc: "Designed in the city, tested on the street — built to move with you, not against you.",
  },
  {
    icon: Users,
    title: "Community First",
    desc: "Roger Wear started as a local shop. We still build for the people who walked in first.",
  },
];

export default function AboutContent() {
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
          BUILT BY HAND,
          <br />
          <span className="text-amber-700">WORN WITH PRIDE</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-zinc-400 text-lg max-w-xl mx-auto"
        >
          Roger Wear began in a small leather workshop with one belief:
          shoes should feel as good as they look. Years later, that
          belief still shapes everything we make.
        </motion.p>
      </section>

      <section className="px-6 sm:px-12 py-20 max-w-5xl mx-auto grid sm:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-extrabold mb-4">
            From Workshop to <span className="text-amber-700">Worldwide</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            What started as a single cobbler&apos;s bench has grown into a brand trusted
            by thousands. We never lost the craft — every stitch, sole, and seam is
            still inspected by hand before it reaches your door.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Today, Roger Wear blends old-world leatherworking with modern comfort
            technology, so you get a shoe that ages like leather should: better with time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="aspect-square rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <svg viewBox="0 0 512 512" className="w-2/3">
            <path
              d="M40 320c20-30 60-50 100-55 30-4 55-20 70-45 10-17 25-30 45-35 25-6 50 2 65 22 10 14 25 22 42 24 35 4 70-6 95-30 12-12 30-15 45-7 18 10 25 32 16 50-10 20-30 33-52 38-40 9-70 38-105 55-45 22-95 30-145 25-55-6-110-20-160-30-10-2-18-10-16-22z"
              fill="#8a5a36"
              stroke="#000"
              strokeWidth="6"
            />
            <ellipse cx="120" cy="330" rx="90" ry="18" fill="#111" />
          </svg>
        </motion.div>
      </section>

      <section className="px-6 sm:px-12 py-20 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-extrabold text-center mb-16"
        >
          What We <span className="text-amber-700">Stand For</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-amber-700/50 transition-colors"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-amber-700/15 flex items-center justify-center">
                <v.icon className="text-amber-700" size={26} />
              </div>
              <h3 className="text-lg font-bold mb-2">{v.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
