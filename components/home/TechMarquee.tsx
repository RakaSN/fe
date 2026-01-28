export default function TechMarquee() {
  const careers = [
    "System Administrators",
    "Automotive Technicians",
    "Electrical Installers",
    "IT Support Specialists",
    "Vehicle Mechanics",
    "Network Administrators",
    "Control System Technicians",
    "Telecommunications Technicians",
    "Industrial Maintenance Technicians",
    "Service Advisors",
    "Electrical Technicians",
    "Automotive Maintenance Technicians",
    "Network Technicians"
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#020617] py-6 border-y border-cyan-500/20 z-20">
      
      {/* Background Glow tipis di tengah */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>

      {/* Container Slider */}
      <div className="flex w-full">
        <div className="flex animate-infinite-scroll whitespace-nowrap group hover:[animation-play-state:paused]">
          
          {/* LOGIC LOOPING 2x BIAR GAK PUTUS */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 mx-6 items-center">
              {careers.map((career, index) => (
                <div 
                  key={index} 
                  className="relative flex items-center gap-3 group/item cursor-default"
                >
                  {/* Bullet Point Neon (Pengganti simbol •) */}
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-900 group-hover/item:bg-cyan-400 group-hover/item:shadow-[0_0_10px_#22d3ee] transition-all duration-300"></span>
                  
                  {/* Nama Profesi */}
                  <span className="text-xl md:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400 group-hover/item:from-cyan-400 group-hover/item:to-blue-500 transition-all duration-300 transform group-hover/item:scale-105 uppercase">
                    {career}
                  </span>
                </div>
              ))}
            </div>
          ))}

        </div>
      </div>
      
      {/* Vignette Kiri Kanan biar teks-nya muncul/hilang halus */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#020617] to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#020617] to-transparent z-10"></div>
    </div>
  );
}