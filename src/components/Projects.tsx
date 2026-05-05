import { useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
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
}

const ProjectCard = ({ project, isDark }: ProjectCardProps) => {
  return (
    <div className={`morph-card ${isDark ? 'dark' : ''}`}>
      <img src={project.rightPanel.visualAsset} alt={project.leftPanel.header} />
      <div className="title-overlay">
        <h2>{project.leftPanel.header}</h2>
      </div>
      <section>
        <h2 className="hover-title">{project.leftPanel.header}</h2>
        <p>{project.leftPanel.body}</p>
        <div className="card-actions">
          <a href={project.liveUrl} className="action-btn" target="_blank" rel="noreferrer">
            <ExternalLink size={16} /> Live
          </a>
          <a href={project.repoUrl} className="action-btn" target="_blank" rel="noreferrer">
            <Github size={16} /> Repo
          </a>
        </div>
      </section>
    </div>
  );
};

export const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const showMore = () => setVisibleCount(showcaseData.length);

  return (
    <section id="projects" className="py-12 md:py-20 bg-zinc-50 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">

          <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-4 tracking-tight">
            Interactive Projects
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Showcasing dynamic UI interactions and morphing components.
          </p>
        </div>
        
        <div className="projectsSection">
          {showcaseData.slice(0, visibleCount).map((project, index) => (
             <ProjectCard 
               key={project.id} 
               project={project} 
               isDark={index % 2 !== 0} 
             />
          ))}
        </div>

        {visibleCount < showcaseData.length ? (
          <div className="mt-10 md:mt-16 text-center">
            <button 
              onClick={showMore}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-zinc-900 bg-white border border-zinc-200 rounded-full shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition-colors duration-200 gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
            >
              View More
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="mt-10 md:mt-16 text-center">
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
