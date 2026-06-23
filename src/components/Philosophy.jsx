import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const pillars = [
  {
    icon: Sparkles,
    title: 'Personalized Styling',
    description: 'We customize every haircut, style, and facial treatment to match your unique face shape, skin type, and personal preferences.'
  },
  {
    icon: Shield,
    title: 'Premium Products',
    description: 'We only use top-quality, safe, and skin-friendly products that are organic and cruelty-free to protect and care for your skin and hair.'
  },
  {
    icon: Heart,
    title: 'Relaxing Environment',
    description: 'Our salon is designed for your comfort. Sit back, relax, and enjoy a peaceful experience with soothing music and a stress-free atmosphere.'
  }
];

export default function Philosophy() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const totalScroll = scrollWidth - clientWidth;
      if (totalScroll > 0) {
        setScrollProgress((scrollLeft / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Run once initially to set starting state
      handleScroll();
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (containerRef.current) {
      const cardWidth = 340; // Approx card width
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="philosophy" className="relative py-24 md:py-32 bg-[#020202] overflow-hidden border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="font-sans tracking-[0.4em] text-[10px] text-[#D4AF37] uppercase mb-4 font-medium px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.1)] inline-block">
              Our Core Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mt-4">
              Crafting <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37]">Timeless Elegance</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] transition-all duration-300 group"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] transition-all duration-300 group"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Horizontal Swiping Container Wrapper to prevent overflow page stretching */}
        <div className="w-full max-w-full overflow-hidden">
          <div 
            ref={containerRef}
            className="flex overflow-x-auto scrollbar-none gap-6 pb-8 snap-x snap-mandatory scroll-smooth touch-pan-x w-full px-2"
          >
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="w-[290px] sm:w-[330px] md:w-[380px] flex-shrink-0 snap-center relative px-8 py-12 rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#12100c]/90 via-[#0a0907]/95 to-[#050505]/98 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.85),0_0_15px_rgba(212,175,55,0.02)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/50 backdrop-blur-xl transition-all duration-500 flex flex-col justify-between group overflow-hidden cursor-pointer"
                >
                  {/* Ambient internal card glow */}
                  <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-[#D4AF37]/5 blur-2xl group-hover:bg-[#D4AF37]/15 group-hover:scale-125 transition-all duration-700 pointer-events-none z-0" />

                  {/* Elegant decorative background pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500 z-0 pointer-events-none" />

                  {/* Corner bracket decorations */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-tl-xl z-10" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-tr-xl z-10" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-bl-xl z-10" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-br-xl z-10" />

                  {/* Rich Layered Icon */}
                  <div className="mb-8 relative inline-flex">
                    <div className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative w-14 h-14 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#111] to-[#000] flex items-center justify-center shadow-lg group-hover:border-[#D4AF37] transition-all duration-500">
                      <Icon className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-500">
                    {pillar.title}
                  </h3>
                  
                  <p className="font-sans text-neutral-400 text-sm leading-[1.8] font-light">
                    {pillar.description}
                  </p>
                  
                  {/* Decorative Bottom Corner Accent */}
                  <div className="absolute bottom-6 right-6 w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll Progress Bar & Helper text */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-500 animate-pulse select-none">
            ← Swipe right and left to see more →
          </span>
          <div className="w-32 h-[2.5px] bg-white/5 rounded-full overflow-hidden relative">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37] rounded-full transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
