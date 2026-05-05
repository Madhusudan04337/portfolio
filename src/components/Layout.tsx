import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { MobileFAB } from "./MobileFAB";


export function Layout({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <div className="min-h-screen flex flex-col px-0.5 selection:bg-[#4A32A1]/20">
      {/* Mobile Header Strip */}
      <div className="md:hidden fixed top-0 left-0.5 right-0.5 h-1 bg-[#4A32A1]/80 z-50" />

      <motion.div 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none"

      >
        <nav className="pointer-events-auto w-[95%] max-w-5xl bg-white rounded-full shadow-xl shadow-zinc-200/50 border border-zinc-200/60 ring-1 ring-zinc-900/5">
          <div className="px-2 py-2 flex items-center justify-between w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between w-full"
            >
              {/* Logo Left - Separate */}
              <div className="w-12 h-12 flex items-center justify-center bg-zinc-900 text-white rounded-full font-display font-bold text-xl tracking-tight shadow-md ml-1 shrink-0">
                M.
              </div>

              {/* Nav Links + CTA Right - Grouped inside inner pill */}
              <div className="flex items-center gap-3 pr-1">
                <div className="hidden lg:flex items-center gap-1 bg-zinc-50/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-200/60">
                  <a href="#about" className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm rounded-full transition-all">About</a>
                  <a href="#skills" className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm rounded-full transition-all">Skills</a>
                  <a href="#projects" className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm rounded-full transition-all">Projects</a>
                  <a href="#certifications" className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm rounded-full transition-all">Certifications</a>
                  <a href="#achievements" className="px-4 py-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-white hover:shadow-sm rounded-full transition-all">Achievements</a>
                </div>
                <a href="#contact" className="px-7 py-3 bg-[#4A32A1] text-white rounded-full text-sm font-bold hover:bg-[#3D2887] transition-colors shadow-lg shadow-[#4A32A1]/30 whitespace-nowrap">
                  Let's talk
                </a>
              </div>
            </motion.div>
          </div>
        </nav>
      </motion.div>
      <main className="flex-1 mt-6 md:mt-28">{children}</main>
      <footer className="py-12 text-center text-zinc-500 font-mono text-sm border-t border-zinc-200 mt-24">
        <p>© {new Date().getFullYear()} Building for the future.</p>
      </footer>
      <MobileFAB />
    </div>

  );
}
