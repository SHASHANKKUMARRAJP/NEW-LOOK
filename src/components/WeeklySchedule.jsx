import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Lock, Save, Edit3, ShieldCheck } from 'lucide-react';

const defaultSchedule = [
  { day: 'Monday',    open: '10:00 AM', close: '8:00 PM', lunchStart: '01:00 PM', lunchEnd: '02:00 PM', closed: false },
  { day: 'Tuesday',   open: '10:00 AM', close: '8:00 PM', lunchStart: '01:00 PM', lunchEnd: '02:00 PM', closed: false },
  { day: 'Wednesday', open: '10:00 AM', close: '8:00 PM', lunchStart: '01:00 PM', lunchEnd: '02:00 PM', closed: false },
  { day: 'Thursday',  open: '10:00 AM', close: '8:00 PM', lunchStart: '01:00 PM', lunchEnd: '02:00 PM', closed: false },
  { day: 'Friday',    open: '10:00 AM', close: '8:00 PM', lunchStart: '01:00 PM', lunchEnd: '02:00 PM', closed: false },
  { day: 'Saturday',  open: '09:00 AM', close: '9:00 PM', lunchStart: '01:00 PM', lunchEnd: '02:00 PM', closed: false },
  { day: 'Sunday',    open: '11:00 AM', close: '6:00 PM', lunchStart: '01:00 PM', lunchEnd: '02:00 PM', closed: false },
];

const loadSchedule = () => {
  try {
    const saved = localStorage.getItem('newlook_schedule');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((item, index) => ({
        ...defaultSchedule[index],
        ...item
      }));
    }
    return defaultSchedule;
  } catch { return defaultSchedule; }
};

// Converts 12-hour AM/PM string (e.g., "10:00 AM" or "8:00 PM") to 24-hour HH:MM format
const to24h = (timeStr) => {
  if (!timeStr) return '';
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return '';
  let [_, hours, minutes, ampm] = match;
  hours = parseInt(hours, 10);
  if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
  if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${minutes}`;
};

// Converts 24-hour HH:MM format back to 12-hour AM/PM string
const to12h = (time24) => {
  if (!time24) return '';
  const parts = time24.split(':');
  if (parts.length !== 2) return '';
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes} ${ampm}`;
};

export default function WeeklySchedule({ isAdmin, onAdminClick }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const [schedule, setSchedule]     = useState(loadSchedule);
  const [editMode, setEditMode]     = useState(false);
  const [editData, setEditData]     = useState([]);
  const [saveFlash, setSaveFlash]   = useState(false);

  // Auto-patch state during hot reloads if lunchStart is missing
  useEffect(() => {
    if (schedule.some(row => row.lunchStart === undefined)) {
      setSchedule(loadSchedule());
    }
  }, [schedule]);

  const handleSave = () => {
    setSchedule(editData);
    localStorage.setItem('newlook_schedule', JSON.stringify(editData));
    setEditMode(false);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 3000);
  };

  const updateRow = (i, field, value) => {
    const u = [...editData];
    u[i] = { ...u[i], [field]: value };
    setEditData(u);
  };

  const rows = editMode ? editData : schedule;

  return (
    <section id="schedule" className="relative py-24 bg-darkBg overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="glow-orb w-[400px] h-[400px] bg-neonOrange/5 top-1/2 right-10 -translate-y-1/2" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-sans tracking-[0.4em] text-[10px] text-[#D4AF37] uppercase mb-4 font-medium px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.1)] inline-block">
            Visit Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mt-4">
            Weekly <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37]">Operating Hours</span>
          </h2>
          <p className="font-sans text-neutral-200 text-xs md:text-sm tracking-wide mt-6 max-w-sm mx-auto font-light">
            Walk in or book in advance — we're open all week to serve you.
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-8" />
        </div>

        {/* Schedule Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#12100c]/90 via-[#0a0907]/95 to-[#050505]/98 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.85)] backdrop-blur-md overflow-hidden"
        >
          {/* Corner bracket decorations */}
          <div className="absolute top-0 left-0 w-5 h-5 border-l border-t border-[#D4AF37]/30 rounded-tl-2xl z-10" />
          <div className="absolute top-0 right-0 w-5 h-5 border-r border-t border-[#D4AF37]/30 rounded-tr-2xl z-10" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-l border-b border-[#D4AF37]/30 rounded-bl-2xl z-10" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-r border-b border-[#D4AF37]/30 rounded-br-2xl z-10" />

          {/* Card top bar */}
          <div className="flex items-center justify-between px-7 py-4 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-neonOrange" />
              <span className="font-cyber text-[9px] tracking-[0.35em] text-neutral-400 uppercase">Operating Hours</span>
            </div>
            {!editMode ? (
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (isAdmin) {
                    setEditData(JSON.parse(JSON.stringify(schedule)));
                    setEditMode(true);
                  } else {
                    onAdminClick();
                  }
                }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 hover:border-neonOrange/50 hover:text-neonOrange text-neutral-500 transition-all duration-300 font-cyber text-[9px] tracking-widest uppercase"
              >
                <Edit3 className="w-3 h-3" />
                Edit
              </motion.button>
            ) : (
              <div className="flex items-center gap-2">
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setEditMode(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-neutral-400 hover:text-white transition-all font-cyber text-[9px] tracking-widest uppercase">
                  <X className="w-3 h-3" /> Cancel
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleSave}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-neonOrange/40 bg-neonOrange/10 text-neonOrange hover:bg-neonOrange/20 transition-all font-cyber text-[9px] tracking-widest uppercase shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                  <Save className="w-3 h-3" /> Save
                </motion.button>
              </div>
            )}
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/[0.04] px-2">
            {rows.map((row, i) => {
              const isToday = row.day === today;
              return (
                <motion.div
                  key={row.day}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className={`relative flex ${
                    editMode
                      ? 'flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-3.5 sm:py-4'
                      : 'flex-row items-center justify-between py-4'
                  } px-3 sm:px-5 justify-between rounded-xl mx-0 my-1 transition-all duration-300 ${
                    isToday
                      ? 'bg-gradient-to-r from-neonOrange/10 to-transparent border border-neonOrange/20 shadow-[0_0_20px_rgba(212,175,55,0.07)]'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Day name */}
                  <div className="flex items-center gap-3">
                    {isToday && (
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonOrange opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neonOrange" />
                      </span>
                    )}
                    <span className={`font-cyber tracking-[0.2em] text-sm uppercase ${isToday ? 'text-neonOrange' : 'text-white/75'}`}>
                      {row.day}
                    </span>
                    {isToday && (
                      <span className="font-cyber text-[8px] tracking-widest text-neonOrange/70 border border-neonOrange/25 px-2 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </div>

                  {/* Right side: time or edit inputs */}
                  {editMode ? (
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" checked={row.closed}
                          onChange={(e) => updateRow(i, 'closed', e.target.checked)}
                          className="accent-neonOrange w-3.5 h-3.5 rounded border-white/20 bg-black/40" />
                        <span className="font-cyber text-[10px] tracking-widest uppercase text-neutral-400">Closed</span>
                      </label>
                      {!row.closed && (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-end gap-2">
                            <span className="font-cyber text-[9px] tracking-widest uppercase text-neutral-500 w-10 text-right hidden sm:block">Open</span>
                            <input
                              type="time"
                              value={to24h(row.open)}
                              onChange={(e) => updateRow(i, 'open', to12h(e.target.value))}
                              style={{ colorScheme: 'dark' }}
                              className="bg-black/50 border border-white/10 focus:border-neonOrange rounded-lg px-2 py-1.5 text-white text-xs w-24 sm:w-28 focus:outline-none transition-colors text-center"
                            />
                            <span className="text-neutral-600">—</span>
                            <input
                              type="time"
                              value={to24h(row.close)}
                              onChange={(e) => updateRow(i, 'close', to12h(e.target.value))}
                              style={{ colorScheme: 'dark' }}
                              className="bg-black/50 border border-white/10 focus:border-neonOrange rounded-lg px-2 py-1.5 text-white text-xs w-24 sm:w-28 focus:outline-none transition-colors text-center"
                            />
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <span className="font-cyber text-[9px] tracking-widest uppercase text-neutral-500 w-10 text-right hidden sm:block">Lunch</span>
                            <input
                              type="time"
                              value={to24h(row.lunchStart)}
                              onChange={(e) => updateRow(i, 'lunchStart', to12h(e.target.value))}
                              style={{ colorScheme: 'dark' }}
                              className="bg-black/50 border border-white/10 focus:border-neonOrange rounded-lg px-2 py-1.5 text-white text-xs w-24 sm:w-28 focus:outline-none transition-colors text-center"
                            />
                            <span className="text-neutral-600">—</span>
                            <input
                              type="time"
                              value={to24h(row.lunchEnd)}
                              onChange={(e) => updateRow(i, 'lunchEnd', to12h(e.target.value))}
                              style={{ colorScheme: 'dark' }}
                              className="bg-black/50 border border-white/10 focus:border-neonOrange rounded-lg px-2 py-1.5 text-white text-xs w-24 sm:w-28 focus:outline-none transition-colors text-center"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {row.closed ? (
                        <span className="font-cyber text-[9px] tracking-widest text-red-400/70 uppercase border border-red-400/15 px-3 py-1 rounded-full bg-red-400/5">
                          Closed
                        </span>
                      ) : (
                        <>
                          <div className="flex flex-col items-end">
                            <span className={`font-sans text-sm tracking-wide tabular-nums ${isToday ? 'text-white' : 'text-neutral-400'}`}>
                              {row.open} – {row.close}
                            </span>
                            {(row.lunchStart && row.lunchEnd) && (
                              <span className={`font-cyber text-[9px] tracking-widest uppercase mt-0.5 ${isToday ? 'text-neonOrange' : 'text-neutral-300'}`}>
                                Lunch: {row.lunchStart} – {row.lunchEnd}
                              </span>
                            )}
                          </div>
                          <div className={`w-2 h-2 rounded-full shrink-0 ${isToday ? 'bg-neonOrange shadow-[0_0_8px_rgba(212,175,55,0.9)]' : 'bg-emerald-500/40'}`} />
                        </>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Card footer */}
          <div className="flex items-center justify-between px-7 py-4 border-t border-white/5 mt-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
              <p className="font-sans text-[10px] text-neutral-600 tracking-wide">Hours may vary on public holidays.</p>
            </div>
            <AnimatePresence>
              {saveFlash && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="font-cyber text-[9px] tracking-widest text-neonOrange uppercase">
                  ✓ Schedule saved
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
