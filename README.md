# LSU PCCM Research

Research resource website for LSU Health New Orleans Pulmonary and Critical Care Medicine faculty and fellows.

Intended website address: **lsupccmresearch.org**. Domain connection and live deployment are not yet complete.

## Backup contents

- **lsu-pccm-research-source.zip** — complete source tree with HTML, CSS, JavaScript, database inventory, checks, project notes, preview, and the database Word document.
- **lsu-pccm-research-history.bundle** — complete local Git history and branch for restoring a working Git repository.
- **CTS_Research_Hub_Preview.html** — self-contained working website preview; download and open in Safari or Chrome.
- **Pulmonary_and_Critical_Care_Research_Databases.docx** — the current research database directory.
- **BACKUP_MANIFEST.json** — source commit and SHA-256 checksums for verification.

Backup prepared November 8, 2026. The source commit is `ede30fcd6437ea1b47bc6b19bf07e8a878969c0c`.

## Current website

The first release includes 40 research databases in 17 topic groups, 13 LSU resource links, search and filtering, resource detail pages, and conference schedules. PCCM research conference recurrence is the second and fourth Wednesdays at noon Central. Session speakers and topics await the section schedule.

The top banner reads **FOR LSU HEALTH NEW ORLEANS PCCM FACULTY & FELLOWS**.

## Restore source and history

Download `lsu-pccm-research-history.bundle`, then run:

```bash
git clone lsu-pccm-research-history.bundle lsu-pccm-research
cd lsu-pccm-research
git remote set-url origin https://github.com/dwelsh-code/lsu-pccm-research.git
```

The ZIP is an alternative if Git history is not needed. Open `dist/index.html` or the standalone preview. The site needs no installation or server for local review. Run `node verify.cjs` from the restored source folder for the focused integrity, search, filtering, route, schedule, and document checks.

## Verification limits

Thirteen focused checks passed; 58 routes rendered in a minimal test harness. Full browser visual review has not been completed. Hosting source synchronization was blocked in the authoring session. This repository is a private backup; creating it does not deploy the website or connect its domain.

This first GitHub backup uses source and history archives because the GitHub connection did not have access to the newly created private repository. The individual source files and their history are preserved inside those archives.
