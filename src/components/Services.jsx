import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Sun, Sparkles, Wand2 } from 'lucide-react';

const serviceCategories = [
  {
    id: 'hair',
    name: 'Hair Couture',
    icon: Scissors,
    services: [
      { name: 'Signature Haute Haircut', price: '$120+', desc: 'Precision cut tailored to facial structure, includes luxurious wash and blowout.' },
      { name: 'Balayage Artisan Color', price: '$260+', desc: 'Bespoke hand-painted highlights for natural, sun-kissed dimensions.' },
      { name: 'Royal Keratin Therapy', price: '$350+', desc: 'Premium smoothing treatment to eliminate frizz and infuse high-gloss shine.' },
      { name: 'Elixir Hair & Scalp Ritual', price: '$95+', desc: 'Deep botanical conditioning treatment paired with active micro-circulation massage.' }
    ]
  },
  {
    id: 'skin',
    name: 'Skin Rituals',
    icon: Sun,
    services: [
      { name: 'Ocular Glow Hydrafacial', price: '$180+', desc: 'Multi-step skin resurfacing treatment combining vacuum extraction and peptide infusion.' },
      { name: 'Bio-Organic Lift Facial', price: '$220+', desc: 'Advanced contouring massage using natural enzymes and marine collagen masks.' },
      { name: 'Gold Leaf Rejuvenation', price: '$320+', desc: 'Pure 24k gold leaf skin facial designed for cellular renewal and luxury radiance.' },
      { name: 'Micro-Dermabrasion Glow', price: '$150+', desc: 'Intense mechanical exfoliation to eliminate dead skin cells and reveal fresh tone.' }
    ]
  },
  {
    id: 'bridal',
    name: 'Bridal Artistry',
    icon: Sparkles,
    services: [
      { name: 'Empress Bridal Makeup', price: '$450+', desc: 'HD and Airbrush bridal application including trial, contour, and false lashes.' },
      { name: 'Imperial Bridal Hairstyle', price: '$250+', desc: 'Prestige hairdressing, veil draping, and placement of bridal hair accessories.' },
      { name: 'Pre-Bridal Glow Package', price: '$600+', desc: 'Multi-session full body massage, customized facial, and deep conditioning salon hair spa.' },
      { name: 'Royal Bridal Companion', price: '$950+', desc: 'Full-day stylist assistance for touch-ups, outfit changes, and hair transitions.' }
    ]
  },
  {
    id: 'makeup',
    name: 'Glamour Makeup',
    icon: Wand2,
    services: [
      { name: 'Red Carpet Glamour', price: '$160+', desc: 'High-contrast fashion makeup for special galas, proms, and upscale photography.' },
      { name: 'Airbrush Perfection', price: '$190+', desc: 'Flawless, water-resistant base makeup with ultra-thin weightless coverage.' },
      { name: 'Editorial Fashion Look', price: '$220+', desc: 'Creative, thematic face design tailored to fashion runways and magazines.' },
      { name: 'Prestige Lash & Brow Tint', price: '$85+', desc: 'Semi-permanent styling, shaping, and premium tinting for fuller eyes.' }
    ]
  }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('hair');

  const activeData = serviceCategories.find((cat) => cat.id === activeCategory);

  return (
    <section id="services" className="relative py-24 bg-darkBg overflow-hidden border-t border-white/5">
      {/* Ambient background light */}
      <div className="glow-orb w-[500px] h-[500px] bg-neonOrange/5 bottom-0 left-0" />
      <div className="glow-orb w-[400px] h-[400px] bg-cyberOrange/[0.02] top-12 right-12" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-cyber tracking-[0.4em] text-[10px] text-[#D4AF37] uppercase block mb-3">Our Services</span>
          <h2 className="font-cyber font-black text-3xl md:text-5xl uppercase tracking-wider text-white">
            THE <span className="text-gradient">PLATINUM</span> SERVICES MENU
          </h2>
          <p className="font-sans text-neutral-500 text-xs md:text-sm tracking-wide mt-4 max-w-xl mx-auto leading-relaxed">
            Indulge in a curated selection of premium salon offerings. Select a category below to explore our signature treatments.
          </p>
          <div className="w-16 h-[2px] bg-neonOrange mx-auto mt-6" />
        </div>

        {/* Tab Buttons with sliding indicator */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3.5 rounded-full text-xs font-cyber tracking-widest uppercase transition-all duration-500 relative z-10 ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeServiceTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#FF4500]/15 border border-[#D4AF37]/40 shadow-[0_0_25px_rgba(212,175,55,0.25)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full border border-white/5 bg-white/[0.01] -z-10 hover:border-white/10 transition-colors duration-300" />
                )}
                <Icon className={`w-4.5 h-4.5 transition-transform duration-300 ${isActive ? 'text-neonOrange scale-110' : 'text-neutral-400'}`} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Services List Panel */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08
                  }
                },
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.2
                  }
                }
              }}
              className="grid md:grid-cols-2 gap-8"
            >
              {activeData.services.map((service, idx) => (
                <motion.div
                  key={service.name}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                  }}
                  whileHover="hover"
                  className="p-8 rounded-2xl flex flex-col justify-between group relative overflow-hidden border border-white/5 hover:border-[#D4AF37]/35 bg-gradient-to-br from-[#12100c]/40 via-[#0a0907]/50 to-[#050505]/60 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.08)] backdrop-blur-md transition-all duration-500 cursor-pointer"
                >
                  {/* Ambient internal card glow */}
                  <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-[#D4AF37]/3 blur-2xl group-hover:bg-[#D4AF37]/10 group-hover:scale-125 transition-all duration-700 pointer-events-none z-0" />

                  {/* Elegant decorative background pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.01] group-hover:opacity-[0.03] transition-opacity duration-500 z-0 pointer-events-none" />

                  {/* Animated Shimmer Overlay */}
                  <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer z-0 pointer-events-none" />

                  {/* Corner bracket decorations */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[#D4AF37]/10 group-hover:border-[#D4AF37]/50 transition-all duration-500 rounded-tl-xl z-10" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-[#D4AF37]/10 group-hover:border-[#D4AF37]/50 transition-all duration-500 rounded-tr-xl z-10" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-[#D4AF37]/10 group-hover:border-[#D4AF37]/50 transition-all duration-500 rounded-bl-xl z-10" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-[#D4AF37]/10 group-hover:border-[#D4AF37]/50 transition-all duration-500 rounded-br-xl z-10" />

                  <div className="relative z-10 flex flex-col h-full pl-6 border-l border-white/5 group-hover:border-[#D4AF37]/20 transition-all duration-500">
                    {/* Top Accent, Numbering & Price */}
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex items-center space-x-2">
                        <span className="font-cyber text-[9px] tracking-[0.2em] text-[#D4AF37]/40 group-hover:text-[#D4AF37]/80 transition-all duration-500 uppercase">
                          Experience
                        </span>
                        <span className="text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40">•</span>
                        <span className="font-serif italic text-xs text-neutral-500 group-hover:text-[#D4AF37] transition-all duration-500">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                      
                      {/* Metallic Luxury Price Tag */}
                      <span className="font-cyber text-[10px] tracking-widest text-[#D4AF37] bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-lg group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 transition-all duration-500 shadow-sm">
                        {service.price}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg md:text-xl text-white group-hover:text-[#D4AF37] transition-all duration-500 mb-3 tracking-wide font-normal">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-neutral-400 group-hover:text-neutral-300 transition-colors duration-500 text-xs md:text-sm leading-relaxed font-light mt-1 flex-grow">
                      {service.desc}
                    </p>

                    {/* Subtle Discover Experience CTA */}
                    <div className="mt-8 flex items-center space-x-2 text-[10px] font-cyber tracking-[0.2em] text-neutral-500 group-hover:text-[#D4AF37] transition-colors duration-500 pt-4 border-t border-white/[0.03]">
                      <span>EXPLORE EXPERIENCE</span>
                      <motion.span 
                        className="inline-block text-xs"
                        variants={{
                          hover: { x: 4 }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Note subtext */}
        <div className="text-center mt-16">
          <p className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] text-[#D4AF37]/60 uppercase max-w-xl mx-auto leading-relaxed">
            * All experiences are bespoke. Complimentary private styling and consultations are provided to curate your personalized wellness journey.
          </p>
        </div>

      </div>
    </section>
  );
}

