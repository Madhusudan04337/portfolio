import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ChevronDown, ChevronUp } from "lucide-react";
import { certificationsData } from "../data";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function Certifications() {
  const [showAll, setShowAll] = useState(false);
  
  const visibleCertifications = showAll 
    ? certificationsData 
    : certificationsData.slice(0, 3);

  return (
    <section id="certifications" className="py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 text-center">
           <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-zinc-800 tracking-tight">
             Certifications & Credentials
           </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        >
          <AnimatePresence mode="popLayout">
            {visibleCertifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                className="bg-white rounded-[20px] p-6 border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4 gap-4">
                   <h3 className="text-[17px] font-bold text-zinc-800 leading-snug max-w-[200px]">
                     {cert.title}
                   </h3>
                   <div className="flex flex-col items-end gap-2 shrink-0">
                     <div className="bg-[#2B5B57] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                       {cert.year}
                     </div>
                     <div className="bg-[#EDF2F1] text-[#2B5B57] text-[10px] font-semibold px-2.5 py-1 rounded">
                       {cert.level}
                     </div>
                   </div>
                </div>
                
                <div className="mb-6">
                   <p className="text-[15px] font-medium text-zinc-600">
                     {cert.issuer}
                   </p>
                </div>
                
                <div className="mt-auto pt-4">
                  <a 
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 border border-zinc-200 rounded-full flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors text-[13px] font-semibold text-zinc-700"
                  >
                    <Award className="w-4 h-4" /> View Credential
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {certificationsData.length > 3 && (
          <div className="mt-16 text-center">
            <motion.button
              layout
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-zinc-200 rounded-full text-zinc-800 font-bold hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm active:scale-95"
            >
              {showAll ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>View All Certifications <ChevronDown className="w-4 h-4" /></>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
