"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { Truck, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!form.name || !form.phone || !form.address || !form.city) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Insert order
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          customer_name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          total: totalPrice,
          status: "pending",
        })
        .select()
        .single();

      if (orderErr) throw orderErr;

      // Insert order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_slug: item.slug,
        product_name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsErr } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsErr) throw itemsErr;

      clearCart();
      router.push(`/order-confirmation?id=${order.id}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 flex items-center justify-center flex-col gap-4 pt-32 pb-24">
          <p className="text-zinc-400 text-lg">Your cart is empty.</p>
          <a href="/shop" className="text-amber-700 hover:underline">
            Continue Shopping
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex-1 px-6 sm:px-12 pt-32 pb-24 max-w-5xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold mb-10"
        >
          Check<span className="text-amber-700">out</span>
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-bold mb-6 text-zinc-200">Delivery Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Muhammad Ali"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-700 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Phone Number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="03XX-XXXXXXX"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-700 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Full Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House No, Street, Area"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-700 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Karachi"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-700 transition-colors"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              {/* COD badge */}
              <div className="flex items-center gap-3 bg-amber-700/10 border border-amber-700/30 rounded-xl px-4 py-3 mt-2">
                <Truck size={18} className="text-amber-700 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-700">Cash on Delivery</p>
                  <p className="text-xs text-zinc-400">Pay when your order arrives at your door.</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-600 text-white font-bold py-4 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  "Place Order — Cash on Delivery"
                )}
              </button>

              <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center mt-1">
                <ShieldCheck size={13} className="text-amber-700" />
                Your information is safe with us
              </div>
            </form>
          </motion.div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-6 text-zinc-200">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.slug}-${item.size}`}
                  className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
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
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-zinc-400 text-sm">Size: EU {item.size} · Qty: {item.quantity}</p>
                    <p className="text-amber-700 font-bold mt-1">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5 space-y-3">
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white">Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Delivery</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-3">
                <span>Total</span>
                <span className="text-amber-700">Rs. {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
