"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Wrong password. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-700/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-amber-700" />
          </div>
          <h1 className="text-2xl font-extrabold">
            ROGER<span className="text-amber-700">WEAR</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-700 transition-colors"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-600 text-white font-bold py-3.5 rounded-full transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
