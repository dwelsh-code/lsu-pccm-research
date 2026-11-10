# Project Examples Library

Purpose: show feasible, appropriately structured PCCM work with a valid conclusion. A positive or statistically significant result is not required. Published, presented, and completed-but-unpublished work must be labeled accurately.

The initial catalog is empty because no actual faculty project files have been supplied or approved for public display. Development worksheets are teaching aids, not completed projects or approved IRB protocols.

## Adding a Faculty-Approved Project

1. Obtain the author's permission to share the particular files publicly and check copyright/publisher restrictions. Remove participant information, private correspondence, signatures, tracking changes, comments, and confidential or unpublished details that are not approved for sharing.
2. Have a faculty reviewer confirm that the question, design, analysis and conclusion align. Explain feasibility with actual team effort, data access, timeline or other known constraints. Do not infer trainee contribution or outcomes.
3. Add the approved PDF or other files to `dist/assets/project-examples/`. Only public-approved files belong anywhere under dist: the build publishes that directory's selected assets.
4. Add an object to `data/project-examples.json` with the fields below. File paths must start with `assets/project-examples/`; external source links must use HTTPS. No arbitrary scripts or remote file uploads are supported.
5. Run `node build-data.js`, `node build-vercel.cjs` and the tests. Commit inputs, approved assets and generated `dist/app-data.js` together. Preview the entry before publication.

## Entry Fields

Required: `id`, `title`, `authors`, `studyType`, `question`, `design`, `feasibility`, `conclusion`, `limitations`, `status`, `approvedForPublicDisplay: true`, `facultyReviewed: true`, and `materials`.

- `authors`: public author credit as approved by the authors.
- `studyType`: Retrospective/Chart Review, Existing Dataset, Prospective/Observational, Interventional/Pilot, Evidence Synthesis, or another accurate type.
- `status`: Published, Presented, or Completed; publication status is not a promise of publishability.
- `materials`: one or more objects with `label`, `format` (Abstract, Poster, Specific Aims, IRB Protocol, or Manuscript), and `url`.
- Optional `year`, `citation`, `tags`.

Each entry can link its initial aims, protocol and final abstract/poster so learners can see the development chain. Clarify which protocol version and which portions are shared. An example's historical IRB decision does not establish the review category for a new project.

Never place pending/private draft records or files in this public repository. Keep prospective examples outside the repository until approved.
