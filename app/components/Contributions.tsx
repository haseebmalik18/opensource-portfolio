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
    title: "Strengthen trigger-hash tests with a fully-serialized JSON guard and broader fixtures",
    prLink: "https://github.com/apache/airflow/pull/67018",
    prNumber: "PR #67018",
    problem: "The trigger-hash serialization tests in test_encoders.py only checked encode_trigger's direct output and exercised a narrow set of payload shapes, so regressions like double-wrapped encodings or mishandled datetime, timedelta, set/frozenset, str-Enum, and Path values could slip through (issue #66413).",
    solution: "Added an `_assert_fully_serialized` helper that runs `json.dumps` on the encode_trigger output and asserts nothing got double-wrapped, wired it into the existing parametrized tests so every fixture is checked, and broadened `_TRIGGER_PARAMS` to cover datetime, timedelta, nested dict/tuple, set/frozenset, falsy primitives, str-Enum, and Path.",
    impact: "Closed a gap in serialization test coverage for trigger encoding, catching double-wrapping regressions and ensuring a wider range of real-world payload types are validated end-to-end through JSON serialization.",
    technologies: ["Python", "Apache Airflow", "pytest", "Serialization", "Testing"],
    status: "merged",
  },
  {
    title: "Rework StackdriverTaskHandler for the structlog era",
    prLink: "https://github.com/apache/airflow/pull/65198",
    prNumber: "PR #65198",
    problem: "StackdriverTaskHandler had not been migrated to Airflow's new structlog-based remote logging pattern, leaving Google Cloud Stackdriver out of step with other backends like CloudWatch, GCS, S3, and HDFS that were already modernized in #48491.",
    solution: "Added a StackdriverRemoteLogIO class with structlog processors for real-time log streaming, along with upload() and read() methods that mirror the architecture used by the other migrated remote log backends.",
    impact: "Brought Stackdriver logging in line with Airflow's modernized structlog-based remote log architecture, enabling real-time log streaming and consistent behavior across cloud log backends.",
    technologies: ["Python", "Apache Airflow", "Google Cloud Stackdriver", "structlog", "Logging"],
    status: "merged",
  },
  {
    title: "Add dags next-execution command to airflowctl",
    prLink: "https://github.com/apache/airflow/pull/66188",
    prNumber: "PR #66188",
    problem: "airflowctl had no command to surface a DAG's upcoming scheduled run, forcing users to query the REST API directly or inspect the UI to find next execution times.",
    solution: "Added a new `airflowctl dags next-execution` command that fetches next_dagrun_logical_date, next_dagrun_data_interval_start, next_dagrun_data_interval_end, and next_dagrun_run_after from the existing GET /api/v2/dags/{dag_id} endpoint, and prints a clear message when no upcoming run is scheduled.",
    impact: "Gave airflowctl users a first-class CLI command to inspect a DAG's next scheduled execution, improving operability and bringing the CLI closer to feature parity with the UI and REST API.",
    technologies: ["Python", "Apache Airflow", "airflowctl", "CLI"],
    status: "merged",
  },
  {
    title: "Improve Playwright test patterns in connections e2e tests",
    prLink: "https://github.com/apache/airflow/pull/66058",
    prNumber: "PR #66058",
    problem: "connections.spec.ts and ConnectionsPage.ts used redundant waitForLoadState('domcontentloaded') calls and manual expect(url).toContain() assertions instead of Playwright's recommended web-first APIs.",
    solution: "Removed redundant waitForLoadState('domcontentloaded') in ConnectionsPage.ts and replaced manual expect(url).toContain() with web-first toHaveURL() in connections.spec.ts for auto-retry support.",
    impact: "Improved test resilience and readability in the connections e2e tests by adopting Playwright's recommended web-first assertions, reducing flakiness and improving maintainability.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
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
