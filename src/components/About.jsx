import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Award, UserCheck, Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const stats = [
  { icon: Award, count: 15, suffix: '+', label: 'Years of Artistry' },
  { icon: UserCheck, count: 12000, suffix: '+', label: 'Premium Guests Served' },
  { icon: Users, count: 18, suffix: '', label: 'Elite Stylists & Artists' },
  { icon: Star, count: 99, suffix: '%', label: 'Satisfaction Rate' }
];

export default function About() {
  const statsContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (statsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = statsContainerRef.current;
      const totalScroll = scrollWidth - clientWidth;
      if (totalScroll > 0) {
        setScrollProgress((scrollLeft / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    }
  };

  useEffect(() => {
    const el = statsContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollStats = (direction) => {
    if (statsContainerRef.current) {
      const cardWidth = 260; // Estimated card width
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      statsContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#020202] overflow-hidden border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#D4AF37]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Column 1: Editorial Content */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="font-sans tracking-[0.4em] text-[10px] text-[#D4AF37] uppercase mb-6 font-medium px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.1)] inline-block">
              Our Heritage
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-8">
              Legacy of <br/>
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37]">
                Glamour & Prestige
              </span>
            </h2>
            
            <p className="font-sans text-neutral-400 text-sm leading-[1.8] font-light mb-6">
              For over a decade and a half, <strong>NEW LOOK Beauty Parlour</strong> has been synonymous with high-end beauty transformations and unmatched luxury. Situated at the crossroads of fashion and indulgence, we offer a sanctuary where style meets relaxation.
            </p>
            
            <p className="font-sans text-neutral-400 text-sm leading-[1.8] font-light mb-10">
              Our vision is simple: to make every client feel like royalty. Through continuous training in global hair and cosmetic trends, our artisans create looks that are not just beautiful, but deeply personal and empowering.
            </p>
            
            <div className="flex items-center space-x-6 border-l-[1px] border-gradient-to-b from-[#D4AF37] to-transparent pl-8 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent" />
              <span className="font-serif italic text-xl md:text-2xl text-white font-light tracking-wide">
                "Beauty is an art, and <br/> <span className="text-[#D4AF37]">you are the canvas.</span>"
              </span>
            </div>
          </motion.div>

          {/* Column 2: Rich Stats Dashboard as an Interactive Gallery */}
          <div className="relative flex flex-col justify-center w-full max-w-full overflow-hidden mt-12 lg:mt-0">
            {/* Center glow behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />

            {/* Top Navigation Row for Stats */}
            <div className="flex justify-end gap-3 mb-6 relative z-20">
              <button 
                onClick={() => scrollStats('left')}
                className="w-10 h-10 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] transition-all duration-300 group"
                aria-label="Scroll stats left"
              >
                <ChevronLeft className="w-4.5 h-4.5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button 
                onClick={() => scrollStats('right')}
                className="w-10 h-10 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] transition-all duration-300 group"
                aria-label="Scroll stats right"
              >
                <ChevronRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Horizontal Swiping Track */}
            <div 
              ref={statsContainerRef}
              className="flex overflow-x-auto scrollbar-none gap-6 pb-6 snap-x snap-mandatory scroll-smooth -mx-6 px-6 relative z-10 w-[calc(100%+3rem)]"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="w-[240px] sm:w-[265px] flex-shrink-0 snap-center relative p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#12100c]/90 via-[#0a0907]/95 to-[#050505]/98 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.85),0_0_15px_rgba(212,175,55,0.02)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/50 backdrop-blur-xl transition-all duration-500 flex flex-col justify-between group overflow-hidden cursor-pointer"
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

                    <div className="mb-8 relative inline-flex">
                      <div className="absolute inset-0 bg-[#D4AF37] blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="relative w-12 h-12 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#111] to-[#000] flex items-center justify-center shadow-lg group-hover:border-[#D4AF37] transition-all duration-500">
                        <Icon className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="font-serif font-light text-4xl md:text-5xl tracking-tight mb-2 flex items-baseline">
                        <span className="text-white drop-shadow-md">
                          <CountUp
                            end={stat.count}
                            duration={3}
                            enableScrollSpy={true}
                            scrollSpyOnce={true}
                            separator=","
                          />
                        </span>
                        <span className="text-[#D4AF37] ml-1">{stat.suffix}</span>
                      </h3>
                      <p className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] text-neutral-400 font-medium uppercase group-hover:text-[#D4AF37] transition-colors duration-500">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Scroll Progress Bar & Helper text */}
            <div className="mt-4 flex flex-col items-center justify-center gap-3 relative z-20">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-neutral-500 animate-pulse select-none">
                ← Swipe left and right to see stats →
              </span>
              <div className="w-24 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37] rounded-full transition-all duration-150"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
