"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail } from "lucide-react";

export default function WomenComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="flex-1 hero-gradient relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-700/15 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-16 h-16 rounded-full bg-amber-700/15 border border-amber-700/40 flex items-center justify-center mb-6"
      >
        <Bell className="text-amber-700" size={26} />
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-amber-700 font-semibold tracking-widest uppercase text-sm mb-4"
      >
        Women&apos;s Collection
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-3xl"
      >
        COMING
        <br />
        <span className="text-amber-700">SOON</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-6 text-zinc-400 text-lg max-w-md"
      >
        We&apos;re hand-crafting a women&apos;s line with the same leather quality
        you know from Roger Wear. Be the first to know when it drops.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="mt-10 flex flex-col sm:flex-row gap-3 w-full max-w-md"
      >
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-full pl-11 pr-5 py-3 bg-white/5 border border-white/10 placeholder-zinc-500 outline-none focus:border-amber-700/50 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="bg-amber-700 text-white font-semibold rounded-full px-6 py-3 hover:bg-amber-600 transition-colors whitespace-nowrap"
        >
          {submitted ? "You're on the list" : "Notify Me"}
        </button>
      </motion.form>
    </main>
  );
}
