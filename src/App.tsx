/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <div id="achievements">
        <Achievements />
      </div>
      <Contact />
    </Layout>
  );
}

