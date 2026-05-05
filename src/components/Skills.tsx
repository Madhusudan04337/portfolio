import { motion } from "motion/react";
import { Code, Palette, Server, Database, Cloud, Sparkles } from "lucide-react";
import { skillsData } from "../data";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code className="w-5 h-5 text-teal-700" />,
  palette: <Palette className="w-5 h-5 text-teal-700" />,
  server: <Server className="w-5 h-5 text-teal-700" />,
  database: <Database className="w-5 h-5 text-teal-700" />,
  cloud: <Cloud className="w-5 h-5 text-teal-700" />
};

export function Skills() {
  return (
    <section className="py-6 md:py-12 px-4 bg-[#FAFAFA]" id="skills">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-[12px] font-medium mb-4 border border-teal-100/50"
          >
            <Sparkles className="w-4 h-4" />
            What I work with
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-zinc-900 tracking-tight"
          >
            Skills & Technologies
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[20px] p-4 md:p-6 flex flex-col items-start text-left border border-zinc-100/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all w-full sm:w-[calc(50%-12px)] lg:max-w-[280px]"
            >
              <div className="flex items-center gap-3 mb-4 w-full">
                <div className="w-10 h-10 bg-teal-50/80 rounded-xl flex items-center justify-center shrink-0">
                  {iconMap[category.icon]}
                </div>
                <h3 className="font-display font-semibold text-base text-zinc-900 leading-tight">{category.category}</h3>
              </div>

              <div className="flex flex-wrap justify-start gap-1.5 w-full">
                {category.skills.map(skill => (
                  <span key={skill} className="bg-zinc-50 text-zinc-600 text-[13px] font-medium px-3.5 py-1.5 rounded-full border border-zinc-100/80 tracking-tight">
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
