"use client";
import { motion } from "framer-motion";
import { MapPin, Mail, Clock, Send, Globe, Zap, MessageSquare } from "lucide-react";

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Decor - Global Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - Tactical Style */}
        <div className="text-center mb-24">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 mb-6"
            >
                <Globe size={14} className="text-cyan-400 animate-spin-slow" />
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-[0.3em]">
                    Global_Access_Point
                </span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-5xl md:text-7xl font-black text-white mb-6 italic uppercase tracking-tighter"
            >
                Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Transmisi.</span>
            </motion.h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light italic leading-relaxed">
                Butuh bantuan teknis atau informasi pendaftaran? Hubungi tim support kami melalui enkripsi jalur komunikasi di bawah ini.
            </p>
        </div>

        {/* Info Cards - Modular System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
                { 
                    icon: <MapPin size={24} />, 
                    title: "Physical_Loc", 
                    desc: "Jl. Teknologi Masa Depan No. 1, Jakarta Selatan", 
                    color: "group-hover:text-red-500",
                    glow: "group-hover:shadow-red-500/20"
                },
                { 
                    icon: <Mail size={24} />, 
                    title: "Digital_Mail", 
                    desc: "support@smkpk-kj.sch.id", 
                    color: "group-hover:text-cyan-400",
                    glow: "group-hover:shadow-cyan-500/20"
                },
                { 
                    icon: <Clock size={24} />, 
                    title: "Uptime_Status", 
                    desc: "Mon - Fri: 07:00 - 16:00 WIB", 
                    color: "group-hover:text-yellow-400",
                    glow: "group-hover:shadow-yellow-500/20"
                },
            ].map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[2rem] hover:border-white/20 transition-all duration-500"
                >
                    <div className={`w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center mb-6 border border-white/5 transition-all duration-500 ${item.color} ${item.glow} group-hover:rotate-12 group-hover:scale-110 shadow-2xl`}>
                        {item.icon}
                    </div>
                    <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.2em] mb-3">{item.title}</h3>
                    <p className="text-white font-bold italic text-lg leading-tight">{item.desc}</p>
                </motion.div>
            ))}
        </div>

        {/* Map & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            
            {/* Left: Tactical Map */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative min-h-[500px] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group"
            >
                <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                
                {/* Tactical Overlay */}
                <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
                    <div className="bg-slate-900/90 backdrop-blur border border-white/10 p-3 rounded-xl flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">System_Active</span>
                    </div>
                </div>

                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126914.31602377395!2d106.78915599999999!3d-6.254146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3ce983083bd%3A0x6e8a00a16c310222!2sSouth%20Jakarta%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(85%)" }} 
                    allowFullScreen 
                    loading="lazy" 
                    className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                ></iframe>
            </motion.div>

            {/* Right: Encrypted Form */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-slate-900/50 backdrop-blur-2xl border border-white/5 p-10 md:p-14 rounded-[3rem] relative overflow-hidden"
            >
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>

                <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                        <MessageSquare size={20} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Direct_Message</h2>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">End-to-End Encryption</p>
                    </div>
                </div>
                
                <form className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">User_Identity</label>
                            <input type="text" className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700 focus:border-cyan-500/50 focus:outline-none transition-all italic font-light" placeholder="Full Name" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Comm_Channel</label>
                            <input type="email" className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700 focus:border-cyan-500/50 focus:outline-none transition-all italic font-light" placeholder="Email Address" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Subject_Line</label>
                        <select className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all appearance-none italic font-light">
                            <option className="bg-slate-900">Admission Inquiry (PPDB)</option>
                            <option className="bg-slate-900">Industrial Partnership</option>
                            <option className="bg-slate-900">Alumni Services</option>
                            <option className="bg-slate-900">General Information</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Payload_Data</label>
                        <textarea rows={4} className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700 focus:border-cyan-500/50 focus:outline-none transition-all italic font-light" placeholder="Type your message here..."></textarea>
                    </div>

                    <button className="w-full group relative overflow-hidden bg-white text-slate-900 font-black uppercase italic tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl hover:shadow-cyan-500/20">
                        <span className="relative z-10 flex items-center justify-center gap-3 text-xs">
                            Execute_Transmission <Send size={16} />
                        </span>
                        <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </form>
            </motion.div>

        </div>
      </div>
    </main>
  );
}