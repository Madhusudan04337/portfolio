import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ExternalLink, Github, Layers } from 'lucide-react';
import { showcaseData, type ProjectItem } from '../data';

interface ProjectDetailProps {
  project: ProjectItem;
  onBack: () => void;
  onSelectProject: (slug: string) => void;
}

export function ProjectDetail({ project, onBack, onSelectProject }: ProjectDetailProps) {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [project.slug]);

  const currentIndex = showcaseData.findIndex((p) => p.slug === project.slug);
  const prevProject = showcaseData[(currentIndex - 1 + showcaseData.length) % showcaseData.length];
  const nextProject = showcaseData[(currentIndex + 1) % showcaseData.length];

  return (
    <article className="py-10 md:py-16 bg-zinc-50 min-h-[75vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation */}
        <div className="mb-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 min-h-[44px] px-1 text-sm font-semibold text-zinc-600 hover:text-[#4A32A1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A32A1] rounded-lg cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Heading & Actions Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200/80">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 font-mono tabular-nums">
              <span>
                Project {String(currentIndex + 1).padStart(2, '0')} / {String(showcaseData.length).padStart(2, '0')}
              </span>
              {project.leftPanel.role && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-sans font-semibold text-[#4A32A1]">{project.leftPanel.role}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-zinc-900 tracking-tight text-balance leading-[1.1]">
              {project.leftPanel.header}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full border border-zinc-300 bg-white text-zinc-800 text-sm font-semibold hover:border-zinc-900 hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-4 h-4 shrink-0" />
                <span>View Source</span>
              </a>
            )}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#4A32A1] text-white text-sm font-semibold hover:bg-[#3D2887] transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              <span>{project.leftPanel.buttonText}</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </header>

        {/* Project Visual Showcase */}
        <div className="my-8 md:my-10 rounded-none sm:rounded-2xl border border-zinc-200/80 bg-zinc-100/70 p-0 sm:p-4 overflow-hidden">
          {project.rightPanel.visualAsset && !imgFailed ? (
            <img
              src={project.rightPanel.visualAsset}
              alt={`${project.leftPanel.header} showcase`}
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onError={() => setImgFailed(true)}
              className="block w-full h-auto sm:max-h-[620px] sm:object-contain mx-auto rounded-none sm:rounded-xl"
            />
          ) : (
            <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200/80 flex flex-col items-center justify-center p-8 text-center">
              <Layers className="w-10 h-10 text-[#4A32A1] mb-3" />
              <p className="font-display font-bold text-xl text-zinc-900">{project.leftPanel.header}</p>
              {project.rightPanel.previewText && (
                <p className="text-sm text-zinc-500 mt-1">{project.rightPanel.previewText}</p>
              )}
            </div>
          )}
        </div>

        {/* Description & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-2">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
                Description
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed">
                {project.leftPanel.body}
              </p>
            </div>

            {project.technologies?.length > 0 && (
              <div className="pt-6 border-t border-zinc-200/80">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2.5">
                  Technologies
                </h2>
                <p className="text-sm sm:text-base font-medium text-zinc-800">
                  {project.technologies.map((tech, idx) => (
                    <span key={tech}>
                      {tech}
                      {idx < project.technologies.length - 1 && (
                        <span className="mx-2.5 text-zinc-300" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              Highlights
            </h2>
            <ul className="divide-y divide-zinc-200/80 border-y border-zinc-200/80">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 py-3.5 text-sm sm:text-base text-zinc-800 leading-relaxed">
                  <Check className="w-4 h-4 text-[#4A32A1] shrink-0 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Prev / Next Project Navigation */}
        <nav
          aria-label="Adjacent projects"
          className="mt-14 pt-8 border-t border-zinc-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <a
            href={`/projects/${prevProject.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectProject(prevProject.slug);
            }}
            className="group flex items-center justify-between gap-4 p-4 rounded-2xl border border-zinc-200/80 bg-white hover:border-[#4A32A1]/40 transition-colors min-h-[64px]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-[#4A32A1] group-hover:-translate-x-0.5 transition-all shrink-0" />
              <div className="min-w-0">
                <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Previous
                </span>
                <span className="block font-display font-bold text-sm sm:text-base text-zinc-900 truncate group-hover:text-[#4A32A1] transition-colors">
                  {prevProject.leftPanel.header}
                </span>
              </div>
            </div>
          </a>

          <a
            href={`/projects/${nextProject.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectProject(nextProject.slug);
            }}
            className="group flex items-center justify-between gap-4 p-4 rounded-2xl border border-zinc-200/80 bg-white hover:border-[#4A32A1]/40 transition-colors min-h-[64px] sm:text-right"
          >
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full min-w-0">
              <div className="min-w-0">
                <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Next
                </span>
                <span className="block font-display font-bold text-sm sm:text-base text-zinc-900 truncate group-hover:text-[#4A32A1] transition-colors">
                  {nextProject.leftPanel.header}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#4A32A1] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </a>
        </nav>
      </div>
    </article>
  );
}
