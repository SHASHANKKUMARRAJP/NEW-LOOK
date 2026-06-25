import { motion } from 'framer-motion';
import SwipeIndicator from './SwipeIndicator';
import { Quote, Star, ExternalLink, Instagram, ArrowLeft, ArrowRight } from 'lucide-react';

const MAPS_LINK = "https://www.google.com/maps/place/New+Look+ladies+beauty+Parlour/@13.0114012,77.4726155,12z/data=!4m12!1m2!2m1!1snew+look+salon+bangalore+lingarajapuram!3m8!1s0x3bae178985ac7289:0xf74808b806c215!8m2!3d13.0114012!4d77.6250508!9m1!1b1!15sCiduZXcgbG9vayBzYWxvbiBiYW5nYWxvcmUgbGluZ2FyYWphcHVyYW1aKSInbmV3IGxvb2sgc2Fsb24gYmFuZ2Fsb3JlIGxpbmdhcmFqYXB1cmFtkgEMYmVhdXR5X3NhbG9umgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJ0S2RWSXdTbXBXYkU0eFlsUldkMUZZUmpCTVdHUnhXbXhzU21Fell4QULgAQD6AQQIRBAp!16s%2Fg%2F11gtz9p47g?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D";

export default function Testimonials() {
  // Variants for staggered star entry
  const starVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -20 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: i * 0.12,
        type: "spring",
        stiffness: 180,
        damping: 12
      }
    })
  };

  return (
    <section id="testimonials" className="relative py-24 bg-[#030303] overflow-hidden border-t border-white/5">
      {/* Background glow orbs */}
      <div className="glow-orb w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-cyberOrange/5 top-1/4 left-1/4" />
      <div className="glow-orb w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-[#D4AF37]/5 bottom-10 right-10" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-sans tracking-[0.4em] text-[10px] text-[#D4AF37] uppercase block mb-3 font-medium">
            Prestige Reviews
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight">
            Guest <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37]">Experiences</span>
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
        </div>

        {/* Testimonial Link Card */}
        <div className="relative flex flex-col justify-center items-center">
          
          {/* Animated Background Quote Icon */}
          <motion.div 
            animate={{ 
              y: [0, -6, 0],
              rotate: [180, 182, 180]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 text-[#D4AF37]/5 pointer-events-none select-none"
          >
            <Quote className="w-24 h-24 rotate-180" />
          </motion.div>

          {/* Interactive Cards with premium animations */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 relative w-full max-w-5xl mx-auto z-10 flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-8 px-4 md:px-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 touch-pan-x"
          >
            {/* Google Reviews Card */}
            <motion.div
              className="w-[280px] sm:w-[320px] shrink-0 flex-none snap-start md:w-auto md:snap-align-none"
              animate={{ 
                y: [0, -12, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 30px 60px -15px rgba(212,175,55,0.18)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative h-full w-full p-10 md:p-14 rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#12100c]/95 via-[#0a0907]/98 to-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.02)] hover:border-[#D4AF37]/50 flex flex-col items-center justify-center cursor-pointer group backdrop-blur-md overflow-hidden"
              >
                {/* Ambient internal card glow */}
                <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-[#D4AF37]/5 blur-2xl group-hover:bg-[#D4AF37]/15 group-hover:scale-125 transition-all duration-700 pointer-events-none z-0" />

                {/* Elegant decorative background noise grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-500 z-0 pointer-events-none" />

                {/* Continuous Animated Gold Shimmer Overlay */}
                <motion.div 
                  className="absolute inset-0 skew-x-12 bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent z-0 pointer-events-none" 
                  animate={{ x: ["-150%", "250%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                />

                {/* Corner bracket decorations */}
                <div className="absolute top-0 left-0 w-4.5 h-4.5 border-l border-t border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-tl-2xl z-10" />
                <div className="absolute top-0 right-0 w-4.5 h-4.5 border-r border-t border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-tr-2xl z-10" />
                <div className="absolute bottom-0 left-0 w-4.5 h-4.5 border-l border-b border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-bl-2xl z-10" />
                <div className="absolute bottom-0 right-0 w-4.5 h-4.5 border-r border-b border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-br-2xl z-10" />

                {/* Stars Entry showing 4.1 rating */}
                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <div className="flex items-center space-x-1.5">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={starVariants}
                      >
                        <Star className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                      </motion.div>
                    ))}
                    <motion.div
                      custom={4}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={starVariants}
                    >
                      <Star className="w-6 h-6 text-[#D4AF37]/45" />
                    </motion.div>
                  </div>

                  {/* Numeric 4.1 badge */}
                  <span className="font-serif text-[#D4AF37] text-sm font-semibold tracking-wider bg-[#D4AF37]/10 px-2.5 py-0.5 rounded border border-[#D4AF37]/25 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                    4.1 / 5
                  </span>
                </div>

                {/* Review Title with Arrow animation */}
                <h3 className="font-serif tracking-wide text-lg md:text-xl lg:text-2xl text-white mb-4 flex items-center gap-3 relative z-10 font-normal">
                  <span className="group-hover:text-[#FFF1C5] transition-colors duration-300 text-center">
                    Press this card to view reviews
                  </span>
                  <ExternalLink className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 flex-shrink-0" />
                </h3>
                
                {/* Description */}
                <p className="font-sans text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 text-xs md:text-sm tracking-[0.03em] font-light max-w-md relative z-10 leading-relaxed text-center">
                  Read what our lovely guests have to say about their luxury experiences at New Look Beauty Parlour on Google.
                </p>
              </motion.a>
            </motion.div>

            {/* Instagram Card */}
            <motion.div
              className="w-[280px] sm:w-[320px] shrink-0 flex-none snap-start md:w-auto md:snap-align-none"
              animate={{ 
                y: [0, -12, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 30px 60px -15px rgba(212,175,55,0.18)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative h-full w-full p-10 md:p-14 rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#12100c]/95 via-[#0a0907]/98 to-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.02)] hover:border-[#D4AF37]/50 flex flex-col items-center justify-center cursor-pointer group backdrop-blur-md overflow-hidden"
              >
                {/* Ambient internal card glow */}
                <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-[#D4AF37]/5 blur-2xl group-hover:bg-[#D4AF37]/15 group-hover:scale-125 transition-all duration-700 pointer-events-none z-0" />

                {/* Elegant decorative background noise grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-500 z-0 pointer-events-none" />

                {/* Continuous Animated Gold Shimmer Overlay */}
                <motion.div 
                  className="absolute inset-0 skew-x-12 bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent z-0 pointer-events-none" 
                  animate={{ x: ["-150%", "250%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5, delay: 0.5 }}
                />

                {/* Corner bracket decorations */}
                <div className="absolute top-0 left-0 w-4.5 h-4.5 border-l border-t border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-tl-2xl z-10" />
                <div className="absolute top-0 right-0 w-4.5 h-4.5 border-r border-t border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-tr-2xl z-10" />
                <div className="absolute bottom-0 left-0 w-4.5 h-4.5 border-l border-b border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-bl-2xl z-10" />
                <div className="absolute bottom-0 right-0 w-4.5 h-4.5 border-r border-b border-[#D4AF37]/15 group-hover:border-[#D4AF37]/65 transition-all duration-500 rounded-br-2xl z-10" />

                {/* Instagram Icon */}
                <div className="flex items-center justify-center mb-8 relative z-10 bg-gradient-to-br from-[#D4AF37] to-[#8C7326] p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <Instagram className="w-8 h-8 text-[#0a0907]" />
                </div>

                {/* Title with Arrow animation */}
                <h3 className="font-serif tracking-wide text-lg md:text-xl lg:text-2xl text-white mb-4 flex items-center gap-3 relative z-10 font-normal">
                  <span className="group-hover:text-[#FFF1C5] transition-colors duration-300 text-center">
                    Press to see Instagram Account
                  </span>
                  <ExternalLink className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 flex-shrink-0" />
                </h3>
                
                {/* Description */}
                <p className="font-sans text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 text-xs md:text-sm tracking-[0.03em] font-light max-w-md relative z-10 leading-relaxed text-center">
                  Follow us on Instagram for daily beauty inspiration, behind-the-scenes content, and exclusive salon updates.
                </p>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Swipe Hint (Mobile Only) */}
          <SwipeIndicator />

        </div>

      </div>
    </section>
  );
}
