"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { Product } from "@/lib/supabase";

export default function CatalogGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="relative max-w-sm mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search shoes..."
          className="w-full rounded-full pl-11 pr-5 py-3 bg-white/5 border border-white/10 placeholder-zinc-500 outline-none focus:border-amber-700/50 transition-colors"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
            whileHover={{ y: -8 }}
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

      {filtered.length === 0 && (
        <p className="text-zinc-500 text-center py-20">No shoes match &ldquo;{query}&rdquo;.</p>
      )}
    </div>
  );
}
