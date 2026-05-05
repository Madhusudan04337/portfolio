import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { heroData } from "../data";
import profileImg from "../assets/profile.jpeg";
import resumePdf from "../assets/Madhusudan_cv_7719.pdf";

const ease = [0.4, 0, 0.2, 1];

export function Hero() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, heroData.dataIncrementTarget, {
      duration: 1,
      delay: 1.2,
      ease: ease
    });
    return animation.stop;
  }, [count]);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-12 pb-12 px-6 bg-white overflow-hidden">
      {/* Background Graphic (Purple overlapping shapes) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden sm:block">
        <div className="absolute right-[-20%] md:right-[-10%] top-[10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] border-[80px] md:border-[120px] border-[#4A32A1]/5 rounded-full transform rotate-45" />
        <div className="absolute right-[-30%] md:right-[-20%] top-[40%] w-[500px] h-[500px] md:w-[600px] md:h-[600px] border-[80px] md:border-[100px] border-[#4A32A1]/10 rounded-[80px] transform -rotate-12" />
      </div>


      <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">

        {/* Left Side: Typography */}
        <div className="space-y-6 md:space-y-8 text-left max-w-xl mx-auto lg:mx-0 pt-8 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-zinc-900 leading-[1.15] mb-4">
              {heroData.title}
            </h1>
            <p className="text-[#5E35B1] font-mono text-sm md:text-base font-semibold uppercase tracking-wider mb-6">
              {heroData.role}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-lg"
          >
            {heroData.goal}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="pt-2 md:pt-4"
          >
            <a 
              href={resumePdf} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto bg-[#4A32A1] hover:bg-[#3D2887] text-white px-8 py-3.5 md:py-4 rounded-[8px] font-medium transition-colors shadow-lg shadow-purple-900/20 text-center text-base"
            >
              View Resume
            </a>
          </motion.div>
        </div>

        {/* Right Side: Portrait & Floating Cards */}
        <div className="relative flex justify-center mt-8 lg:mt-0 lg:justify-end w-full mx-auto max-w-[280px] xs:max-w-[320px] md:max-w-[360px] lg:max-w-[420px]">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            className="relative w-full aspect-square bg-[#7CE1D4] rounded-3xl md:rounded-[40px] overflow-hidden shadow-xl"
          >
            {/* Inner teal graphic squares */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#56C6BC]" />

            {/* Character Image */}
            <img
              src={profileImg}
              alt="Portrait"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-auto max-h-[90%] object-cover object-bottom mix-blend-multiply drop-shadow-xl"
              style={{ filter: "brightness(1.05) contrast(1.05)" }}
            />
          </motion.div>

          {/* Floating UI Badges */}

          {/* Top Left Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="absolute top-4 -left-4 sm:-left-16 md:top-12 md:-left-24 bg-white rounded-[12px] md:rounded-[20px] shadow-[0_12px_40px_rgb(0,0,0,0.08)] px-3 py-3 md:px-5 md:py-4 w-[130px] md:w-[240px] border border-zinc-100 z-20 flex flex-col items-start"
          >
            <div className="font-bold text-zinc-900 text-[12px] md:text-[18px] mb-1">{heroData.name}</div>
            <div className="text-[#5E35B1] font-semibold text-[9px] md:text-[13px] mb-2 md:mb-4 leading-tight">Python Specialist</div>

            <div className="w-full h-[1px] bg-zinc-100 mb-2 md:mb-3" />

            <div className="text-[8px] md:text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Current Tech Stack:</div>
            <div className="font-bold text-zinc-900 text-[10px] md:text-[14px] leading-tight">Django • FastAPI • React</div>
          </motion.div>

          {/* Floating Circle (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "backOut" }}
            className="absolute top-[40%] -right-8 md:-right-12 -translate-y-1/2 bg-white rounded-full p-2.5 shadow-[0_12px_40px_rgb(0,0,0,0.08)] z-20 border border-zinc-100"
          >
            {/* Fake Donut Chart */}
            <div className="relative w-[50px] h-[50px] rounded-full border-[5px] border-orange-50">
              <div className="absolute inset-0 rounded-full border-[5px] border-[#F16E00] border-t-transparent border-r-transparent transform -rotate-[60deg]" />
            </div>
          </motion.div>

          {/* Bottom Right Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="absolute bottom-10 -right-4 sm:-right-8 md:bottom-12 md:-right-16 bg-white rounded-full shadow-[0_12px_40px_rgb(0,0,0,0.08)] pl-5 pr-2 py-2 flex items-center justify-between gap-5 z-20 border border-zinc-100"
          >
            <span className="font-medium text-zinc-800 text-[14px]">{heroData.credentialsLabel || "Credentials Earned"}</span>
            <div className="bg-[#F16E00] text-white text-[12px] font-bold w-9 h-9 rounded-full flex items-center justify-center shrink-0">
              {heroData.credentialsCount || 0}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
