"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="px-6 sm:px-12 py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto bg-amber-700 text-white rounded-3xl px-8 sm:px-16 py-16 text-center relative overflow-hidden"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-black/5"
        />
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
          Get 15% Off Your First Pair
        </h2>
        <p className="text-black/70 mb-8 max-w-md mx-auto">
          Join the Roger Wear community and be the first to know about new drops.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-full px-5 py-3 bg-black/10 placeholder-black/50 outline-none focus:bg-white transition-colors"
          />
          <button
            type="submit"
            className="bg-black text-white font-semibold rounded-full px-6 py-3 hover:bg-zinc-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  );
}
