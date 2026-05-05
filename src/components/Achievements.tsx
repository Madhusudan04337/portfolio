import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { achievementsData, achievementsCarouselData } from "../data";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { SymposymCardSwiper } from "./SymposymCardSwiper";

// For stats using count_up_interpolation
function CountUpStat({ data }: { data: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 }); // trigger on_scroll_into_view
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  const durationSec = data.id === "symposium_wins" ? 2 : 2.5;

  useEffect(() => {
    if (inView) {
      animate(count, data.value, { duration: durationSec, ease: "easeOut" });
    }
  }, [inView, count, data.value, durationSec]);

  return (
    <div ref={ref} className="relative z-10 flex flex-col items-center justify-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-zinc-200 hover:border-[#5E35B1]/40 transition-colors group shadow-sm hover:shadow-lg transition-all">
      <div className="absolute inset-0 bg-[#5E35B1]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
      <div className="text-5xl md:text-6xl font-display font-bold text-[#5E35B1] mb-4 drop-shadow-[0_0_15px_rgba(94,53,177,0.3)]">
        {data.prefix}
        <motion.span>{rounded}</motion.span>
        {data.suffix}
      </div>
      <div className="text-sm md:text-base text-zinc-600 font-medium text-center">
        {data.label}
      </div>
    </div>
  );
}

// For stats using fade_in_scale
function FadeInStat({ data }: { data: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ delay: 0.5, duration: 0.8 }} // fade_in_scale delay & duration
      className="relative z-10 flex flex-col items-center justify-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-zinc-200 hover:border-[#5E35B1]/40 transition-colors group shadow-xl shadow-zinc-200/50"
    >
      <div className="absolute inset-0 bg-[#5E35B1]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
      
      <div className="w-16 h-16 rounded-full bg-[#5E35B1]/20 flex items-center justify-center text-[#5E35B1] border border-[#5E35B1]/30 mb-6 drop-shadow-[0_0_15px_rgba(94,53,177,0.3)]">
        <span className="text-3xl font-display font-bold">{data.value}</span>
      </div>

      <div className="text-base text-zinc-800 font-semibold mb-4 text-center max-w-[200px] leading-tight">
        {data.label}
      </div>

      {/* Added context_data visually */}
      <div className="flex flex-col items-center gap-2 text-xs text-zinc-500 font-mono">
         <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> April 2026</span>
         <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Chennai</span>
      </div>
    </motion.div>
  );
}

function AchievementCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievementsCarouselData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentData = achievementsCarouselData[currentIndex];
  const customEase = [0.22, 1, 0.36, 1];

  return (
    <div 
      className="w-full mt-24 relative flex flex-col items-center px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-6xl relative h-[700px] md:h-[550px] bg-white rounded-[32px] border border-zinc-200/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] overflow-hidden">
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex} 
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }} // exit_transition_ms: 600
          >
            {/* Left Panel */}
            <motion.div 
              initial={{ x: "-150%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              transition={{ duration: 1.5, ease: customEase }}
              className={`p-8 md:p-16 flex flex-col h-full order-2 md:order-1 ${
                currentData.type === 'swiper' 
                  ? 'justify-start pt-4 md:pt-24 items-start text-left' 
                  : 'justify-center'
              }`}
            >
              <motion.h4 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.0, ease: customEase }}
                className="text-3xl md:text-4xl font-display font-bold text-zinc-900 mb-6 leading-tight"
              >
                {currentData.left_panel.header}
              </motion.h4>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8 whitespace-pre-line max-w-md mx-0"
              >
                {currentData.left_panel.body}
              </motion.p>
              {currentData.left_panel.link && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: customEase }}
                >
                  <a 
                    href={currentData.left_panel.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#5E35B1] hover:bg-[#4527A0] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-[#5E35B1]/20"
                  >
                    {currentData.left_panel.button_text} <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              )}
            </motion.div>

            {/* Right Panel */}
            <motion.div 
              initial={{ x: "150%", scale: 0.8, opacity: 0 }}
              animate={{ x: "0%", scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: customEase }}
              className="relative h-full w-full p-6 md:p-10 order-1 md:order-2"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-zinc-300/50 bg-[#F8F7FF] border border-zinc-200/50 relative">
                {/* Decorative background element */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(94,53,177,0.05)_0%,_transparent_70%)]" />
                {currentData.type === "swiper" ? (
                   <SymposymCardSwiper standalone={false} />
                ) : (
                  <img 
                    src={currentData.right_panel.visual_asset} 
                    alt={currentData.left_panel.header}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Trackers */}
      <div className="flex gap-3 mt-8">
        {achievementsCarouselData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 transition-all duration-500 rounded-full ${idx === currentIndex ? "w-8 bg-[#5E35B1]" : "w-2 bg-zinc-300 hover:bg-zinc-400"}`}
            aria-label={`Jump to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function Achievements() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-zinc-50 border-t border-zinc-200" id="achievements">
      {/* Background Style: curved_vector_wave simulation */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50 select-none overflow-hidden flex flex-col">
          <svg className="absolute w-full top-0 text-zinc-200 drop-shadow-sm" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" fillOpacity="1" d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,234.7C1120,235,1280,181,1360,154.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
           <div className="absolute w-full h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5E35B1]/20 via-zinc-50/0 to-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-widest text-[#5E35B1] font-mono mb-4 font-semibold">THE STATS</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-zinc-900">Milestones & Achievements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {achievementsData.map((stat) => (
             stat.id === "google_bootcamps" 
               ? <FadeInStat key={stat.id} data={stat} /> 
               : <CountUpStat key={stat.id} data={stat} />
          ))}
        </div>

        {/* New Split-Screen Animated Carousel */}
        <AchievementCarousel />
      </div>
    </section>
  );
}
