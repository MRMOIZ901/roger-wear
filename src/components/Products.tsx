"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/lib/products";

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

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {products.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -10, scale: 1.03 }}
          >
            <Link
              href={`/products/${p.slug}`}
              className="group block bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="relative aspect-square rounded-xl mb-5 overflow-hidden bg-white/5">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
