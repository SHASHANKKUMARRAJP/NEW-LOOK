import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Sun, Sparkles, Wand2, ChevronLeft, ChevronRight } from 'lucide-react';

const serviceCategories = [
  {
    id: 'hair',
    name: 'Hair Couture',
    icon: Scissors,
    services: [
      { 
        name: 'Hair Styling', 
        price: '$70', 
        desc: 'Stylish hair for confidence',
        duration: '60 MNS',
        provider: 'Nusrat Jahan',
        image: '/service_hair.png'
      },
      { 
        name: 'Signature Haute Haircut', 
        price: '$120', 
        desc: 'Precision cut tailored to facial structure, wash and blowout.',
        duration: '60 MNS',
        provider: 'Nusrat Jahan',
        image: '/gallery_hair.png'
      },
      { 
        name: 'Balayage Artisan Color', 
        price: '$260', 
        desc: 'Bespoke hand-painted highlights for natural, sun-kissed dimensions.',
        duration: '120 MNS',
        provider: 'Marcus Cole',
        image: '/service_balayage.png'
      },
      { 
        name: 'Royal Keratin Therapy', 
        price: '$350', 
        desc: 'Premium smoothing treatment to eliminate frizz and infuse high-gloss shine.',
        duration: '90 MNS',
        provider: 'Nusrat Jahan',
        image: '/service_keratin.png'
      }
    ]
  },
  {
    id: 'skin',
    name: 'Skin Rituals',
    icon: Sun,
    services: [
      { 
        name: 'Facial Treatment', 
        price: '$65', 
        desc: 'Deep Skin Hydration Therapy',
        duration: '60 MNS',
        provider: 'Nabila Karim',
        image: '/service_facial.png'
      },
      { 
        name: 'Ocular Glow Hydrafacial', 
        price: '$180', 
        desc: 'Multi-step skin resurfacing treatment combining vacuum extraction and peptide infusion.',
        duration: '75 MNS',
        provider: 'Nabila Karim',
        image: '/service_hydrafacial.png'
      },
      { 
        name: 'Bio-Organic Lift Facial', 
        price: '$220', 
        desc: 'Advanced contouring massage using natural enzymes and marine collagen masks.',
        duration: '90 MNS',
        provider: 'Samantha Vance',
        image: '/service_lift_facial.png'
      },
      { 
        name: 'Gold Leaf Rejuvenation', 
        price: '$320', 
        desc: 'Pure 24k gold leaf skin facial designed for cellular renewal and luxury radiance.',
        duration: '90 MNS',
        provider: 'Samantha Vance',
        image: '/service_gold_facial.png'
      }
    ]
  },
  {
    id: 'bridal',
    name: 'Bridal Artistry',
    icon: Sparkles,
    services: [
      { 
        name: 'Empress Bridal Makeup', 
        price: '$450', 
        desc: 'HD and Airbrush bridal application including trial, contour, and false lashes.',
        duration: '150 MNS',
        provider: 'Victoria Sterling',
        image: '/gallery_traditional_bride.png'
      },
      { 
        name: 'Imperial Bridal Hairstyle', 
        price: '$250', 
        desc: 'Prestige hairdressing, veil draping, and placement of bridal hair accessories.',
        duration: '90 MNS',
        provider: 'Nusrat Jahan',
        image: '/service_bridal_hair.png'
      },
      { 
        name: 'Pre-Bridal Glow Package', 
        price: '$600', 
        desc: 'Multi-session full body massage, customized facial, and deep conditioning salon hair spa.',
        duration: '240 MNS',
        provider: 'Victoria & Samantha',
        image: '/service_pre_bridal_glow.png'
      },
      { 
        name: 'Royal Bridal Companion', 
        price: '$950', 
        desc: 'Full-day stylist assistance for touch-ups, outfit changes, and hair transitions.',
        duration: 'ALL DAY',
        provider: 'Victoria Sterling',
        image: '/service_bridal_companion.png'
      }
    ]
  },
  {
    id: 'makeup',
    name: 'Glamour Makeup',
    icon: Wand2,
    services: [
      { 
        name: 'Makeup', 
        price: '$55', 
        desc: 'Deep Skin Hydration Therapy',
        duration: '60 MNS',
        provider: 'Tanvir Hasan',
        image: '/service_makeup.png'
      },
      { 
        name: 'Eyelash', 
        price: '$82', 
        desc: 'Deep Skin Hydration Therapy',
        duration: '60 MNS',
        provider: 'Sophia Blake',
        image: '/service_eyelash.png'
      },
      { 
        name: 'Red Carpet Glamour', 
        price: '$160', 
        desc: 'High-contrast fashion makeup for special galas, proms, and upscale photography.',
        duration: '90 MNS',
        provider: 'Tanvir Hasan',
        image: '/service_glamour_makeup.png'
      },
      { 
        name: 'Airbrush Perfection', 
        price: '$190', 
        desc: 'Flawless, water-resistant base makeup with ultra-thin weightless coverage.',
        duration: '75 MNS',
        provider: 'Sophia Blake',
        image: '/service_airbrush.png'
      }
    ]
  }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('hair');
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeCategory]);

  const activeData = serviceCategories.find((cat) => cat.id === activeCategory);

  return (
    <section id="services" className="relative py-24 bg-darkBg overflow-hidden border-t border-white/5">
      {/* Ambient background light */}
      <div className="glow-orb w-[500px] h-[500px] bg-[#D4AF37]/5 bottom-0 left-0 pointer-events-none" />
      <div className="glow-orb w-[400px] h-[400px] bg-[#D4AF37]/2 top-12 right-12 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans tracking-[0.4em] text-[10px] text-[#D4AF37] uppercase mb-4 font-medium px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.1)] inline-block">
            Our Menu
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mt-3">
            The Platinum <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37]">Services Menu</span>
          </h2>
          <p className="font-sans text-neutral-500 text-xs md:text-sm tracking-wide mt-4 max-w-xl mx-auto leading-relaxed font-light">
            Indulge in a curated selection of premium salon offerings. Select a category below to explore our signature treatments.
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-8" />
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full text-xs font-sans font-medium tracking-widest uppercase transition-all duration-300 relative z-10 ${
                  isActive 
                    ? 'text-white bg-gradient-to-r from-[#D4AF37]/20 to-[#FFF1C5]/10 border border-[#D4AF37]/45 shadow-[0_0_20px_rgba(212,175,55,0.25)]' 
                    : 'text-neutral-400 border border-white/5 bg-white/[0.01] hover:text-white hover:border-[#D4AF37]/20'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 transition-transform duration-300 ${isActive ? 'text-[#D4AF37] scale-110' : ''}`} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Services List Panel with Swiper Carousel */}
        <div className="relative min-h-[400px] group/carousel">
          {/* Previous Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-neonOrange/30 bg-black/85 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] hidden md:flex"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-neonOrange/30 bg-black/85 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] hidden md:flex"
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

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
                  transition: { staggerChildren: 0.05 }
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 0.15 }
                }
              }}
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none pb-8 pt-4 px-2 touch-pan-x"
            >
              {activeData.services.map((service) => (
                <motion.div
                  key={service.name}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
                  }}
                  className="snap-start shrink-0 w-[290px] md:w-[350px] min-h-[440px] flex flex-col rounded-2xl overflow-hidden bg-gradient-to-br from-[#12100c]/90 to-[#050505]/95 border border-white/5 hover:md:border-[#D4AF37]/35 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.85)] hover:md:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.08)] transition-all duration-300 hover:md:-translate-y-1.5 group"
                >
                  {/* Top: Image Section */}
                  <div className="w-full h-48 relative overflow-hidden border-b border-white/5">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Bottom: Content Details */}
                  <div className="flex-grow p-6 flex flex-col justify-between">
                    <div>
                      {/* Name */}
                      <div className="mb-2">
                        <h3 className="font-serif text-[18px] md:text-[20px] text-white group-hover:text-[#D4AF37] leading-snug font-normal tracking-wide transition-colors duration-300">
                          {service.name}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-neutral-400 group-hover:text-neutral-300 transition-colors duration-500 text-xs md:text-sm leading-relaxed mt-2 font-light">
                        {service.desc}
                      </p>
                    </div>

                    {/* Duration / Provider Badge */}
                    <div className="mt-6">
                      <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#D4AF37] text-black text-[10px] font-cyber font-bold tracking-widest uppercase leading-none shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                        {service.duration} | {service.provider}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Notes bottom text */}
        <div className="text-center mt-20">
          <p className="font-sans text-[10px] tracking-[0.25em] text-[#D4AF37]/60 uppercase max-w-xl mx-auto leading-relaxed">
            * All treatments are tailored to individual needs. Consultation is included with every session.
          </p>
        </div>

      </div>
    </section>
  );
}


