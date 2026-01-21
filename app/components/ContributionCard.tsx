'use client';

import { useState, useRef } from 'react';

export interface Contribution {
  title: string;
  prLink: string;
  prNumber: string;
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
  status: "merged" | "open";
}

export default function ContributionCard({ contribution, index }: { contribution: Contribution; index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="contribution-card group relative"
    >

      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.08), transparent 40%)`,
        }}
      />

      <div className="relative z-10">

        <div className="card-header">
          <span className={`status-badge ${contribution.status}`}>
            {contribution.status === "merged" ? "Merged" : "Open"}
          </span>
          <a
            href={contribution.prLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pr-link"
          >
            View PR #{contribution.prNumber}
            <svg className="w-3.5 h-3.5 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>


        <h3 className="card-title">
          <a href={contribution.prLink} target="_blank" rel="noopener noreferrer">
            {contribution.title}
          </a>
        </h3>


        <div className="card-content">
          <div className="content-row">
            <span className="label">Problem</span>
            <p>{contribution.problem}</p>
          </div>
          <div className="content-row">
            <span className="label">Solution</span>
            <p>{contribution.solution}</p>
          </div>
          <div className="content-row">
            <span className="label">Impact</span>
            <p>{contribution.impact}</p>
          </div>
        </div>


        <div className="card-footer">
          {contribution.technologies.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
