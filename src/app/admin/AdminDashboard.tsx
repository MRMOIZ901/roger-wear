"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Phone, MapPin, ChevronDown, ChevronUp,
  LogOut, RefreshCw, CheckCircle, Truck, Clock, XCircle, Zap,
} from "lucide-react";

type OrderItem = {
  id: string;
  product_slug: string;
  size: number;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  total: number;
  status: string;
  order_items: OrderItem[];
};

const STATUS_OPTIONS = ["pending", "confirmed", "dispatched", "delivered", "cancelled"];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  dispatched: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  delivered: "bg-green-500/15 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock size={14} />,
  confirmed: <CheckCircle size={14} />,
  dispatched: <Truck size={14} />,
  delivered: <CheckCircle size={14} />,
  cancelled: <XCircle size={14} />,
};

export default function AdminDashboard({ orders: initial }: { orders: Order[] }) {
  const [orders, setOrders] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const router = useRouter();

  const handleRevalidate = async () => {
    setRefreshing(true);
    await fetch("/api/admin/revalidate", { method: "POST" });
    setRefreshing(false);
    setRefreshed(true);
    setTimeout(() => setRefreshed(false), 3000);
  };

  const handleStatusChange = async (id: string, status: string) => {
    setUpdating(id);
    await fetch("/api/admin/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    setUpdating(null);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const counts: Record<string, number> = { all: orders.length };
  STATUS_OPTIONS.forEach((s) => {
    counts[s] = orders.filter((o) => o.status === s).length;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold">
              ROGER<span className="text-amber-700">WEAR</span>{" "}
              <span className="text-zinc-400 font-normal text-base">Admin</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRevalidate}
              disabled={refreshing}
              title="Publish new products to website instantly"
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                refreshed
                  ? "bg-green-500/20 border-green-500/50 text-green-400"
                  : "bg-amber-700/20 border-amber-700/50 text-amber-500 hover:bg-amber-700/30"
              } disabled:opacity-50`}
            >
              {refreshing ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : refreshed ? (
                <CheckCircle size={14} />
              ) : (
                <Zap size={14} />
              )}
              {refreshing ? "Refreshing..." : refreshed ? "Site Updated!" : "Refresh Site"}
            </button>
            <button
              onClick={() => router.refresh()}
              className="text-zinc-400 hover:text-white transition-colors"
              title="Reload orders"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {["all", ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                filter === s
                  ? "bg-amber-700/20 border-amber-700/50 text-white"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20"
              }`}
            >
              <p className="text-2xl font-bold text-white">{counts[s] ?? 0}</p>
              <p className="text-xs capitalize mt-0.5">{s}</p>
            </button>
          ))}
        </div>

        {/* Orders list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center text-zinc-500 py-16">No orders yet.</div>
          )}
          {filtered.map((order) => (
            <motion.div
              key={order.id}
              layout
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Order header */}
              <div className="flex flex-wrap items-center gap-4 px-6 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-white">{order.customer_name}</span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[order.status] ?? ""}`}
                    >
                      {STATUS_ICONS[order.status]}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-1.5 text-sm text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} className="text-amber-700" />
                      {order.phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-amber-700" />
                      {order.address}, {order.city}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      {new Date(order.created_at).toLocaleString("en-PK", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-amber-700 font-bold text-lg">
                    Rs. {order.total.toLocaleString()}
                  </span>

                  {/* Status changer */}
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    disabled={updating === order.id}
                    className="bg-zinc-900 border border-white/15 text-sm text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-700 disabled:opacity-50 cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {expanded === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {/* Expanded items */}
              <AnimatePresence>
                {expanded === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border-t border-white/10"
                  >
                    <div className="px-6 py-4">
                      <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider font-semibold">
                        Items Ordered
                      </p>
                      <div className="space-y-2">
                        {order.order_items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
                          >
                            <div className="flex items-center gap-3">
                              <Package size={16} className="text-amber-700" />
                              <div>
                                <p className="text-sm font-medium capitalize">
                                  {item.product_slug.replace(/-/g, " ")}
                                </p>
                                <p className="text-xs text-zinc-400">
                                  Size EU {item.size} · Qty {item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-amber-700">
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-zinc-500 mt-3">
                        Order ID: <span className="font-mono text-zinc-400">{order.id}</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
