"use client";
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white w-80 h-96 rounded-2xl shadow-2xl mb-4 border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header Chat */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <span className="font-bold">Siswa Connect</span>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>
            
            {/* Body Chat (Dummy) */}
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-3">
              <div className="bg-white p-2 rounded-lg shadow-sm max-w-[80%] text-sm text-gray-800">
                Halo! Ada yang bisa dibantu terkait informasi sekolah?
              </div>
              <div className="bg-blue-100 p-2 rounded-lg shadow-sm max-w-[80%] ml-auto text-sm text-blue-900">
                Kak, info PPDB gelombang 2 kapan ya?
              </div>
            </div>

            {/* Input Chat */}
            <div className="p-3 border-t bg-white flex gap-2">
              <input type="text" placeholder="Ketik pesan..." className="flex-1 bg-gray-100 rounded-full px-4 text-sm focus:outline-none" />
              <button className="bg-blue-600 text-white p-2 rounded-full"><Send size={16}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}