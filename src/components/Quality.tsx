"use client";

import { motion } from "framer-motion";

const qualities = [
  {
    icon: "🪡",
    title: "Premium Leather",
    description:
      "Every pair is crafted from full-grain leather, selected for its natural texture, durability, and rich finish.",
  },
  {
    icon: "🤝",
    title: "Handcrafted Excellence",
    description:
      "Our skilled artisans hand-stitch every detail — ensuring each shoe meets the highest standard before it reaches you.",
  },
  {
    icon: "👑",
    title: "Luxury That Lasts",
    description:
      "Roger Wear shoes are built to age beautifully. With proper care, they last years — not seasons.",
  },
  {
    icon: "✅",
    title: "Quality Guaranteed",
    description:
      "Every pair passes a strict quality check. If you are not satisfied, we make it right — no questions asked.",
  },
];

export default function Quality() {
  return (
    <section className="py-20 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-amber-400 uppercase tracking-widest text-sm font-semibold mb-3">
            Our Promise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Best Quality. <br /> No Compromise.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            At Roger Wear, quality is not a feature — it is the foundation of
            everything we make.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
