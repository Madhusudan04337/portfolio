import { motion, AnimatePresence } from "motion/react";
import { Home, User, Briefcase, Layers, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: Layers },
  { label: "Contact", href: "#contact", icon: MessageSquare },
];

export function BottomNav() {
  const [activeTab, setActiveTab] = useState("#hero");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update active tab based on section scroll position
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveTab(`#${section}`);
            break;
          }
        }
      }

      // Hide/Show logic on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] md:hidden w-[90%] max-w-md"
        >
          <nav className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-2 py-2 flex items-center justify-around ring-1 ring-black/5">
            {navItems.map((item) => {
              const isActive = activeTab === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveTab(item.href)}
                  className="relative p-3 group"
                >
                  <item.icon
                    size={22}
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-600"
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#4A32A1] rounded-full shadow-lg shadow-[#4A32A1]/20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
