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


export const contributions: Contribution[] = [
  {
    title: "Fix tpl rendering for TLS hosts in ingress templates",
    prLink: "https://github.com/apache/airflow/pull/62548",
    prNumber: "62548",
    problem: "Go template expressions in TLS hosts within Airflow's Helm chart ingress templates were not being resolved, causing inconsistency between spec.rules[*].host and spec.tls[*].hosts.",
    solution: "Applied tpl rendering to TLS hosts across all ingress templates (api-server, flower, pgbouncer, statsd, webserver) and updated corresponding Helm tests to verify correct template resolution.",
    impact: "Ensured consistent Go template resolution across all ingress configurations, preventing deployment issues when using dynamic host values in TLS settings.",
    technologies: ["Helm", "Kubernetes", "Apache Airflow", "Go Templates", "Python"],
    status: "merged",
  },
  {
    title: "Clean up stale Python 3.9 workaround in airflow-ctl CLI config parser",
    prLink: "https://github.com/apache/airflow/pull/62206",
    prNumber: "62206",
    problem: "The airflow-ctl CLI config parser had a workaround for Python 3.9 that used string splitting to parse union return type annotations.",
    solution: "Replaced the stale workaround with a _union_members() helper that walks the AST directly using ast.BinOp nodes, leveraging modern Python union syntax.",
    impact: "Improved code maintainability by removing legacy compatibility hacks, making the CLI config parser cleaner and easier to extend.",
    technologies: ["Python", "Apache Airflow", "AST", "CLI"],
    status: "merged",
  },
  {
    title: "Google Cloud Storage Export for Databricks",
    prLink: "https://github.com/apache/airflow/pull/60543",
    prNumber: "60543",
    problem: "Airflow lacked native support to export Databricks results securely to GCS.",
    solution: "Integrated GCSHook with secure impersonation chains and custom connection routing to support file uploads.",
    impact: "Enabled enterprise users to automate cloud storage exports, improving pipeline reliability and reducing manual workflow errors.",
    technologies: ["Python", "Apache Airflow", "GCSHook", "Cloud", "ETL"],
    status: "merged",
  },
  {
    title: "Add E2E Test for XComs Page Display",
    prLink: "https://github.com/apache/airflow/pull/60620",
    prNumber: "60620",
    problem: "Apache Airflow lacked E2E test coverage for the XComs page, making it difficult to verify that XCom entries display correctly.",
    solution: "Added comprehensive E2E tests for the /xcoms page using Page Object Model pattern, including XComsPage.ts for page interactions and test cases to verify XCom entries render properly.",
    impact: "Improved test coverage and reliability for Airflow's UI, helping catch display issues before they reach production.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
  {
    title: "Add E2E Test for DAG Audit Log Functionality",
    prLink: "https://github.com/apache/airflow/issues/59684",
    prNumber: "59684",
    problem: "Apache Airflow lacked E2E test coverage for the DAG audit log functionality, making it difficult to verify that audit log entries display correctly and show relevant events.",
    solution: "Implemented comprehensive E2E tests using Playwright and Page Object Model pattern, including EventsPage.ts for page interactions and test cases to verify audit log display, pagination, sorting, and column visibility.",
    impact: "Improved test coverage for Airflow's audit log UI, helping ensure the audit trail is reliable and catches display issues before production.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
  {
    title: "Add E2E Test for DAG Grid View Display",
    prLink: "https://github.com/apache/airflow/pull/60856",
    prNumber: "60856",
    problem: "Apache Airflow lacked E2E test coverage for the DAG grid view functionality on the detail page, making it difficult to verify that the grid renders correctly with task instances.",
    solution: "Added comprehensive E2E tests using Playwright and Page Object Model pattern, including GridPage.ts for page interactions and test cases to verify grid rendering, task state colors, cell navigation, and tooltips.",
    impact: "Improved test coverage for Airflow's grid view UI, ensuring the component functions correctly across various scenarios and user interactions.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
  {
    title: "Add E2E Tests for DAG Runs Tab Functionality",
    prLink: "https://github.com/apache/airflow/pull/61234",
    prNumber: "61234",
    problem: "Apache Airflow lacked E2E test coverage for the DAG runs tab, making it difficult to verify that DAG runs display correctly with navigation, filtering, search, and pagination.",
    solution: "Implemented comprehensive E2E tests using Playwright and Page Object Model pattern, including DagRunsTabPage.ts for page interactions and test cases to verify DAG runs tab navigation, filtering, search, and pagination.",
    impact: "Improved test coverage for Airflow's DAG runs tab UI, ensuring reliable functionality across navigation, filtering, and pagination scenarios.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
  {
    title: "Add Partition Key Support to Execution API Trigger DAG Run Endpoint",
    prLink: "https://github.com/apache/airflow/pull/61301",
    prNumber: "61301",
    problem: "The execution API's trigger DAG run endpoint lacked partition key support, preventing the scheduler from routing triggered DAG runs to the correct partition when partition-based scheduling is enabled.",
    solution: "Added a partition_key field to the TriggerDAGRunPayload, implemented version migration for the payload class, and regenerated the frontend OpenAPI specification to support partition-based routing.",
    impact: "Enabled proper job distribution in partitioned scheduling scenarios, allowing enterprise users to leverage partition-based scheduling with triggered DAG runs.",
    technologies: ["Python", "Apache Airflow", "REST API", "Task SDK"],
    status: "merged",
  },
  {
    title: "Add E2E Tests for Pools Page Functionality",
    prLink: "https://github.com/apache/airflow/pull/62149",
    prNumber: "62149",
    problem: "Apache Airflow lacked E2E test coverage for the Pools page, making it difficult to verify that pool creation, editing, deletion, and display work correctly.",
    solution: "Implemented comprehensive E2E tests for the /pools page using Playwright and Page Object Model pattern, covering pools listing, creation, editing, deletion, and validation of pool functionality.",
    impact: "Improved test coverage for Airflow's Pools UI, ensuring reliable resource pool management and catching regressions before they reach production.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
  {
    title: "Migrate Salesforce Connection UI Metadata to YAML",
    prLink: "https://github.com/apache/airflow/pull/62446",
    prNumber: "62446",
    problem: "The Salesforce provider's connection UI metadata was hardcoded in Python, inconsistent with the project's move toward declarative YAML-based configuration.",
    solution: "Migrated conn-fields and ui-field-behaviour for the Salesforce connection to provider.yaml, aligning with the YAML-first configuration standard.",
    impact: "Improved maintainability and consistency of provider metadata, supporting Airflow's transition to a unified YAML-based provider configuration system.",
    technologies: ["Python", "Apache Airflow", "YAML", "Provider Configuration"],
    status: "merged",
  },
  {
    title: "Migrate Postgres Connection UI Metadata to YAML",
    prLink: "https://github.com/apache/airflow/pull/62445",
    prNumber: "62445",
    problem: "The Postgres provider's connection UI metadata was hardcoded in Python, inconsistent with the project's move toward declarative YAML-based configuration.",
    solution: "Migrated ui-field-behaviour for the Postgres connection to provider.yaml, aligning with the YAML-first configuration standard.",
    impact: "Improved maintainability and consistency of provider metadata, supporting Airflow's transition to a unified YAML-based provider configuration system.",
    technologies: ["Python", "Apache Airflow", "YAML", "Provider Configuration"],
    status: "merged",
  },
  {
    title: "Migrate Mongo Connection UI Metadata to YAML",
    prLink: "https://github.com/apache/airflow/pull/62444",
    prNumber: "62444",
    problem: "The Mongo provider's connection UI metadata was hardcoded in Python, inconsistent with the project's move toward declarative YAML-based configuration.",
    solution: "Migrated conn-fields and ui-field-behaviour for the Mongo connection to provider.yaml, aligning with the YAML-first configuration standard.",
    impact: "Improved maintainability and consistency of provider metadata, supporting Airflow's transition to a unified YAML-based provider configuration system.",
    technologies: ["Python", "Apache Airflow", "YAML", "Provider Configuration"],
    status: "merged",
  },
];

export default function ContributionList() {
  return (
    <section>

      <div className="section-header">
        <h2>Contributions</h2>
        <span className="count">{contributions.length}</span>
      </div>


      <div className="space-y-5">
        {contributions.map((contribution, index) => (
          <article key={index} className="contribution-card">

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
          </article>
        ))}
      </div>
    </section>
  );
}
