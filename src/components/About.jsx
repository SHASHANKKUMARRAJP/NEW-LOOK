import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#020202] overflow-hidden border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[#D4AF37]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Editorial Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="font-sans tracking-[0.4em] text-[10px] text-[#D4AF37] uppercase mb-6 font-medium px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.1)] inline-block">
            Our Heritage
          </span>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
            Legacy of <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37]">Glamour & Prestige</span>
          </h2>
          
          <p className="font-sans text-neutral-400 text-sm md:text-base leading-[1.8] font-light mb-6 max-w-2xl">
            For over a decade and a half, <strong>NEW LOOK Beauty Parlour</strong> has been synonymous with high-end beauty transformations and unmatched luxury. Situated at the crossroads of fashion and indulgence, we offer a sanctuary where style meets relaxation.
          </p>
          
          <p className="font-sans text-neutral-400 text-sm md:text-base leading-[1.8] font-light mb-10 max-w-2xl">
            Our vision is simple: to make every client feel like royalty. Through continuous training in global hair and cosmetic trends, our artisans create looks that are not just beautiful, but deeply personal and empowering.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center mt-6 relative max-w-lg mx-auto"
          >
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6" />
            
            <motion.span 
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="font-serif italic text-xl md:text-2xl text-white font-light tracking-wide leading-relaxed drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)]"
            >
              "Beauty is an art, and <br /> 
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37] text-glow-subtle">
                you are the canvas.
              </span>"
            </motion.span>
            
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-6" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
