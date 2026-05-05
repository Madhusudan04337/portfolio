import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  X, 
  User, 
  Code, 
  Layers, 
  Award, 
  Trophy, 
  MessageSquare 
} from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code },
  { label: "Projects", href: "#projects", icon: Layers },
  { label: "Certifications", href: "#certifications", icon: Award },
  { label: "Achievements", href: "#achievements", icon: Trophy },
  { label: "Let's talk", href: "#contact", icon: MessageSquare },
];

export function MobileFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className="fixed bottom-[20px] right-[20px] z-[9999] md:hidden flex flex-col items-end" 
      ref={containerRef}
    >
      {/* Backdrop for better focus when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-zinc-900/20 backdrop-blur-[2px] z-[-1]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-end gap-4 mb-4"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={handleItemClick}
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0,
                  transition: { 
                    delay: (menuItems.length - 1 - index) * 0.05,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  } 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  x: 20,
                  transition: { delay: index * 0.03 } 
                }}
                className="flex items-center gap-3 group"
                aria-label={`Go to ${item.label}`}
              >
                <span className="bg-white px-3 py-1.5 rounded-lg text-sm font-bold text-zinc-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-zinc-100 transition-transform group-active:scale-95">
                  {item.label}
                </span>
                <div className="w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-zinc-100 text-[#1a73e8] group-active:scale-90 transition-transform shrink-0">
                  <item.icon size={22} strokeWidth={2.5} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMenu}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="w-14 h-14 bg-[#1a73e8] text-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-90 transition-transform"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "open" : "closed"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X size={28} strokeWidth={3} /> : <Plus size={32} strokeWidth={2.5} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
