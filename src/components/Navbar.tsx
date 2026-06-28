"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Menu } from "lucide-react";

const navLinks = [
  { label: "Men", href: "#" },
  { label: "Women", href: "/women" },
  { label: "New Drops", href: "#" },
  { label: "Our Story", href: "/our-story" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-5 backdrop-blur-md bg-black/40 border-b border-white/10"
    >
      <Link href="/" className="text-2xl font-extrabold tracking-tight">
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
        <button className="hidden sm:flex items-center gap-2 bg-amber-700 text-white font-semibold px-5 py-2 rounded-full hover:bg-amber-600 transition-colors">
          <ShoppingBag size={16} />
          Shop Now
        </button>
        <Menu className="md:hidden" />
      </div>
    </motion.nav>
  );
}
