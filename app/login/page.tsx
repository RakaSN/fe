"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Key, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Panggil fungsi login dari NextAuth
    const res = await signIn("credentials", {
      username: form.username,
      password: form.password,
      redirect: false, // Jangan redirect otomatis, kita handle manual
    });

    if (res?.error) {
      setError("Username atau Password salah, Bang!");
      setLoading(false);
    } else {
      // Kalau sukses, lempar ke Dashboard
      router.push("/admin/pengaduan");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-slate-800 p-4 rounded-2xl shadow-lg border border-slate-700">
            <ShieldCheck size={40} className="text-indigo-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-white mb-2">Admin Portal</h1>
        <p className="text-slate-400 text-center text-sm mb-8">
          Silakan masuk untuk mengelola laporan sekolah.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative group">
            <User className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Key className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2"
            >
              <Lock size={16} />
              {error}
            </motion.div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : (
              <>
                Masuk Dashboard <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}