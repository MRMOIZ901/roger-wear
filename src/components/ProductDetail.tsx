"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Truck, ShieldCheck, Check, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product }: { product: Product }) {
  const sizes = product.sizes;
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="flex-1 px-6 sm:px-12 pt-32 pb-24 max-w-6xl mx-auto w-full">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.images[activeImage]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border transition-colors ${
                  i === activeImage ? "border-amber-700" : "border-white/10 hover:border-white/30"
                }`}
              >
                <Image src={img} alt={`${product.name} ${i + 1}`} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber-700 font-semibold tracking-widest uppercase text-xs">
            Roger Wear
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-amber-700">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          <p className="text-zinc-400 leading-relaxed mb-8">{product.description}</p>

          {/* Size selector */}
          <div className="mb-6">
            <span className="text-sm font-semibold text-zinc-300 block mb-3">
              Select Size {selectedSize ? `(EU ${selectedSize})` : ""}
            </span>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl border text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "bg-amber-700 border-amber-700 text-white"
                      : "border-white/15 hover:border-amber-700/50 text-zinc-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <span className="text-sm font-semibold text-zinc-300 block mb-3">Quantity</span>
            <div className="inline-flex items-center gap-4 border border-white/15 rounded-full px-4 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-6 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className="w-full flex items-center justify-center gap-2 bg-amber-700 text-white font-semibold py-4 rounded-full hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {added ? (
              <>
                <Check size={18} /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                {selectedSize ? "Add to Cart" : "Select a Size"}
              </>
            )}
          </button>

          <div className="mt-8 space-y-3 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-amber-700" />
              Free delivery on orders over Rs. 5,000
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-amber-700" />
              7-day easy returns
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mt-20 border-t border-white/10 pt-12"
      >
        <h2 className="text-2xl font-bold mb-6">Product Features</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-zinc-400">
              <Check size={18} className="text-amber-700 mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </motion.section>
    </main>
  );
}
