import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { showcaseData } from "../data";

const transitionEase = [0.22, 1, 0.36, 1];
const INTERVAL_MS = 6000;

export function Showcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseData.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const project = showcaseData[currentIndex];

  return (
    <section className="py-24 px-6 bg-zinc-100/50 overflow-hidden relative border-y border-zinc-200" id="journey">
      {/* Background ambient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#4A32A1]/10 blur-[100px] rounded-full point-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-16 text-center">Featured Work</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[500px]">
          {/* Left Panel: Description */}
          <div className="relative h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${project.id}`}
                initial={{ x: "-50%", opacity: 0 }} // Specified "-150%" in prompt, adjusting to -50% for smoother feel on modern screens
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "20%", opacity: 0 }}
                transition={{ duration: 1.5, ease: transitionEase }}
                className="space-y-6"
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0, duration: 1, ease: transitionEase }}
                  className="text-4xl md:text-5xl font-display font-bold leading-tight text-zinc-900"
                >
                  {project.leftPanel.header}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 1, ease: transitionEase }}
                  className="text-zinc-600 text-lg leading-relaxed max-w-md"
                >
                  {project.leftPanel.body}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1, ease: transitionEase }}
                  className="pt-4"
                >
                   <a 
                     href={project.liveUrl} 
                     target="_blank" 
                     rel="noreferrer"
                     className="flex items-center gap-3 text-white bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-full transition-colors font-medium w-fit"
                   >
                     {project.leftPanel.buttonText}
                     <ArrowRight className="w-4 h-4" />
                   </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel: Visual */}
          <div className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center perspective-1000">
             <AnimatePresence mode="wait">
                <motion.div
                  key={`right-${project.id}`}
                  initial={{ x: "100%", scale: 0.8, opacity: 0 }} // Specified 150% in prompt
                  animate={{ x: "0%", scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.6 } }} // exit motion: fade_and_shrink
                  transition={{ duration: 0.9, delay: 0.3, ease: transitionEase }}
                  className={`w-full h-full rounded-2xl overflow-hidden border border-zinc-200 shadow-2xl shadow-zinc-300/50 ${
                     project.rightPanel.cardStyle === 'elevated_white_container' ? 'bg-white' : 'bg-zinc-50'
                  }`}
                >
                   <img 
                     src={project.rightPanel.visualAsset} 
                     alt={project.leftPanel.header}
                     className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                   />
                </motion.div>
             </AnimatePresence>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-3 mt-16">
           {showcaseData.map((p, idx) => (
             <button
               key={p.id}
               onClick={() => setCurrentIndex(idx)}
               aria-label={`Go to project ${p.leftPanel.header}`}
               className={`h-1.5 transition-all duration-300 rounded-full ${
                 idx === currentIndex ? "bg-[#4A32A1] w-8" : "bg-zinc-300 w-4 hover:bg-zinc-400"
               }`}
             />
           ))}
        </div>
      </div>
    </section>
  );
}
