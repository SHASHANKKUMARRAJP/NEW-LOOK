import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SwipeIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="mt-10 flex flex-col md:hidden items-center justify-center gap-5 w-full max-w-[280px] mx-auto"
    >
      {/* Premium Glowing Progress Bar */}
      <div className="w-full h-[3px] bg-[#D4AF37]/10 rounded-full relative overflow-visible">
        {/* Glow behind the track */}
        <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[4px] rounded-full" />
        
        {/* The moving thumb */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] w-1/3 bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37] rounded-full shadow-[0_0_12px_rgba(255,241,197,0.8)]"
          animate={{ x: ["0%", "200%", "0%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Intense center glow on the moving thumb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[4px] bg-white rounded-full blur-[2px]" />
        </motion.div>
      </div>
      
      {/* Text labels with bouncing arrows */}
      <div className="flex justify-between w-full text-neutral-400 font-sans text-[10px] tracking-[0.25em] uppercase font-medium">
        {/* Left Label */}
        <motion.span 
          className="flex items-center gap-2 group cursor-default"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ x: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#D4AF37]" />
          </motion.div>
          Swipe Left
        </motion.span>

        {/* Right Label */}
        <motion.span 
          className="flex items-center gap-2 group cursor-default"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
        >
          Swipe Right
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
          >
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </motion.div>
        </motion.span>
      </div>
    </motion.div>
  );
}
