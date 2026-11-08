# Initial release work item

Authorized by the user on 2026-11-08: build the externally hosted CTS resource website quickly.

Deliverable: a working responsive resource hub with the existing 40 databases, verified LSU IRB/REDCap resources, source-linked conference schedules, and the current downloadable registry document. No accounts, AI adviser, patient-data collection, custom calendar feed, or consultation submissions in this release.

Permitted files: dist/index.html, dist/styles.css, dist/app-data.js, dist/core.js, dist/app.js, dist/assets/Pulmonary_and_Critical_Care_Research_Databases.docx, data/database-inventory.json, build-data.js, build-preview.cjs, verify.cjs, README.md, docs/*, .openai/hosting.json, .gitignore. Site helper may manage repository metadata. Release supplement: include a self-contained HTML preview and self-contained inventory/test inputs, because preview-server binding is blocked; this changes packaging only, not user features. No unrelated project edits.

Implementation reasoning: balanced development with highest scrutiny for externally visible institutional descriptions. Public facts link to their official sources; conference recurrence is not converted into invented dates.

Decisions: dependency-free static HTML/CSS/JavaScript minimizes setup, supports opening locally, and is sufficient for the initial directory. Reject server/database/authentication infrastructure for this release because no transactional features are needed. Use original LSU Health color and accessibility guidance; do not reuse LA CaTS branded content or official logos as a new identity.

Predeclared acceptance: Node syntax checks; verify.cjs tests record uniqueness, 40 database preservation, 17 topic preservation, valid route and search/filter behavior, required content/links and download path, external URL scheme safety, and no generated conference dates. Inspect browser layout if supported. Package only verified source/build output. Record publication failure accurately rather than claim a live deployment.

Environment: active working directory is temporary local task space outside iCloud because access to /Users/dwelsh/Developer/OpenAI and canonical writes is not granted in this task. The intended canonical documentation home remains /Users/dwelsh/Projects/Coding/Websites/lsu-health-cts-research-hub. Sites remote identity is persisted in .openai/hosting.json. Initial source helper opening failed because git.chatgpt-team.site could not be resolved; no push or deployment was completed at that point.
