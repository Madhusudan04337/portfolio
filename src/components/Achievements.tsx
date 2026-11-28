import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { achievementsData, achievementsCarouselData } from "../data";
import { MapPin, Calendar, ArrowRight, ArrowLeft, Award, CheckCircle2 } from "lucide-react";
import { SymposymCardSwiper } from "./SymposymCardSwiper";

function preloadImage(src?: string) {
  if (!src) return;
  const img = new Image();
  img.src = src;
}

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
    <div ref={ref} className="relative z-10 flex flex-col items-center justify-center p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-zinc-200 hover:border-[#5E35B1]/40 transition-colors group shadow-sm hover:shadow-lg transition-all">
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
      className="relative z-10 flex flex-col items-center justify-center p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-zinc-200 hover:border-[#5E35B1]/40 transition-colors group shadow-xl shadow-zinc-200/50"
    >
      <div className="absolute inset-0 bg-[#5E35B1]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

      <div className="w-14 h-14 rounded-full bg-[#5E35B1]/20 flex items-center justify-center text-[#5E35B1] border border-[#5E35B1]/30 mb-5 drop-shadow-[0_0_15px_rgba(94,53,177,0.3)]">
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

  const goTo = (index: number) => {
    setCurrentIndex((index + achievementsCarouselData.length) % achievementsCarouselData.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievementsCarouselData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const imageSlides = achievementsCarouselData.filter(
      (item) => item.type !== "swiper" && item.right_panel?.visual_asset
    );

    preloadImage(imageSlides[0]?.right_panel?.visual_asset);
    preloadImage(imageSlides[1]?.right_panel?.visual_asset);
  }, []);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % achievementsCarouselData.length;
    const prevIndex = (currentIndex - 1 + achievementsCarouselData.length) % achievementsCarouselData.length;

    preloadImage(achievementsCarouselData[nextIndex]?.right_panel?.visual_asset);
    preloadImage(achievementsCarouselData[prevIndex]?.right_panel?.visual_asset);
  }, [currentIndex]);

  const currentData = achievementsCarouselData[currentIndex];
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <div
      className="w-full mt-24 relative flex flex-col items-center px-2 sm:px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-6xl relative md:h-[580px] bg-white rounded-[32px] border border-zinc-200/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] overflow-hidden">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative md:absolute md:inset-0 grid grid-cols-1 md:grid-cols-2 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Left Panel — Uniform structure and alignment across all slides */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: customEase }}
              className="p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full order-2 md:order-1 text-left"
            >
              {/* Top Bar: Category & Slide Counter */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider text-[#5E35B1] bg-[#5E35B1]/10 border border-[#5E35B1]/15">
                  {currentData.category}
                </span>
                <span className="text-xs font-mono text-zinc-400 tabular-nums">
                  <span className="text-zinc-900 font-semibold">{String(currentIndex + 1).padStart(2, "0")}</span>
                  {" / "}
                  {String(achievementsCarouselData.length).padStart(2, "0")}
                </span>
              </div>

              {/* Middle Content: Title, Description, Highlights, Metadata */}
              <div className="flex-1 flex flex-col justify-center space-y-5">
                <h4 className="text-2xl md:text-3xl font-display font-bold text-zinc-900 leading-snug tracking-tight">
                  {currentData.left_panel.header}
                </h4>

                <p className="text-zinc-600 text-sm md:text-[15px] leading-relaxed max-w-lg">
                  {currentData.left_panel.body}
                </p>

                <ul className="space-y-2 pt-1">
                  {currentData.left_panel.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-[#5E35B1] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-zinc-500 font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#5E35B1]" />
                    {currentData.left_panel.organizer}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#5E35B1]" />
                    {currentData.left_panel.location}
                  </span>
                </div>
              </div>

              {/* Bottom Action Slot — Consistent across every slide */}
              <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between gap-4">
                {currentData.left_panel.link ? (
                  <a
                    href={currentData.left_panel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-[#5E35B1] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-md hover:shadow-purple-200"
                  >
                    {currentData.left_panel.button_text}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-zinc-600 bg-zinc-100 border border-zinc-200/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5E35B1]" />
                    {currentData.left_panel.status_label ?? "Verified Milestone"}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Right Panel — Uniform visual stage */}
            <motion.div
              initial={{ x: 30, scale: 0.96, opacity: 0 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
              className="relative h-[290px] sm:h-[340px] md:h-full w-full p-4 md:p-6 order-1 md:order-2"
            >
              <div className="w-full h-full rounded-[24px] bg-zinc-50 border border-zinc-100 relative flex items-center justify-center overflow-hidden">
                {currentData.type === "swiper" ? (
                  <div className="w-full h-full p-2 sm:p-4 flex items-center justify-center">
                    <SymposymCardSwiper standalone={false} />
                  </div>
                ) : (
                  <div className="w-full h-full p-4 md:p-6">
                    <img
                      src={currentData.right_panel?.visual_asset}
                      alt={currentData.left_panel.header}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      className="w-full h-full object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls & Progress Trackers */}
      <div className="flex items-center gap-5 mt-8">
        <button
          type="button"
          onClick={() => goTo(currentIndex - 1)}
          aria-label="Previous achievement"
          className="w-9 h-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-white hover:bg-[#5E35B1] hover:border-[#5E35B1] transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-2.5 items-center">
          {achievementsCarouselData.map((item, idx) => (
            <button
              key={item.project_id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 transition-all duration-500 rounded-full ${idx === currentIndex ? "w-8 bg-[#5E35B1]" : "w-2 bg-zinc-300 hover:bg-zinc-400"}`}
              aria-label={`Jump to ${item.left_panel.header}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(currentIndex + 1)}
          aria-label="Next achievement"
          className="w-9 h-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:text-white hover:bg-[#5E35B1] hover:border-[#5E35B1] transition-colors shadow-xs"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
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
        <div className="text-center mb-12">
          <h2 className="text-[10px] md:text-xs uppercase tracking-widest text-[#5E35B1] font-mono mb-4 font-bold">THE STATS</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-zinc-900 tracking-tight">Milestones & Achievements</h3>
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
