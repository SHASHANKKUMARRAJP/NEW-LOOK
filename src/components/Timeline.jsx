import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Friendly Consultation',
    desc: 'Start your visit with a hot cup of tea or coffee. Sit down with your stylist to talk about the look you want and pick the best hair or skin treatments for you.'
  },
  {
    step: '02',
    title: 'Selecting the Best Products',
    desc: 'Our experts select and mix the perfect hair colors and skincare products for your session. You can relax in our comfortable lounge while we get everything ready.'
  },
  {
    step: '03',
    title: 'Your Transformation',
    desc: 'Relax and enjoy your treatment. Whether you are getting a haircut, a glowing facial, or bridal makeup, our skilled team uses safe, high-quality products to care for you.'
  },
  {
    step: '04',
    title: 'The Final Reveal & Care Tips',
    desc: 'See your beautiful new look in our styling mirrors. Your stylist will give you simple, easy-to-follow tips on how to keep your hair and skin glowing at home.'
  }
];

export default function Timeline() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const totalScrollable = scrollWidth - clientWidth;
    
    if (totalScrollable > 0) {
      setScrollProgress((scrollLeft / totalScrollable) * 100);
    } else {
      setScrollProgress(0);
    }
  };
  return (
    <section id="journey" className="relative py-16 md:py-24 bg-deepSpace overflow-hidden border-t border-white/5">
      {/* Background orbs */}
      <div className="glow-orb w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-cyberOrange/5 top-20 left-10" />
      <div className="glow-orb w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-[#D4AF37]/5 bottom-20 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="font-sans tracking-[0.4em] text-[9px] md:text-[10px] text-[#D4AF37] uppercase mb-3 md:mb-4 font-medium px-3.5 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.1)] inline-block">
            The Guest Experience
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mt-3">
            The Ritual of <br/>
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37]">
              Transformation
            </span>
          </h2>
          <p className="font-sans text-neutral-400 text-xs md:text-sm leading-relaxed mt-4 md:mt-6 max-w-xl mx-auto font-light">
            From the moment you walk in to your final beautiful reveal, follow our simple steps to get the perfect styling experience.
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6 md:mt-8" />
        </div>

        {/* ================= DESKTOP LAYOUT (lg and up) ================= */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center relative min-h-[600px]">
          
          {/* Left Column: Phase 01 & Phase 03 */}
          <div className="flex flex-col gap-16 z-20">
            {/* Card 1: Phase 01 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#12100c]/95 via-[#0a0907]/98 to-[#050505] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_15px_rgba(212,175,55,0.02)] hover:border-[#D4AF37]/50 hover:shadow-[0_25px_50px_-10px_rgba(212,175,55,0.15)] relative overflow-hidden group transition-all duration-500 cursor-pointer"
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 transition-colors duration-500 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 transition-colors duration-500 rounded-br-lg" />

              <span className="font-serif italic text-5xl text-[#D4AF37]/20 absolute top-2 right-4 select-none group-hover:text-[#D4AF37]/35 transition-colors duration-500 font-bold">
                01
              </span>

              <div className="flex gap-4 items-start relative z-10">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37]/60 group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="font-serif italic text-[11px] text-[#D4AF37]/80 block mb-1">Phase 01</span>
                  <h3 className="font-serif text-base text-white group-hover:text-[#FFF1C5] transition-colors duration-300 mb-2 font-medium tracking-wide">
                    {steps[0].title}
                  </h3>
                  <p className="font-sans text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 text-[13px] leading-relaxed font-light">
                    {steps[0].desc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Phase 03 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#12100c]/95 via-[#0a0907]/98 to-[#050505] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_15px_rgba(212,175,55,0.02)] hover:border-[#D4AF37]/50 hover:shadow-[0_25px_50px_-10px_rgba(212,175,55,0.15)] relative overflow-hidden group transition-all duration-500 cursor-pointer"
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 transition-colors duration-500 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 transition-colors duration-500 rounded-br-lg" />

              <span className="font-serif italic text-5xl text-[#D4AF37]/20 absolute top-2 right-4 select-none group-hover:text-[#D4AF37]/35 transition-colors duration-500 font-bold">
                03
              </span>

              <div className="flex gap-4 items-start relative z-10">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37]/60 group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="font-serif italic text-[11px] text-[#D4AF37]/80 block mb-1">Phase 03</span>
                  <h3 className="font-serif text-base text-white group-hover:text-[#FFF1C5] transition-colors duration-300 mb-2 font-medium tracking-wide">
                    {steps[2].title}
                  </h3>
                  <p className="font-sans text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 text-[13px] leading-relaxed font-light">
                    {steps[2].desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Column: Beautiful Skincare Flatlay Oval Image with Orbiting Rings */}
          <div className="flex justify-center items-center relative z-10 py-8">
            {/* Concentric Decorative Rings */}
            <div className="absolute w-[440px] h-[440px] rounded-full border border-[#D4AF37]/5 pointer-events-none -z-10 animate-[spin_100s_linear_infinite]" />
            <div className="absolute w-[500px] h-[500px] rounded-full border border-[#D4AF37]/5 border-dashed pointer-events-none -z-10 animate-[spin_160s_linear_infinite]" />

            {/* Glowing background */}
            <div className="absolute w-[240px] h-[340px] bg-[#D4AF37]/10 rounded-full filter blur-[60px] opacity-40 -z-10" />

            {/* The Luxury Oval Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group/oval cursor-pointer"
            >
              {/* Double frame effect */}
              <div className="w-[280px] h-[380px] md:w-[320px] md:h-[440px] rounded-full p-2.5 border border-[#D4AF37]/25 bg-[#050505]/40 backdrop-blur-sm shadow-[0_0_50px_rgba(212,175,55,0.1)] transition-all duration-700 hover:border-[#D4AF37]/50 hover:shadow-[0_0_60px_rgba(212,175,55,0.2)]">
                <div className="w-full h-full rounded-full overflow-hidden border border-[#D4AF37]/20 relative">
                  <img 
                    src="/service_facial.png" 
                    alt="The Ritual of Transformation" 
                    className="w-full h-full object-cover filter brightness-[95%] contrast-[102%] hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  />
                  {/* Subtle gold overlay on hover */}
                  <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover/oval:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Phase 02 & Phase 04 */}
          <div className="flex flex-col gap-16 z-20">
            {/* Card 2: Phase 02 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#12100c]/95 via-[#0a0907]/98 to-[#050505] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_15px_rgba(212,175,55,0.02)] hover:border-[#D4AF37]/50 hover:shadow-[0_25px_50px_-10px_rgba(212,175,55,0.15)] relative overflow-hidden group transition-all duration-500 cursor-pointer"
            >
              {/* Corner brackets */}
              <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 transition-colors duration-500 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 transition-colors duration-500 rounded-bl-lg" />

              <span className="font-serif italic text-5xl text-[#D4AF37]/20 absolute top-2 right-4 select-none group-hover:text-[#D4AF37]/35 transition-colors duration-500 font-bold">
                02
              </span>

              <div className="flex gap-4 items-start relative z-10">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37]/60 group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="font-serif italic text-[11px] text-[#D4AF37]/80 block mb-1">Phase 02</span>
                  <h3 className="font-serif text-base text-white group-hover:text-[#FFF1C5] transition-colors duration-300 mb-2 font-medium tracking-wide">
                    {steps[1].title}
                  </h3>
                  <p className="font-sans text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 text-[13px] leading-relaxed font-light">
                    {steps[1].desc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Phase 04 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#12100c]/95 via-[#0a0907]/98 to-[#050505] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_15px_rgba(212,175,55,0.02)] hover:border-[#D4AF37]/50 hover:shadow-[0_25px_50px_-10px_rgba(212,175,55,0.15)] relative overflow-hidden group transition-all duration-500 cursor-pointer"
            >
              {/* Corner brackets */}
              <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 transition-colors duration-500 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 transition-colors duration-500 rounded-bl-lg" />

              <span className="font-serif italic text-5xl text-[#D4AF37]/20 absolute top-2 right-4 select-none group-hover:text-[#D4AF37]/35 transition-colors duration-500 font-bold">
                04
              </span>

              <div className="flex gap-4 items-start relative z-10">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37]/60 group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="font-serif italic text-[11px] text-[#D4AF37]/80 block mb-1">Phase 04</span>
                  <h3 className="font-serif text-base text-white group-hover:text-[#FFF1C5] transition-colors duration-300 mb-2 font-medium tracking-wide">
                    {steps[3].title}
                  </h3>
                  <p className="font-sans text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 text-[13px] leading-relaxed font-light">
                    {steps[3].desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ================= MOBILE & TABLET LAYOUT (below lg) ================= */}
        <div className="flex flex-col gap-10 lg:hidden items-center">
          
          {/* Central Oval Image */}
          <div className="relative group/oval max-w-[280px]">
            {/* Concentric Decorative Rings for Mobile */}
            <div className="absolute w-[280px] h-[280px] rounded-full border border-[#D4AF37]/5 pointer-events-none -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2 -z-10" />
            <div className="absolute w-[180px] h-[260px] bg-[#D4AF37]/10 rounded-full filter blur-[40px] opacity-35 -z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
            
            <div className="rounded-full p-2 border border-[#D4AF37]/20 bg-[#050505]/40 backdrop-blur-sm shadow-[0_0_35px_rgba(212,175,55,0.08)]">
              <div className="w-[180px] h-[250px] rounded-full overflow-hidden border border-[#D4AF37]/10">
                <img 
                  src="/service_facial.png" 
                  alt="The Ritual of Transformation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Swipeable Carousel Steps List */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 pb-6 -mx-4 sm:px-6 sm:-mx-6 scroll-smooth"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                className="snap-center shrink-0 w-[85vw] max-w-[340px] md:max-w-[420px] p-5 md:p-6 rounded-xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#12100c]/95 via-[#0a0907]/98 to-[#050505] shadow-[0_15px_30px_rgba(0,0,0,0.8)] hover:border-[#D4AF37]/45 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l border-t border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 rounded-tl" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-r border-b border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 rounded-br" />

                <span className="font-serif italic text-4xl text-[#D4AF37]/20 absolute top-2 right-4 select-none font-bold">
                  {step.step}
                </span>

                <div className="flex gap-4 items-start relative z-10">
                  <div className="flex-shrink-0 w-8.5 h-8.5 rounded-lg bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-serif italic text-[10px] text-[#D4AF37]/80 block mb-1">Phase {step.step}</span>
                    <h3 className="font-serif text-sm text-white font-medium mb-1.5">
                      {step.title}
                    </h3>
                    <p className="font-sans text-neutral-400 text-xs leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Progress Bar Indicator & Swipe Hint */}
          <div className="w-full max-w-[240px] mx-auto mt-4">
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#D4AF37] to-[#FFF1C5] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                style={{ width: `${scrollProgress}%` }}
                layoutId="timeline-progress"
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
            <div className="flex justify-between items-center mt-3 text-[9px] font-sans text-neutral-500 uppercase tracking-widest px-1">
              <span>← Swipe Left</span>
              <span>Swipe Right →</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
