import { useState } from 'react';
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';
import { showcaseData } from '../data';
import './Projects.css';

export const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = showcaseData[activeIndex];
  const goTo = (index: number) => setActiveIndex((index + showcaseData.length) % showcaseData.length);

  return (
    <section id="projects" className="projects-section py-24 md:py-32 bg-zinc-50 relative overflow-hidden">
      <div className="projects-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="projects-heading">
          <div>
            <p className="projects-eyebrow">Selected work</p>
            <h2>Projects</h2>
            <span className="projects-heading-rule" />
          </div>
          <div className="projects-controls">
            <span className="projects-count"><span>{String(activeIndex + 1).padStart(2, '0')}</span> / {String(showcaseData.length).padStart(2, '0')}</span>
            <button type="button" aria-label="Previous project" onClick={() => goTo(activeIndex - 1)}><ArrowLeft size={19} /></button>
            <button type="button" aria-label="Next project" onClick={() => goTo(activeIndex + 1)}><ArrowRight size={19} /></button>
          </div>
        </header>

        <article className="featured-project" key={project.id}>
          <div className="featured-project-visual">
            {project.rightPanel.visualAsset ? (
              <img src={project.rightPanel.visualAsset} alt={`${project.leftPanel.header} project preview`} />
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
    </section>
  );
};
