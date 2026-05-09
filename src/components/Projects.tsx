import { useState, useRef } from 'react';
import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { showcaseData } from '../data';
import './Projects.css';

interface ProjectCardProps {
  project: {
    id: string;
    leftPanel: {
      header: string;
      body: string;
      buttonText: string;
    };
    rightPanel: {
      visualAsset: string;
      cardStyle: string;
    };
    liveUrl: string;
    repoUrl: string;
  };
  isDark: boolean;
  className?: string;
}

const ProjectCard = ({ project, isDark, className = "" }: ProjectCardProps) => {
  return (
    <div className={`morph-card ${isDark ? 'dark' : ''} ${className}`}>
      <img src={project.rightPanel.visualAsset} alt={project.leftPanel.header} />
      <div className="title-overlay">
        <h2>{project.leftPanel.header}</h2>
      </div>
      <section>
        <h2 className="hover-title text-xl font-bold">{project.leftPanel.header}</h2>
        <p className="text-sm md:text-base leading-relaxed">{project.leftPanel.body}</p>
        <div className="card-actions">
          <a href={project.liveUrl} className="action-btn" target="_blank" rel="noreferrer">
            <ExternalLink size={18} /> Live
          </a>
          <a href={project.repoUrl} className="action-btn" target="_blank" rel="noreferrer">
            <Github size={18} /> Repo
          </a>
        </div>
      </section>
    </div>
  );
};

export const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const showMore = () => setVisibleCount(showcaseData.length);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress || 0);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-zinc-50 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-12">

          <h2 className="text-3xl md:text-5xl font-display font-bold text-zinc-900 mb-3 tracking-tight">
            Interactive Projects
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Showcasing dynamic UI interactions and morphing components.
          </p>
        </div>

        <div className="relative group">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="projectsSection no-scrollbar"
          >
            {showcaseData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isDark={index % 2 !== 0}
                className={index >= visibleCount ? "md:hidden" : ""}
              />
            ))}
          </div>

          {/* Mobile Navigation & Progress */}
          <div className="md:hidden flex items-center justify-between mt-8 px-2">
             <div className="flex-1 h-1 bg-zinc-200 rounded-full overflow-hidden mr-4">
                <div 
                  className="h-full bg-zinc-900 transition-all duration-300"
                  style={{ width: `${Math.max(5, scrollProgress)}%` }}
                />
             </div>
             <div className="flex gap-2">
                <button 
                  onClick={() => scroll('left')}
                  className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 shadow-sm active:scale-90 transition-transform"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white shadow-md active:scale-90 transition-transform"
                >
                  <ChevronRight size={20} />
                </button>
             </div>
          </div>
        </div>

        {visibleCount < showcaseData.length ? (
          <div className="hidden md:block mt-10 md:mt-16 text-center">
            <button
              onClick={showMore}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-zinc-900 bg-white border border-zinc-200 rounded-full shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition-colors duration-200 gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
            >
              View More
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="hidden md:block mt-10 md:mt-16 text-center">
            <button
              onClick={() => setVisibleCount(3)}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-zinc-900 bg-white border border-zinc-200 rounded-full shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition-colors duration-200 gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
            >
              View Less
              <ArrowRight size={18} className="rotate-180" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
