"use client";
import { motion } from "framer-motion";

const techs = [
  "System Administrators •","Automotive Technicians •","Electrical Installers •","IT Support Specialists •","Vehicle Mechanics •","Network Administrators •","Control System Technicians •", "Telecommunications Technicians •","Industrial Maintenance Technicians •","Service Advisors •","Electrical Technicians •","Automotive Maintenance Technicians •","Network Technicians"
];

export default function TechMarquee() {
  return (
    <div className="relative py-10 bg-slate-950 border-y border-white/5 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
      
      <div className="flex">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 2000, ease: "linear" }}
        >
          {[...techs, ...techs, ...techs].map((item, index) => (
            <span key={index} className="mx-8 text-4xl font-bold text-slate-800 uppercase tracking-widest hover:text-cyan-500 transition-colors cursor-default">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}