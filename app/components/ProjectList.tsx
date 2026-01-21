interface Project {
  title: string;
  description: string;
  prLink?: string;
  prNumber?: string;
  repoLink?: string;
  status: "merged" | "open" | "completed";
  technologies: string[];
  impact?: string;
}


const projects: Project[] = [
  {
    title: "Google Cloud Storage Export for Databricks",
    description: "Integrated GCSHook with secure impersonation chains and custom connection routing to support file uploads from Databricks to GCS.",
    prLink: "https://github.com/apache/airflow/pull/60620",
    prNumber: "#60620",
    status: "merged",
    technologies: ["Python", "Apache Airflow", "GCSHook", "Cloud", "ETL"],
    impact: "Enabled enterprise users to automate cloud storage exports, improving pipeline reliability.",
  },

];

export default function ProjectList() {
  return (
    <section className="fade-up fade-up-delay-1">

      <div className="section-header">
        <div className="icon">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2>Projects & Contributions</h2>
      </div>


      <div className="space-y-5">
        {projects.length === 0 ? (
          <p className="text-zinc-600 text-center py-16">No projects added yet.</p>
        ) : (
          projects.map((project, index) => (
            <article 
              key={index} 
              className="project-card"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >

              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex flex-wrap items-center gap-3">

                  <span className={`badge ${project.status === "merged" ? "badge-merged" : "badge-open"}`}>
                    {project.status === "merged" && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {project.status === "merged" ? "Merged" : "Open"}
                  </span>
                  

                  {project.prNumber && (
                    <a 
                      href={project.prLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pr-link"
                    >
                      PR {project.prNumber} ↗
                    </a>
                  )}
                </div>
              </div>
              

              <h3 className="mb-3">
                {project.prLink ? (
                  <a 
                    href={project.prLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-title"
                  >
                    {project.title}
                  </a>
                ) : (
                  <span className="project-title">{project.title}</span>
                )}
              </h3>
              

              <p className="description mb-4">
                {project.description}
              </p>
              

              {project.impact && (
                <p className="impact mb-4">
                  {project.impact}
                </p>
              )}
              

              <div className="tech-tags">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
