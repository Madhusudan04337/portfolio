"use client";

import React, { useState } from "react";

export default function AdminPage() {
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [experience, setExperience] = useState([]);

  const handleAddSkill = (skill) => {
    setSkills([...skills, skill]);
  };

  const handleAddCertification = (certification) => {
    setCertifications([...certifications, certification]);
  };

  const handleAddExperience = (exp) => {
    setExperience([...experience, exp]);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. Manage your content here.</p>

      <section>
        <h2>Skills</h2>
        <button onClick={() => handleAddSkill(prompt("Enter a new skill:"))}>
          Add Skill
        </button>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Certifications</h2>
        <button
          onClick={() =>
            handleAddCertification(prompt("Enter a new certification:"))
          }
        >
          Add Certification
        </button>
        <ul>
          {certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Experience</h2>
        <button onClick={() => handleAddExperience(prompt("Enter a new experience:"))}>
          Add Experience
        </button>
        <ul>
          {experience.map((exp, index) => (
            <li key={index}>{exp}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}