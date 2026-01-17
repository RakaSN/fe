"use client";
import { motion } from "framer-motion";
import { 
  Code2, Database, Server, Cpu, Globe, 
  Layers, ShieldCheck, Zap, ArrowRightLeft, 
  Braces, Box
} from "lucide-react";
import DeveloperCard from "@/components/DeveloperCard";

// Konfigurasi Tech Stack
const stack = [
  {
    category: "Frontend (The Face)",
    color: "cyan",
    icon: <Globe size={40} className="text-cyan-400" />,
    techs: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    category: "Backend (The Brain)",
    color: "red",
    icon: <Database size={40} className="text-red-500" />,
    techs: ["Laravel 11", "MySQL", "Rest API", "Sanctum Auth", "Redis"]
  }
];

export default function TechPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-20 overflow-hidden relative">
      
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-flex items-center justify-center p-3 bg-slate-900 border border-white/10 rounded-2xl mb-6 shadow-2xl shadow-cyan-500/20"
          >
            <Cpu className="text-cyan-400 animate-pulse mr-3" />
            <span className="font-mono text-cyan-400 font-bold">SYSTEM_ARCHITECTURE_V.1.0</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Behind The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500">Code</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Mengeksplorasi teknologi di balik layar. Kolaborasi sempurna antara performa Frontend Modern dan ketangguhan Backend Enterprise.
          </p>
        </div>

        {/* VISUALISASI ARSITEKTUR (Next.js <-> Laravel) */}
        <div className="relative w-full max-w-5xl mx-auto mb-32 hidden md:block">
            
            {/* Connecting Line (Kabel Data) */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-red-500/20 -translate-y-1/2 rounded-full"></div>
            
            {/* Data Packet Animation (Titik berjalan) */}
            <motion.div 
                animate={{ x: [-200, 200, -200] }} // Loop kiri kanan
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent -translate-y-1/2 z-0"
            ></motion.div>

            <div className="grid grid-cols-3 gap-8 relative z-10">
                
                {/* KIRI: FRONTEND */}
                <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="bg-slate-900/80 backdrop-blur border border-cyan-500/30 p-8 rounded-3xl shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)] relative group"
                >
                    <div className="absolute -top-6 left-8 bg-slate-950 border border-cyan-500/50 px-4 py-2 rounded-lg text-cyan-400 font-bold text-xs uppercase tracking-wider">
                        Client Side
                    </div>
                    <div className="mb-6 flex justify-between items-start">
                        <Code2 size={40} className="text-cyan-400" />
                        <span className="text-5xl font-black text-slate-800 group-hover:text-cyan-900/50 transition-colors">FE</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Next.js 14</h3>
                    <p className="text-slate-400 text-sm mb-4">App Router, SSR, & Optimization.</p>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'Tailwind', 'Framer', 'TypeScript'].map(tag => (
                            <span key={tag} className="px-2 py-1 bg-cyan-950 text-cyan-400 text-[10px] rounded border border-cyan-900">{tag}</span>
                        ))}
                    </div>
                </motion.div>

                {/* TENGAH: API BRIDGE */}
                <div className="flex flex-col items-center justify-center text-center">
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="w-24 h-24 bg-slate-950 rounded-full border-2 border-dashed border-purple-500 flex items-center justify-center relative shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                    >
                        <ArrowRightLeft className="text-purple-400" />
                    </motion.div>
                    <div className="mt-4 bg-slate-900 px-4 py-2 rounded-full border border-purple-500/30">
                        <span className="text-purple-400 font-bold text-xs font-mono">RESTful API / JSON</span>
                    </div>
                </div>

                {/* KANAN: BACKEND */}
                <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="bg-slate-900/80 backdrop-blur border border-red-500/30 p-8 rounded-3xl shadow-[0_0_50px_-12px_rgba(239,68,68,0.3)] relative group"
                >
                    <div className="absolute -top-6 right-8 bg-slate-950 border border-red-500/50 px-4 py-2 rounded-lg text-red-400 font-bold text-xs uppercase tracking-wider">
                        Server Side
                    </div>
                    <div className="mb-6 flex justify-between items-start">
                        <Server size={40} className="text-red-500" />
                        <span className="text-5xl font-black text-slate-800 group-hover:text-red-900/50 transition-colors">BE</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Laravel 11</h3>
                    <p className="text-slate-400 text-sm mb-4">Robust Security & Eloquent ORM.</p>
                    <div className="flex flex-wrap gap-2">
                        {['PHP 8.2', 'MySQL', 'Sanctum', 'Filament'].map(tag => (
                            <span key={tag} className="px-2 py-1 bg-red-950 text-red-400 text-[10px] rounded border border-red-900">{tag}</span>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { title: "Server Side Rendering", desc: "Loading ultra cepat dengan Next.js SSR.", icon: <Zap className="text-yellow-400" /> },
                { title: "Type Safety", desc: "Kode bebas bug dengan TypeScript strict mode.", icon: <ShieldCheck className="text-blue-400" /> },
                { title: "Scalable Database", desc: "Struktur data relasional MySQL yang solid.", icon: <Database className="text-green-400" /> },
                { title: "Atomic Design", desc: "Komponen UI modular yang dapat digunakan ulang.", icon: <Box className="text-pink-400" /> },
            ].map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1"
                >
                    <div className="mb-4 bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center">
                        {item.icon}
                    </div>
                    <h4 className="text-white font-bold mb-2">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                </motion.div>
            ))}
        </div>

        {/* Code Snippet Decoration */}
        <div className="mt-32 max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-xl overflow-hidden opacity-80">
            <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-slate-500 font-mono">api/students/store.php</span>
            </div>
            <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm">
                    <code className="text-purple-400">public function</code> <code className="text-yellow-400">store</code><code className="text-slate-300">(Request $request)</code> <code className="text-slate-300">{`{`}</code><br/>
                    <span className="text-slate-500">  // Validate Incoming Data</span><br/>
                    <code className="text-slate-300">  $validated = $request-&gt;validate([</code><br/>
                    <code className="text-green-400">    'name' =&gt; 'required|string|max:255',</code><br/>
                    <code className="text-green-400">    'major' =&gt; 'required|exists:majors,id',</code><br/>
                    <code className="text-slate-300">  ]);</code><br/><br/>
                    <span className="text-slate-500">  // Create Student Record</span><br/>
                    <code className="text-blue-400">  return</code> <code className="text-slate-300">Student::create($validated);</code><br/>
                    <code className="text-slate-300">{`}`}</code>
                </pre>
            </div>
            
        </div>
                        <DeveloperCard />
      </div>
    </main>
  );
}