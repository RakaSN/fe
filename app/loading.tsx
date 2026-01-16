export default function Loading() {
  return (
    <div className="fixed inset-0 bg-slate-950 z-[9999] flex flex-col items-center justify-center">
      <div className="relative w-20 h-20">
        {/* Spinner Luar */}
        <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
        {/* Spinner Dalam (Mutar) */}
        <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
        
        {/* Logo Tengah (Opsional, kalau mau simpel spinner aja juga boleh) */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="mt-4 text-cyan-400 font-mono text-sm animate-pulse">INITIALIZING...</p>
    </div>
  );
}