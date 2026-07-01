"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, removeItem, updateQty, totalItems, totalPrice, cartOpen, setCartOpen } = useCart();

  return (
    <>
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-40"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ x: cartOpen ? 0 : "100%" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed top-0 right-0 h-full w-[340px] sm:w-[400px] bg-zinc-950 border-l border-white/10 z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-700" />
            <span className="font-bold text-lg">Your Cart</span>
            {totalItems > 0 && (
              <span className="bg-amber-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500 gap-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <button
                onClick={() => setCartOpen(false)}
                className="text-amber-700 hover:underline text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.slug}-${item.size}`}
                className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-3"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white/5 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">Size: EU {item.size}</p>
                  <p className="text-amber-700 font-bold text-sm mt-1">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-white/15 rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQty(item.slug, item.size, item.quantity - 1)
                            : removeItem(item.slug, item.size)
                        }
                        className="px-2.5 py-1 text-sm hover:bg-white/10 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.slug, item.size, item.quantity + 1)}
                        className="px-2.5 py-1 text-sm hover:bg-white/10 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.slug, item.size)}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
              <span className="text-white font-bold">Rs. {totalPrice.toLocaleString()}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full bg-amber-700 hover:bg-amber-600 text-white font-bold text-center py-3.5 rounded-full transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => setCartOpen(false)}
              className="block w-full text-center text-zinc-400 hover:text-white text-sm transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
