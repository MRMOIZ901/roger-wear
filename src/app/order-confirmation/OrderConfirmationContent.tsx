"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Truck, ShoppingBag } from "lucide-react";

export default function OrderConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("id");

  return (
    <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-24 h-24 bg-amber-700/15 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle size={48} className="text-amber-700" />
        </motion.div>

        <h1 className="text-4xl font-extrabold mb-3">
          Order <span className="text-amber-700">Confirmed!</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-2">
          Thank you for shopping with Roger Wear.
        </p>
        {orderId && (
          <p className="text-zinc-500 text-sm mb-8">
            Order ID: <span className="text-zinc-300 font-mono">{orderId.slice(0, 8).toUpperCase()}</span>
          </p>
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left space-y-4">
          <div className="flex items-start gap-3">
            <Truck size={20} className="text-amber-700 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Cash on Delivery</p>
              <p className="text-zinc-400 text-sm">
                Your order will be delivered in 3–5 business days. Pay when it arrives.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShoppingBag size={20} className="text-amber-700 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm">What's next?</p>
              <p className="text-zinc-400 text-sm">
                Our team will call you to confirm the order before dispatch.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/shop"
          className="inline-block bg-amber-700 hover:bg-amber-600 text-white font-bold px-10 py-3.5 rounded-full transition-colors"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </main>
  );
}
