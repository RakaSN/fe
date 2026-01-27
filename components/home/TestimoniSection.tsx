"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

export interface TestimoniItem {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  batch: string;
}

export default function TestimoniSection({ data = [] }: { data: TestimoniItem[] }) {
  
  if (data.length === 0) return null;

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Alumni Kami, <span className="text-cyan-400">Kebanggaan Kami</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Mereka yang telah membuktikan kualitas pendidikan kami dan kini berkarya di perusahaan teknologi terkemuka.
          </p>
        </div>

        {/* Grid Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group flex flex-col"
            >
              {/* Ikon Kutipan */}
              <Quote className="absolute top-6 right-6 text-white/5 w-16 h-16 group-hover:text-cyan-500/10 transition-colors" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Isi Testimoni */}
                <p className="text-slate-300 leading-relaxed mb-8 italic flex-grow text-lg">
                  "{item.content}"
                </p>
                
                {/* Profil Alumni (Foto Lebih Besar) */}
                {/* Perubahan: items-center agar teks sejajar tengah dengan foto */}
                <div className="flex items-center gap-6 mt-auto">
                  
                  {/* Container Foto: Diperbesar jadi w-20 (mobile) & w-24 (desktop) */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-cyan-500/20 shrink-0 shadow-lg group-hover:border-cyan-500/50 transition-colors">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized={true} 
                    />
                  </div>

                  {/* Teks Info */}
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white font-bold text-lg md:text-xl leading-tight mb-1">
                      {item.name}
                    </h4>
                    <p className="text-cyan-400 text-sm md:text-base font-medium mb-2">
                      {item.role}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-slate-400 bg-white/10 px-2.5 py-1 rounded-md border border-white/5 font-medium">
                          {item.company}
                        </span>
                        <span className="text-xs text-slate-500">
                          {item.batch}
                        </span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}