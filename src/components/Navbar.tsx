"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "New Drops", href: "/new-drops" },
  { label: "Our Story", href: "/our-story" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems, setCartOpen } = useCart();

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10"
      >
        <div className="flex items-center justify-between px-6 sm:px-12 py-5">
          <Link href="/" className="text-2xl font-extrabold tracking-tight" onClick={() => setOpen(false)}>
            ROGER<span className="text-amber-700">WEAR</span>
          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-300">
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-amber-700 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-2 bg-amber-700 text-white font-semibold px-5 py-2 rounded-full hover:bg-amber-600 transition-colors"
            >
              <ShoppingBag size={16} />
              Shop Now
            </Link>
            {/* Cart icon */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative text-white hover:text-amber-700 transition-colors"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="md:hidden text-white relative z-[60]"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 z-40"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="md:hidden fixed top-0 right-0 h-full w-72 bg-zinc-950 border-l border-white/10 z-50"
      >
        <div className="flex flex-col px-6 py-6 gap-5 text-zinc-300 font-medium mt-20">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="hover:text-amber-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 bg-amber-700 text-white font-semibold px-5 py-3 rounded-full hover:bg-amber-600 transition-colors mt-2"
          >
            <ShoppingBag size={16} />
            Shop Now
          </Link>
        </div>
      </motion.div>
    </>
  );
}
