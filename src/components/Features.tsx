"use client";

import { motion } from "framer-motion";
import { Feather, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Feather,
    title: "Ultra Lightweight",
    desc: "Engineered foam soles that feel like walking on air, all day long.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last",
    desc: "Reinforced stitching and premium materials made for the long run.",
  },
  {
    icon: Sparkles,
    title: "Street-Ready Design",
    desc: "Bold silhouettes and colorways designed to stand out anywhere.",
  },
];

export default function Features() {
  return (
    <section className="px-6 sm:px-12 py-28 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-5xl font-extrabold text-center mb-16"
      >
        Why Wear <span className="text-amber-700">Roger</span>
      </motion.h2>

      <div className="grid sm:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-amber-700/50 transition-colors"
          >
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-amber-700/15 flex items-center justify-center">
              <f.icon className="text-amber-700" size={26} />
            </div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
