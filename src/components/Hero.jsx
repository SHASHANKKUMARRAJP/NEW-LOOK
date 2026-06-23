import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full bg-[#090806] overflow-hidden flex items-center justify-center pt-24 md:pt-0">
      
      {/* 
        ========================================
        LAYER 1: BACKGROUND (Skincare campaign style)
        ========================================
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Full Color Background Image - Premium luxury styling salon interior */}
        <div 
          className="absolute inset-0 bg-cover bg-[center_top] md:bg-center opacity-90 brightness-[0.95] contrast-[1.05] saturate-[1.05]"
          style={{ backgroundImage: "url('/premium_spa_hero.png')" }}
        />
        
        {/* Balanced Gradients for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent w-full md:w-[65%]" />
        <div className="absolute inset-0 bg-black/35 md:bg-transparent" />
        
        {/* Ambient Warm Glow Orbs */}
        <motion.div 
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -30, 10, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[25%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#D4AF37]/15 blur-[120px] pointer-events-none" 
        />
      </div>

      {/* 
        ========================================
        LAYER 2: SLIM BORDER ANGLES (Framing the model like the screenshot)
        ========================================
      */}
      <div className="absolute inset-0 z-10 pointer-events-none max-w-7xl mx-auto px-6 hidden md:block">
        {/* Top-Left Angle */}
        <div className="absolute top-[20%] left-[8%] w-[100px] h-[100px] border-l-[1px] border-t-[1px] border-white/20" />
        {/* Bottom-Right Angle */}
        <div className="absolute bottom-[22%] right-[32%] w-[100px] h-[100px] border-r-[1px] border-b-[1px] border-white/20" />
      </div>

      {/* 
        ========================================
        LAYER 3: MAIN LAYOUT CONTENT
        ========================================
      */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between min-h-screen pb-20 md:pb-24 pt-32 md:pt-0">
        
        {/* Left Column: Bold Condensed Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full md:w-[600px] text-left mb-12 md:mb-0"
        >
          <span className="font-cyber tracking-[0.4em] text-[10px] text-[#D4AF37] uppercase block mb-4 font-semibold">
            PURE BEAUTY, REAL RESULTS
          </span>
          
          <h1 className="font-cyber font-extrabold text-5xl md:text-7xl lg:text-[85px] leading-[1.05] text-white tracking-tight uppercase mb-8">
            New Look, <br/>
            <span className="text-[#D4AF37] italic font-light font-serif lowercase tracking-normal">Expert Care</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a 
              href="#contact"
              className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden rounded-full border border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/10 to-[#FF4500]/5 text-[#D4AF37] font-sans tracking-[0.2em] text-[11px] uppercase transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:scale-105 cursor-pointer"
            >
              <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-shimmer" />
              <span className="relative z-10 font-semibold">Book The Experience</span>
            </a>
            
            <a 
              href="#services" 
              className="text-neutral-400 hover:text-white font-cyber tracking-widest text-[10px] uppercase transition-colors py-3 px-4 border border-white/5 hover:border-white/10 rounded-full bg-white/[0.01]"
            >
              Explore Services
            </a>
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center pointer-events-auto hidden md:flex">
        <a href="#philosophy" className="w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-500 group">
          <ArrowDown className="w-4 h-4 text-[#D4AF37] group-hover:translate-y-1 transition-transform duration-300" />
        </a>
      </div>

    </section>
  );
}

