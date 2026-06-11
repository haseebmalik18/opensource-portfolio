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
    title: "Fix setup/teardown auto-inclusion when clearing or marking tasks",
    prLink: "https://github.com/apache/airflow/pull/68193",
    prNumber: "68193",
    problem: "Two related setup/teardown bugs surfaced in the Clear and Mark-State dialogs (issue #68184): `DAG.clear(task_ids=[...])` did not include the selected task's setup and teardown tasks even though the docs say it should, and `find_task_relatives(downstream=True)` incorrectly pulled downstream teardowns into mark-state actions.",
    solution: "Fixed `DAG.clear` to auto-include the setup and teardown tasks attached to the selected task IDs, and updated `find_task_relatives` to skip teardown tasks when walking downstream so mark-state no longer sweeps them in. Added regression tests in test_cleartasks.py and test_mark_tasks.py covering both paths.",
    impact: "Clearing a task now correctly carries along its setup/teardown as documented, and marking task state no longer drags unrelated downstream teardowns into the operation — aligning both dialogs with their intended, documented behavior.",
    technologies: ["Python", "Apache Airflow", "pytest", "Testing"],
    status: "merged",
  },
  {
    title: "Strengthen trigger-hash tests with a fully-serialized JSON guard and broader fixtures",
    prLink: "https://github.com/apache/airflow/pull/67018",
    prNumber: "67018",
    problem: "The trigger-hash serialization tests in test_encoders.py only checked encode_trigger's direct output and exercised a narrow set of payload shapes, so regressions like double-wrapped encodings or mishandled datetime, timedelta, set/frozenset, str-Enum, and Path values could slip through (issue #66413).",
    solution: "Added an `_assert_fully_serialized` helper that runs `json.dumps` on the encode_trigger output and asserts nothing got double-wrapped, wired it into the existing parametrized tests so every fixture is checked, and broadened `_TRIGGER_PARAMS` to cover datetime, timedelta, nested dict/tuple, set/frozenset, falsy primitives, str-Enum, and Path.",
    impact: "Closed a gap in serialization test coverage for trigger encoding, catching double-wrapping regressions and ensuring a wider range of real-world payload types are validated end-to-end through JSON serialization.",
    technologies: ["Python", "Apache Airflow", "pytest", "Serialization", "Testing"],
    status: "merged",
  },
  {
    title: "Rework StackdriverTaskHandler for the structlog era",
    prLink: "https://github.com/apache/airflow/pull/65198",
    prNumber: "65198",
    problem: "StackdriverTaskHandler had not been migrated to Airflow's new structlog-based remote logging pattern, leaving Google Cloud Stackdriver out of step with other backends like CloudWatch, GCS, S3, and HDFS that were already modernized in #48491.",
    solution: "Added a StackdriverRemoteLogIO class with structlog processors for real-time log streaming, along with upload() and read() methods that mirror the architecture used by the other migrated remote log backends.",
    impact: "Brought Stackdriver logging in line with Airflow's modernized structlog-based remote log architecture, enabling real-time log streaming and consistent behavior across cloud log backends.",
    technologies: ["Python", "Apache Airflow", "Google Cloud Stackdriver", "structlog", "Logging"],
    status: "merged",
  },
  {
    title: "Add dags next-execution command to airflowctl",
    prLink: "https://github.com/apache/airflow/pull/66188",
    prNumber: "66188",
    problem: "airflowctl had no command to surface a DAG's upcoming scheduled run, forcing users to query the REST API directly or inspect the UI to find next execution times.",
    solution: "Added a new `airflowctl dags next-execution` command that fetches next_dagrun_logical_date, next_dagrun_data_interval_start, next_dagrun_data_interval_end, and next_dagrun_run_after from the existing GET /api/v2/dags/{dag_id} endpoint, and prints a clear message when no upcoming run is scheduled.",
    impact: "Gave airflowctl users a first-class CLI command to inspect a DAG's next scheduled execution, improving operability and bringing the CLI closer to feature parity with the UI and REST API.",
    technologies: ["Python", "Apache Airflow", "airflowctl", "CLI"],
    status: "merged",
  },
  {
    title: "Improve Playwright test patterns in connections e2e tests",
    prLink: "https://github.com/apache/airflow/pull/66058",
    prNumber: "66058",
    problem: "connections.spec.ts and ConnectionsPage.ts used redundant waitForLoadState('domcontentloaded') calls and manual expect(url).toContain() assertions instead of Playwright's recommended web-first APIs.",
    solution: "Removed redundant waitForLoadState('domcontentloaded') in ConnectionsPage.ts and replaced manual expect(url).toContain() with web-first toHaveURL() in connections.spec.ts for auto-retry support.",
    impact: "Improved test resilience and readability in the connections e2e tests by adopting Playwright's recommended web-first assertions, reducing flakiness and improving maintainability.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
  {
    title: "Improve Playwright test patterns in XComs page object",
    prLink: "https://github.com/apache/airflow/pull/65645",
    prNumber: "65645",
    problem: "XComsPage.ts relied on anti-pattern locators like page.locator('[data-testid=\"...\"]'), CSS role selectors, filter({ hasText }) on elements, and manual assertions instead of Playwright's recommended web-first APIs.",
    solution: "Replaced data-testid locators with getByTestId(), CSS role selectors with getByRole(), th filter({ hasText }) with getByRole('columnheader', { name }), locator('input') with getByRole('textbox'), manual count assertions with web-first assertions, textContent() checks with toHaveText(), and page.evaluate() DOM queries with locator-based .or() chains. Extracted a reusable tableRows locator to reduce repetition.",
    impact: "Improved test resilience and readability in the XComs page object by adopting Playwright's recommended semantic locators and web-first assertions, reducing flakiness and improving maintainability.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
  {
    title: "Update AwsAuthManager to support multi-team authorization",
    prLink: "https://github.com/apache/airflow/pull/65393",
    prNumber: "65393",
    problem: "The AWS Auth Manager (Amazon Verified Permissions integration) had no concept of teams, so authorization decisions could not be scoped per team. This blocked multi-team support in Airflow's AWS auth flow.",
    solution: "Added a Team entity to the AVP schema, introduced a team_name parameter throughout the authorization chain (facade, auth manager, and batch-filter methods), enriched AVP request contexts with team information, and implemented a new is_authorized_team method. Updated the Cedar schema to accept an optional team_name context attribute on all resource actions.",
    impact: "Enabled team-scoped authorization for connections, DAGs, pools, and variables in the AWS Auth Manager, allowing organizations to enforce fine-grained, per-team access control via Amazon Verified Permissions.",
    technologies: ["Python", "AWS", "Amazon Verified Permissions", "Apache Airflow", "Authorization"],
    status: "merged",
  },
  {
    title: "Fix Gantt view still visible when time range is outside dagrun window",
    prLink: "https://github.com/apache/airflow/pull/64179",
    prNumber: "64179",
    problem: "The Gantt view component did not respect time range filter properties that the Grid view already implemented, causing the Gantt visualization to remain visible when users selected a time range outside the dagrun window.",
    solution: "Passed existing time range filter props (runAfterGte and runAfterLte) to the Gantt component, ensuring it applies the same filtering logic as the Grid view and hides when the selected run falls outside the filtered results.",
    impact: "Ensured consistent filtering behavior between Grid and Gantt views, preventing confusing display of out-of-range data in the Gantt visualization.",
    technologies: ["TypeScript", "React", "Apache Airflow", "UI"],
    status: "merged",
  },
  {
    title: "Improve Playwright test patterns in pools.spec.ts",
    prLink: "https://github.com/apache/airflow/pull/64328",
    prNumber: "64328",
    problem: "pools.spec.ts relied on anti-patterns like networkidle waits, hardcoded CSS selectors, and waitForTimeout() calls, diverging from Playwright best practices.",
    solution: "Replaced waitForLoadState('networkidle') with UI-state assertions, eliminated waitForTimeout() in favor of web-first assertions, swapped CSS selectors for semantic getByLabel() locators, and changed page.locator('[data-testid]') to page.getByTestId().",
    impact: "Improved test resilience and readability by adopting Playwright's recommended web-first assertions and semantic locator strategies, reducing flakiness in the pools e2e test suite.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
  {
    title: "Fix getDuration not showing elapsed time for running tasks",
    prLink: "https://github.com/apache/airflow/pull/63619",
    prNumber: "63619",
    problem: "getDuration did not fall back to the current time when endDate was null, causing running tasks and DAG runs to display no elapsed duration instead of the time elapsed so far.",
    solution: "Restored getDuration to fall back to the current time when endDate is null, so running tasks and DAG runs correctly display their elapsed duration.",
    impact: "Fixed a UI bug where running tasks and DAG runs showed no duration, improving real-time visibility into in-progress execution times.",
    technologies: ["TypeScript", "Apache Airflow", "React", "UI"],
    status: "merged",
  },
  {
    title: "Improve Playwright test patterns in dag-grid-view.spec.ts",
    prLink: "https://github.com/apache/airflow/pull/63415",
    prNumber: "63415",
    problem: "dag-grid-view.spec.ts and GridPage.ts used page.evaluate(), CSS attribute selectors, manual role selectors, imperative count checks, and per-test setTimeout, diverging from Playwright best practices.",
    solution: "Replaced page.evaluate() with toHaveCSS() web-first assertion, CSS a[href*=\"/tasks/\"] selector with [data-node-id] data attribute, manual role selector with getByRole(\"tooltip\"), imperative count checks with not.toHaveCount(0), and moved per-test setTimeout to describe-level.",
    impact: "Improved test resilience and readability by adopting Playwright's recommended web-first assertions and locator strategies, reducing flakiness and simplifying test configuration.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
  {
    title: "Improve Playwright test patterns in dag-code-tab.spec.ts",
    prLink: "https://github.com/apache/airflow/pull/63416",
    prNumber: "63416",
    problem: "DagCodePage.ts used manual waitFor(), count assertions, textContent(), getAttribute(), and one-shot evaluate() patterns that diverged from Playwright best practices.",
    solution: "Replaced waitFor() with expect().toBeVisible() web-first assertions, manual count assertions with expect().not.toHaveCount(0), textContent() with expect().toHaveText(), getAttribute() with expect().toHaveAttribute(), and one-shot evaluate() with expect.poll() retrying assertions. Moved inline viewLines locator to a class property.",
    impact: "Improved test resilience and readability by adopting Playwright's recommended web-first assertion patterns, reducing flakiness and making e2e tests more maintainable.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
  {
    title: "Add start_from_trigger support for DataprocSubmitJobOperator",
    prLink: "https://github.com/apache/airflow/pull/62331",
    prNumber: "62331",
    problem: "DataprocSubmitJobOperator required a worker slot to submit and poll Dataproc jobs, wasting resources while waiting for long-running jobs to complete.",
    solution: "Added start_from_trigger support with a new DataprocSubmitJobDirectTrigger that handles both job submission and polling entirely on the triggerer side, bypassing the worker.",
    impact: "Freed up worker slots for compute-intensive tasks by offloading Dataproc job submission and monitoring to the lightweight triggerer, improving cluster resource utilization.",
    technologies: ["Python", "Apache Airflow", "Google Cloud Dataproc", "Async"],
    status: "merged",
  },
  {
    title: "Improve Playwright test patterns in BasePage.ts",
    prLink: "https://github.com/apache/airflow/pull/63079",
    prNumber: "63079",
    problem: "BasePage.ts used CSS :has-text() selectors for locating elements and had an unnecessary intermediate variable in isLoggedIn(), diverging from Playwright best practices.",
    solution: "Replaced CSS :has-text() selectors with getByRole() locators and removed the redundant currentUrl variable in isLoggedIn() for a cleaner implementation.",
    impact: "Improved test readability and resilience by adopting Playwright's recommended locator strategies, making e2e tests more maintainable and less brittle.",
    technologies: ["TypeScript", "Playwright", "Apache Airflow", "E2E Testing"],
    status: "merged",
  },
  {
    title: "Fix Flaky MySQL Test Failures with Retry Logic",
    prLink: "https://github.com/apache/airflow/pull/62823",
    prNumber: "62823",
    problem: "MySQL unit tests intermittently failed with 'Lost connection to server during query' errors during test database setup, which couldn't be caught by connection pool pre-ping checks alone.",
    solution: "Added a _retry_db decorator to wrap database cleanup utility functions, applying the existing run_with_db_retries utility to clear_db_* functions to automatically retry operations on transient DBAPIError exceptions.",
    impact: "Stabilized flaky MySQL test infrastructure by providing resilience against mid-query connection failures, reducing false test failures in CI pipelines.",
    technologies: ["Python", "Apache Airflow", "MySQL", "Testing"],
    status: "merged",
  },
  {
    title: "Fix Task Log Filters Not Working in Fullscreen Mode",
    prLink: "https://github.com/apache/airflow/pull/62747",
    prNumber: "62747",
    problem: "Log level, source, and settings dropdowns failed to render properly when the task logs view was displayed in fullscreen mode, preventing users from filtering log output.",
    solution: "Passed the isFullscreen prop to TaskLogHeader to activate z-index fixes when the fullscreen dialog opens, and added the missing zIndex to the source filter's Select.Content component.",
    impact: "Restored full filtering functionality in fullscreen task log views, ensuring functional parity between normal and fullscreen viewing modes.",
    technologies: ["TypeScript", "React", "Apache Airflow", "UI/UX"],
    status: "merged",
  },
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
