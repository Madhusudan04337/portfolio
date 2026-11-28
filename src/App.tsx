/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ProjectDetail } from './components/ProjectDetail';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { getProjectBySlug } from './data';

function getSlugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/projects\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function App() {
  const [projectSlug, setProjectSlug] = useState<string | null>(() =>
    getSlugFromPath(window.location.pathname)
  );

  useEffect(() => {
    const onPopState = () => {
      setProjectSlug(getSlugFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateToProject = useCallback((slug: string) => {
    const nextUrl = `/projects/${encodeURIComponent(slug)}`;
    if (window.location.pathname !== nextUrl) {
      window.history.pushState({}, '', nextUrl);
    }
    setProjectSlug(slug);
  }, []);

  const navigateHome = useCallback((sectionId?: string) => {
    const isSubpage = getSlugFromPath(window.location.pathname) !== null;
    if (isSubpage) {
      window.history.pushState({}, '', sectionId ? `/#${sectionId}` : '/');
      setProjectSlug(null);
    }

    if (sectionId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else if (sectionId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, isSubpage ? 60 : 0);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const activeProject = projectSlug ? getProjectBySlug(projectSlug) : undefined;

  return (
    <Layout onNavigateHome={navigateHome}>
      {activeProject ? (
        <ProjectDetail
          project={activeProject}
          onBack={() => navigateHome('projects')}
          onSelectProject={navigateToProject}
        />
      ) : (
        <>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects onSelectProject={navigateToProject} />
          <Certifications />
          <div id="achievements">
            <Achievements />
          </div>
          <Contact />
        </>
      )}
    </Layout>
  );
}
