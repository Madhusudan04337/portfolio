import "./Experience.css";
import { experienceData } from "../data";
import { ExternalLink } from "lucide-react";

export function Experience() {
  return (
    <section className="exp-section py-32 px-6 bg-[#FAFAFA]" id="experience">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 relative z-10">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#4A32A1] font-mono mb-4 font-semibold">
            CAREER PATH
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 tracking-tight">
            Professional Experience
          </h3>
        </div>

        <div className="exp-card__container">
          {experienceData.map((exp, idx) => (
            <div className="exp-card" key={exp.id} tabIndex={0}>
              <div className="flex flex-col gap-6 h-full relative z-10">
                 <div className="flex flex-col gap-1 relative">
                    <span className="text-xs font-mono text-zinc-400 tracking-wider uppercase mb-1">{exp.period}</span>
                    <h4 className="text-2xl font-display font-bold text-white leading-tight">{exp.role}</h4>
                    <span className="text-lg font-medium" style={{ color: exp.themeColor }}>{exp.company}</span>
                    {exp.certificateLink && (
                      <a 
                        href={exp.certificateLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute top-0 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        title="View Certificate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                 </div>
                 
                 <div className="h-[1px] w-full bg-white/10" />

                 <ul className="flex flex-col gap-5 mt-2">
                   {exp.bullets.map((bullet, i) => (
                     <li key={i} className="text-[14px] text-zinc-300 leading-relaxed flex items-start gap-4">
                       <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                       <span>{bullet}</span>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
