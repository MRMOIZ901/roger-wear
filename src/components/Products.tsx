"use client";

import { motion } from "framer-motion";

const products = [
  { name: "Roger Stride", price: "$129", color: "#8a5a36" },
  { name: "Roger Pulse", price: "$149", color: "#f87171" },
  { name: "Roger Glide", price: "$119", color: "#60a5fa" },
  { name: "Roger Edge", price: "$159", color: "#4ade80" },
];

export default function Products() {
  return (
    <section className="px-6 sm:px-12 py-28 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-5xl font-extrabold text-center mb-16"
      >
        New <span className="text-amber-700">Drops</span>
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="group bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer"
          >
            <div className="aspect-square rounded-xl mb-5 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/10 to-transparent">
              <svg viewBox="0 0 512 512" className="w-3/4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <path
                  d="M40 320c20-30 60-50 100-55 30-4 55-20 70-45 10-17 25-30 45-35 25-6 50 2 65 22 10 14 25 22 42 24 35 4 70-6 95-30 12-12 30-15 45-7 18 10 25 32 16 50-10 20-30 33-52 38-40 9-70 38-105 55-45 22-95 30-145 25-55-6-110-20-160-30-10-2-18-10-16-22z"
                  fill={p.color}
                  stroke="#000"
                  strokeWidth="6"
                />
                <ellipse cx="120" cy="330" rx="90" ry="18" fill="#111" />
              </svg>
            </div>
            <h3 className="font-bold text-lg">{p.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-amber-700 font-semibold">{p.price}</span>
              <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">
                View →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
