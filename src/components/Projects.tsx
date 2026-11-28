import { useEffect, useState } from 'react';
import { ExternalLink, Github, ArrowLeft, ArrowRight, ArrowUpRight, Layers } from 'lucide-react';
import { showcaseData, type ProjectItem } from '../data';
import './Projects.css';

interface ProjectsProps {
  onSelectProject?: (slug: string) => void;
}

function MobileProjectShortCard({
  project,
  onSelect,
}: {
  project: ProjectItem;
  onSelect: (slug: string) => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <a
      href={`/projects/${project.slug}`}
      onClick={(e) => {
        e.preventDefault();
        onSelect(project.slug);
      }}
      className="mobile-project-card"
    >
      <div className="mobile-project-card-media">
        {project.rightPanel.visualAsset && !imgFailed ? (
          <img
            src={project.rightPanel.visualAsset}
            alt={`${project.leftPanel.header} preview`}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-zinc-100 text-zinc-500">
            <Layers className="w-7 h-7 text-[#4A32A1] mb-2" />
            <span className="text-xs font-semibold text-zinc-700">{project.leftPanel.header}</span>
          </div>
        )}
      </div>
      <div className="mobile-project-card-body">
        <h3 className="mobile-project-card-title">{project.leftPanel.header}</h3>
        <p className="mobile-project-card-desc">{project.leftPanel.body}</p>
        <div className="mobile-project-card-footer">
          <span>View project</span>
          <ArrowUpRight className="w-4 h-4 shrink-0" />
        </div>
      </div>
    </a>
  );
}

export const Projects = ({ onSelectProject }: ProjectsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = showcaseData[activeIndex];
  const goTo = (index: number) => setActiveIndex((index + showcaseData.length) % showcaseData.length);

  useEffect(() => {
    const nextIdx = (activeIndex + 1) % showcaseData.length;
    const prevIdx = (activeIndex - 1 + showcaseData.length) % showcaseData.length;
    [showcaseData[nextIdx]?.rightPanel.visualAsset, showcaseData[prevIdx]?.rightPanel.visualAsset].forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, [activeIndex]);

  const handleMobileSelect = (slug: string) => {
    if (onSelectProject) {
      onSelectProject(slug);
      return;
    }
    window.history.pushState({}, '', `/projects/${slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="projects" className="projects-section py-24 md:py-32 bg-zinc-50 relative overflow-hidden">
      <div className="projects-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="projects-heading">
          <div>
            <p className="projects-eyebrow">Selected work</p>
            <h2>Projects</h2>
            <span className="projects-heading-rule" />
          </div>
          <div className="projects-controls hidden md:flex">
            <span className="projects-count"><span>{String(activeIndex + 1).padStart(2, '0')}</span> / {String(showcaseData.length).padStart(2, '0')}</span>
            <button type="button" aria-label="Previous project" onClick={() => goTo(activeIndex - 1)}><ArrowLeft size={19} /></button>
            <button type="button" aria-label="Next project" onClick={() => goTo(activeIndex + 1)}><ArrowRight size={19} /></button>
          </div>
        </header>

        {/* Mobile Only: Short Project Cards linking to dedicated project page */}
        <div className="md:hidden mobile-projects-list">
          {showcaseData.map((item) => (
            <MobileProjectShortCard
              key={item.id}
              project={item}
              onSelect={handleMobileSelect}
            />
          ))}
        </div>

        {/* Desktop: Original Featured Project Carousel */}
        <div className="hidden md:block">
          <article className="featured-project" key={project.id}>
            <div className="featured-project-visual">
              {project.rightPanel.visualAsset ? (
                <img
                  src={project.rightPanel.visualAsset}
                  alt={`${project.leftPanel.header} project preview`}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              ) : (
                <div className={`project-preview ${project.rightPanel.cardStyle}`}>
                  <span className="project-preview-chip">Figma prototype</span>
                  <div><h3>{project.leftPanel.header}</h3><p>{project.rightPanel.previewText ?? project.leftPanel.body}</p></div>
                </div>
              )}
            </div>
            <div className="featured-project-content">
              <h3>{project.leftPanel.header}</h3>
              {project.leftPanel.role && <p className="project-role">{project.leftPanel.role}</p>}
              <p className="featured-project-description">{project.leftPanel.body}</p>
              <p className="project-detail-label">Highlights</p>
              <ul className="project-details">
                {(project.features ?? [project.leftPanel.body]).map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              {project.technologies?.length ? (
                <div className="project-technology-group">
                  <p className="project-detail-label">Technologies</p>
                  <ul className="project-tags" aria-label="Technologies">
                    {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                </div>
              ) : null}
              <div className="featured-project-actions">
                {project.repoUrl && <a className="project-action project-action-secondary" href={project.repoUrl} target="_blank" rel="noreferrer"><Github size={17} /> View source</a>}
                <a className="project-action project-action-primary" href={project.liveUrl} target="_blank" rel="noreferrer"><ExternalLink size={17} /> {project.leftPanel.buttonText}</a>
              </div>
            </div>
          </article>

          <nav className="projects-pagination" aria-label="Choose a project">
            {showcaseData.map((item, index) => (
              <button key={item.id} type="button" aria-label={`Show ${item.leftPanel.header}`} aria-current={activeIndex === index ? 'true' : undefined} onClick={() => goTo(index)} className={activeIndex === index ? 'active' : ''} />
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};
