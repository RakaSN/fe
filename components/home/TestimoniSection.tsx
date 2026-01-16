"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rizky Ramadhan",
    role: "Fullstack Engineer",
    company: "Tokopedia",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop", // Placeholder image
    quote: "Sekolah ini mengubah hidup saya. Fasilitas lab-nya lebih canggih dari kampus IT kebanyakan. Lulus langsung direkrut unicorn!",
    gradYear: "Angkatan 2022"
  },
  {
    name: "Sarah Azzahra",
    role: "UI/UX Designer",
    company: "Gojek",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    quote: "Kurikulumnya sangat relevan dengan industri. Saya belajar tools desain standar global yang dipakai di startup besar.",
    gradYear: "Angkatan 2023"
  },
  {
    name: "Dimas Pratama",
    role: "Cyber Security Analyst",
    company: "Bank BCA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    quote: "Mentornya praktisi asli. Bukan cuma teori, tapi diajarkan cara mengamankan sistem real-world. Recommended!",
    gradYear: "Angkatan 2021"
  }
];

export default function TestimoniSection() {
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
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group"
            >
              {/* Ikon Kutipan Besar */}
              <Quote className="absolute top-6 right-6 text-white/5 w-16 h-16 group-hover:text-cyan-500/10 transition-colors" />

              {/* Isi Testimoni */}
              <div className="relative z-10">
                <p className="text-slate-300 leading-relaxed mb-8 italic">
                  "{item.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-500/30">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{item.name}</h4>
                    <p className="text-cyan-400 text-sm font-medium">{item.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">{item.company}</span>
                        <span className="text-[10px] text-slate-500">{item.gradYear}</span>
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