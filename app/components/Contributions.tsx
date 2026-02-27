interface Contribution {
  title: string;
  prLink: string;
  prNumber: string;
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
  status: "merged" | "open" | "closed";
}

const contributions: Contribution[] = [
  {
    title: "Google Cloud Storage Export for Databricks",
    prLink: "https://github.com/apache/airflow/pull/60620",
    prNumber: "PR #60620",
    problem: "Airflow lacked native support to export Databricks results securely to GCS.",
    solution: "Integrated GCSHook with secure impersonation chains and custom connection routing to support file uploads.",
    impact: "Enabled enterprise users to automate cloud storage exports, improving pipeline reliability and reducing manual workflow errors.",
    technologies: ["Python", "Apache Airflow", "GCSHook", "Cloud", "ETL"],
    status: "merged",
  },
  {
    title: "Migrate Salesforce Connection UI Metadata to YAML",
    prLink: "https://github.com/apache/airflow/pull/62446",
    prNumber: "PR #62446",
    problem: "The Salesforce provider's connection UI metadata was hardcoded in Python, inconsistent with the project's move toward declarative YAML-based configuration.",
    solution: "Migrated conn-fields and ui-field-behaviour for the Salesforce connection to provider.yaml, aligning with the YAML-first configuration standard.",
    impact: "Improved maintainability and consistency of provider metadata, supporting Airflow's transition to a unified YAML-based provider configuration system.",
    technologies: ["Python", "Apache Airflow", "YAML", "Provider Configuration"],
    status: "merged",
  },
  {
    title: "Migrate Postgres Connection UI Metadata to YAML",
    prLink: "https://github.com/apache/airflow/pull/62445",
    prNumber: "PR #62445",
    problem: "The Postgres provider's connection UI metadata was hardcoded in Python, inconsistent with the project's move toward declarative YAML-based configuration.",
    solution: "Migrated ui-field-behaviour for the Postgres connection to provider.yaml, aligning with the YAML-first configuration standard.",
    impact: "Improved maintainability and consistency of provider metadata, supporting Airflow's transition to a unified YAML-based provider configuration system.",
    technologies: ["Python", "Apache Airflow", "YAML", "Provider Configuration"],
    status: "merged",
  },
  {
    title: "Migrate Mongo Connection UI Metadata to YAML",
    prLink: "https://github.com/apache/airflow/pull/62444",
    prNumber: "PR #62444",
    problem: "The Mongo provider's connection UI metadata was hardcoded in Python, inconsistent with the project's move toward declarative YAML-based configuration.",
    solution: "Migrated conn-fields and ui-field-behaviour for the Mongo connection to provider.yaml, aligning with the YAML-first configuration standard.",
    impact: "Improved maintainability and consistency of provider metadata, supporting Airflow's transition to a unified YAML-based provider configuration system.",
    technologies: ["Python", "Apache Airflow", "YAML", "Provider Configuration"],
    status: "merged",
  },

];

function StatusBadge({ status }: { status: Contribution["status"] }) {
  const colors = {
    merged: "bg-green-500/20 text-green-400 border-green-500/30",
    open: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    closed: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const labels = {
    merged: "Merged",
    open: "Open",
    closed: "Closed",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function Contributions() {
  return (
    <section id="contributions" className="section px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-indigo-400 font-medium text-sm uppercase tracking-wider">My Work</span>
          <h2 className="section-title gradient-text mt-2">Open Source Contributions</h2>
          <p className="section-subtitle mx-auto mt-4">
            Impactful contributions to major open source projects that help developers worldwide.
          </p>
        </div>


        <div className="grid gap-8">
          {contributions.map((contribution, index) => (
            <div
              key={index}
              className="glass-card p-8 group"
            >

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <StatusBadge status={contribution.status} />
                    <a
                      href={contribution.prLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors"
                    >
                      {contribution.prNumber} ↗
                    </a>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {contribution.title}
                  </h3>
                </div>
                <a
                  href={contribution.prLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm px-4 py-2 shrink-0"
                >
                  View PR
                </a>
              </div>


              <div className="grid md:grid-cols-3 gap-6">

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-300">Problem</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{contribution.problem}</p>
                </div>


                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-300">Solution</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{contribution.solution}</p>
                </div>


                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-300">Impact</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{contribution.impact}</p>
                </div>
              </div>


              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {contribution.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-8 text-center">
          <p className="text-gray-500">
            More contributions coming soon...
          </p>
        </div>
      </div>
    </section>
  );
}
