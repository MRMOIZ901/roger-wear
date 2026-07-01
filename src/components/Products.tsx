"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/supabase";

export default function Products({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  // Show 4 at a time
  const VISIBLE = 4;
  const total = products.length;

  const paginate = (dir: number) => {
    setDirection(dir);
    setActive((prev) => (prev + dir * VISIBLE + total) % total);
  };

  useEffect(() => {
    const id = setInterval(() => paginate(1), 4000);
    return () => clearInterval(id);
  }, [active]);

  const visible = Array.from({ length: VISIBLE }, (_, i) => products[(active + i) % total]);

  return (
    <section className="px-6 sm:px-12 py-28 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <Link
          href="/new-drops"
          className="text-3xl sm:text-5xl font-extrabold hover:opacity-80 transition-opacity inline-block"
        >
          New <span className="text-amber-700">Drops</span>
        </Link>
      </motion.div>

      {/* Sliding row */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 200 : -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -200 : 200 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {visible.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group block bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-700/40 transition-colors"
              >
                <div className="relative aspect-square rounded-xl mb-5 overflow-hidden bg-white/5">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-bold text-lg">{p.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-amber-700 font-semibold">
                    Rs. {p.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={() => paginate(-1)}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-amber-700/50 hover:text-amber-700 transition-colors"
        >
          ←
        </button>
        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(total / VISIBLE) }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i * VISIBLE > active ? 1 : -1); setActive(i * VISIBLE); }}
              className={`h-2 rounded-full transition-all ${
                Math.floor(active / VISIBLE) === i ? "w-6 bg-amber-700" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => paginate(1)}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-amber-700/50 hover:text-amber-700 transition-colors"
        >
          →
        </button>
      </div>

      <div className="text-center mt-10">
        <Link
          href="/shop"
          className="inline-block border border-white/15 px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
        >
          View All Shoes
        </Link>
      </div>
    </section>
  );
}
