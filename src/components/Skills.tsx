import { motion } from "motion/react";
import { Code, Palette, Server, Database, Cloud, Sparkles } from "lucide-react";
import { skillsData } from "../data";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code className="w-4 h-4 text-teal-700" />,
  palette: <Palette className="w-4 h-4 text-teal-700" />,
  sparkles: <Sparkles className="w-4 h-4 text-teal-700" />,
  server: <Server className="w-4 h-4 text-teal-700" />,
  database: <Database className="w-4 h-4 text-teal-700" />,
  cloud: <Cloud className="w-4 h-4 text-teal-700" />
};

export function Skills() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white" id="skills">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#4A32A1]/5 text-[#4A32A1] px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-4 border border-[#4A32A1]/10"
          >
            <Sparkles className="w-4 h-4" />
            Tech Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold text-zinc-900 tracking-tight"
          >
            Core Competencies
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-zinc-50/50 rounded-2xl p-4 md:p-6 flex flex-col items-start border border-zinc-100/80 hover:border-[#4A32A1]/20 transition-all w-full"
            >
              <div className="flex items-center gap-3 mb-4 w-full">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-zinc-100">
                  {iconMap[category.icon]}
                </div>
                <h3 className="font-display font-bold text-base md:text-lg text-zinc-900">{category.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2 w-full">
                {category.skills.map(skill => (
                  <span key={skill} className="bg-white text-zinc-600 text-[11px] md:text-xs font-semibold px-3 py-1.5 rounded-lg border border-zinc-100 shadow-sm hover:border-[#4A32A1]/30 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
