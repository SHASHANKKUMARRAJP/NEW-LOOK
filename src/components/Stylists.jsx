import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeIndicator from './SwipeIndicator';
import { Instagram, Calendar, Sparkles, Lock } from 'lucide-react';
import AdminStylistDashboard from './AdminStylistDashboard';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const defaultStylists = [
  {
    name: 'Samantha Hayes',
    role: 'Master Hair Couturier',
    experience: '12 Years Experience',
    bio: 'Specializes in precision French cuts, custom balayage blends, and prestige hair health therapies.',
    image: 'stylist_samantha.png',
    instagram: '@samantha_couture'
  },
  {
    name: 'Victoria Sterling',
    role: 'Elite Aesthetician & Skincare Expert',
    experience: '10 Years Experience',
    bio: 'Expert in dermal rejuvenation, cell-active facials, and organic peel restoration treatments.',
    image: 'stylist_victoria.png',
    instagram: '@victoria_skin'
  },
  {
    name: 'Marcus Vance',
    role: 'Royal Bridal & Celebrity Artist',
    experience: '14 Years Experience',
    bio: 'Crafts flawless HD airbrush bridal makeups and signature high-fashion runway looks.',
    image: 'stylist_marcus.png',
    instagram: '@marcus_glam'
  }
];

export default function Stylists() {
  const scrollContainerRef = useRef(null);
  const [stylistsList, setStylistsList] = useState(defaultStylists);
  const [isAdmin, setIsAdmin] = useState(false);

  const isFirebaseConnected = db && db.app && db.app.options && db.app.options.apiKey && db.app.options.apiKey !== 'YOUR_API_KEY';

  useEffect(() => {
    if (isFirebaseConnected) {
      const q = query(collection(db, 'stylists'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const fetchedStylists = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setStylistsList(fetchedStylists);
        } else {
          setStylistsList(defaultStylists);
        }
      }, (error) => {
        console.error("Firebase fetch error:", error);
      });
      return () => unsubscribe();
    }
  }, [isFirebaseConnected]);

  const onAdminClick = () => {
    const pin = prompt("Enter Admin PIN:");
    if (pin === "2026") {
      setIsAdmin(true);
    } else if (pin) {
      alert("Incorrect PIN");
    }
  };

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
  }, []);

  return (
    <section id="stylists" className="relative py-24 bg-darkBg overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="glow-orb w-[500px] h-[500px] bg-neonOrange/5 top-1/3 right-1/4 animate-float pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-sans tracking-[0.4em] text-[10px] text-[#D4AF37] uppercase mb-4 font-medium px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.1)] inline-block">
            The Artisans
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mt-4">
            Master Stylists &amp; <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37]">Artists</span>
          </h2>
          <p className="font-sans text-neutral-200 text-xs md:text-sm tracking-wide mt-6 max-w-xl mx-auto font-light">
            Meet the award-winning professionals dedicated to sculpting your signature look with precision and care.
          </p>
          
          {!isAdmin && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onAdminClick}
              className="mt-6 mx-auto flex items-center justify-center gap-2 px-6 py-2.5 border border-white/10 text-neutral-400 font-cyber font-medium uppercase tracking-widest text-[10px] rounded-lg hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              Admin Access
            </motion.button>
          )}

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-8" />
        </div>

        {isAdmin && (
           <AdminStylistDashboard 
             stylists={stylistsList}
             setStylists={setStylistsList}
             onLockPortal={() => setIsAdmin(false)}
           />
        )}

        {/* Stylists Swiper Carousel on Mobile, Responsive Grid on Desktop */}
        <div className="relative min-h-[480px]">
          <div 
            ref={scrollContainerRef}
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scroll-smooth scrollbar-none pb-8 md:pb-0 pt-4 px-2 md:px-0 touch-pan-x"
          >
            {stylistsList.map((stylist, index) => (
              <motion.div
                key={stylist.id || stylist.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                className="snap-start shrink-0 w-[280px] md:w-full group relative h-[480px] rounded-2xl overflow-hidden premium-card flex flex-col justify-end"
              >
                {/* Corner bracket decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[#D4AF37]/30 rounded-tl-2xl z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-[#D4AF37]/30 rounded-tr-2xl z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-[#D4AF37]/30 rounded-bl-2xl z-20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-[#D4AF37]/30 rounded-br-2xl z-20 pointer-events-none" />

                {/* Animated Shimmer Overlay */}
                <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer z-20 pointer-events-none" />
                
                {/* Profile Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-95 group-hover:contrast-[1.05]"
                  style={{ backgroundImage: `url('${stylist.image}')` }}
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Card Top Badges */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="font-cyber text-[8px] tracking-[0.25em] text-[#D4AF37] border border-[#D4AF37]/30 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full uppercase">
                    {stylist.experience}
                  </span>
                </div>
                
                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-[#D4AF37]/30 w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] animate-[pulse_3s_infinite]" />
                </div>

                {/* Card Info Panel */}
                <div className="relative p-6 z-10 w-full flex flex-col justify-end min-h-[160px] bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                  {/* Name & Role */}
                  <h3 className="font-cyber font-bold tracking-[0.15em] text-base uppercase text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {stylist.name}
                  </h3>
                  <p className="font-cyber text-[9px] text-[#D4AF37] tracking-[0.2em] uppercase font-semibold mb-3">
                    {stylist.role}
                  </p>

                  {/* Bio & Links - expands on hover on desktop, always visible on mobile */}
                  <div className="transition-all duration-500 ease-in-out overflow-hidden max-h-[200px] opacity-100 md:max-h-0 md:opacity-0 md:group-hover:max-h-[200px] md:group-hover:opacity-100 mt-0 md:group-hover:mt-2">
                    <p className="font-sans text-neutral-300 text-xs leading-relaxed mb-4 font-light">
                      {stylist.bio}
                    </p>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <a 
                        href={stylist.instagram}
                        className="flex items-center space-x-1.5 text-neutral-400 hover:text-[#D4AF37] text-xs transition-colors"
                      >
                        <Instagram className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-sans text-[11px] font-light tracking-wide">{stylist.instagram}</span>
                      </a>
                      
                      <a
                        href="#contact"
                        className="flex items-center space-x-1.5 text-white hover:text-[#D4AF37] text-xs font-cyber tracking-widest uppercase transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Book Now</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Swipe Hint */}
        <SwipeIndicator />

      </div>
    </section>
  );
}
