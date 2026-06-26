import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Lock } from 'lucide-react';

export default function ParlourRadar({ isAdmin, onAdminClick, onLockPortal }) {
  const [status, setStatus] = useState(() => {
    try { return localStorage.getItem('newlook_parlour_status') || 'free'; } 
    catch { return 'free'; }
  });

  const toggleStatus = () => {
    const newStatus = status === 'free' ? 'engaged' : 'free';
    setStatus(newStatus);
    localStorage.setItem('newlook_parlour_status', newStatus);
  };

  const isFree = status === 'free';

  return (
    <section id="radar" className="relative py-24 bg-[#0a0907] overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[150px] opacity-20 pointer-events-none rounded-full ${isFree ? 'bg-emerald-500' : 'bg-red-500'}`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans tracking-[0.4em] text-[10px] text-[#D4AF37] uppercase mb-4 font-medium px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 inline-block">
            Live Radar
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mt-4">
            Parlour <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37]">Activity</span>
          </h2>
          <p className="font-sans text-neutral-400 text-xs md:text-sm tracking-wide mt-4 max-w-md mx-auto font-light">
            Check our real-time radar to see if our stylists are currently engaged or if we have open chairs for immediate walk-ins.
          </p>
        </div>

        {/* Radar UI */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
          
          {/* The Radar */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-[#1a1814] bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center">
            
            {/* Grid circles */}
            <div className="absolute inset-0 border border-white/5 rounded-full m-8"></div>
            <div className="absolute inset-0 border border-white/5 rounded-full m-16 md:m-20"></div>
            <div className="absolute inset-0 border border-white/5 rounded-full m-24 md:m-32"></div>
            
            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-white/5"></div>
            <div className="absolute h-full w-[1px] bg-white/5"></div>

            {/* Scanner line animation */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full rounded-full"
              style={{
                background: isFree 
                  ? 'conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(52,211,153,0.4) 100%)' 
                  : 'conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(248,113,113,0.4) 100%)'
              }}
            >
              {/* Leading edge line */}
              <div className={`absolute top-0 left-1/2 w-[2px] h-1/2 -translate-x-1/2 origin-bottom ${isFree ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]' : 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,1)]'}`} />
            </motion.div>

            {/* Dots indicating engagement */}
            {!isFree && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} className="absolute top-[30%] right-[30%] w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_rgba(248,113,113,1)]" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} className="absolute bottom-[35%] left-[25%] w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_15px_rgba(248,113,113,1)]" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: 1.5 }} className="absolute top-[40%] left-[45%] w-4 h-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(248,113,113,1)]" />
              </>
            )}

            {/* Center Blip */}
            <div className={`absolute w-5 h-5 rounded-full border-[3px] border-[#050505] ${isFree ? 'bg-emerald-500 shadow-[0_0_20px_rgba(52,211,153,1)]' : 'bg-red-500 shadow-[0_0_20px_rgba(248,113,113,1)]'}`}></div>
          </div>

          {/* Status Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <div className="space-y-2">
              <h3 className="font-cyber text-xs tracking-[0.2em] text-neutral-500 uppercase">System Status</h3>
              <div className={`text-5xl md:text-6xl font-serif tracking-tight ${isFree ? 'text-emerald-400' : 'text-red-400'}`}>
                {isFree ? 'Free' : 'Engaged'}
              </div>
              <p className="text-neutral-300 font-light mt-4 max-w-[240px] text-sm leading-relaxed">
                {isFree 
                  ? 'Chairs are currently open. Walk in right now for premium service without the wait.' 
                  : 'All our stylists are currently with clients. Please wait or book ahead for an appointment.'}
              </p>
            </div>
            
            {isAdmin ? (
              <div className="mt-6 p-5 border border-white/5 bg-white/5 rounded-2xl backdrop-blur-sm flex flex-col items-center md:items-start w-full md:w-auto">
                <span className="text-[9px] font-cyber tracking-widest uppercase text-[#D4AF37] mb-4">Admin Controls</span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={toggleStatus}
                    className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:scale-105 transition-all font-cyber text-[10px] tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                  >
                    <Activity className="w-4 h-4" />
                    Set to {isFree ? 'Engaged' : 'Free'}
                  </button>
                  <button 
                    onClick={onLockPortal}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all font-cyber text-[9px] tracking-widest uppercase shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Lock Portal
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={onAdminClick}
                className="mt-6 px-5 py-2.5 text-[10px] font-cyber tracking-widest uppercase text-neutral-400 border border-neutral-600/50 rounded-full hover:text-white hover:border-white/50 hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" /> Admin Login to Update Radar
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
