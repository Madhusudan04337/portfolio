import { motion } from "motion/react";
import { ArrowRight, Code2, Database, Layers } from "lucide-react";
import { aboutData } from "../data";

export function About() {
  return (
    <section id="about" className="py-12 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Entry: left_to_right */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // ease-out-slow
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            {aboutData.headline}
          </h2>
          <p className="text-zinc-600 text-lg leading-relaxed">
            {aboutData.bodyText}
          </p>
          
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="flex flex-col gap-2 p-4 rounded-xl border border-zinc-200 bg-white/50">
                <Code2 className="w-6 h-6 text-[#4A32A1] mb-2" />
                <h4 className="font-medium text-zinc-900">Current Focus</h4>
                <p className="text-sm text-zinc-500">{aboutData.context.focus}</p>
             </div>
             <div className="flex flex-col gap-2 p-4 rounded-xl border border-zinc-200 bg-white/50">
                <Database className="w-6 h-6 text-[#A8C69F] mb-2" />
                <h4 className="font-medium text-zinc-900">Core Expertise</h4>
                <p className="text-sm text-zinc-500">{aboutData.context.background}</p>
             </div>
             <div className="flex flex-col gap-2 p-4 rounded-xl border border-zinc-200 bg-white/50 sm:col-span-2">
                <Layers className="w-6 h-6 text-[#FFB800] mb-2" />
                <h4 className="font-medium text-zinc-900">Recent Milestone</h4>
                <p className="text-sm text-zinc-500">{aboutData.context.milestone}</p>
             </div>
          </div>

          <div>
             <a 
               href={aboutData.cta.href}
               className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#4A32A1]/30 text-[#4A32A1] hover:bg-[#4A32A1]/10 hover:border-[#4A32A1]/50 transition-all group"
             >
               {aboutData.cta.text}
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </a>
          </div>
        </motion.div>

        {/* Image Entry: right_to_left, mask_reveal */}
        <motion.div 
          initial={{ opacity: 0, x: 20, clipPath: "circle(0% at 50% 50%)" }}
          whileInView={{ opacity: 1, x: 0, clipPath: "circle(100% at 50% 50%)" }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} 
          className="relative px-8 lg:px-0"
        >
          {/* background_elements */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-dot-pattern opacity-50 z-0" style={{ color: "#A8C69F" }} />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full blur-3xl opacity-20 z-0" style={{ backgroundColor: "#FFB800" }} />
          
          <div className="relative aspect-square max-w-md mx-auto z-10 w-full overflow-hidden teardrop-mask border border-zinc-200 bg-white">
             <img 
               src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=1200" 
               alt="Technology Environment" 
               className="w-full h-full object-cover opacity-90"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-[#4A32A1]/10 to-transparent mix-blend-overlay" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
