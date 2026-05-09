import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./Experience.css";
import { experienceData } from "../data";
import { ExternalLink, ChevronDown } from "lucide-react";

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(experienceData[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="exp-section py-24 md:py-32 px-6" id="experience">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#4A32A1] font-mono mb-3 font-bold">
            CAREER PATH
          </h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-zinc-900 tracking-tight">
            Professional Experience
          </h3>
        </div>

        <div className="timeline-container">
          {experienceData.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            
            return (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-dot" />
                <motion.div 
                  className="timeline-content"
                  onClick={() => toggleExpand(exp.id)}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] md:text-xs font-mono text-[#4A32A1] font-bold tracking-widest uppercase">{exp.period}</span>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-lg md:text-xl font-display font-bold text-zinc-900 leading-tight">{exp.role}</h4>
                      <ChevronDown 
                        size={18} 
                        className={`text-zinc-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-base font-semibold text-zinc-600">{exp.company}</span>
                      {exp.certificateLink && (
                        <a
                          href={exp.certificateLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 hover:bg-zinc-100 rounded-full transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#4A32A1]" />
                        </a>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-zinc-100">
                          <ul className="flex flex-col gap-3">
                            {exp.bullets.map((bullet, i) => (
                              <li key={i} className="text-sm text-zinc-600 leading-relaxed flex items-start gap-3">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4A32A1]/30 shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
