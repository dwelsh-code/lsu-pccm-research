# Scope and design decisions

Updated: 2026-11-08

The user clarified that the database directory belongs to a broader CTS research website for LSU Health faculty and fellows. Include local IRB instructions/documents, REDCap, and section research conference schedules. Hosting must be outside LSU’s site; formatting should mirror LSU Health’s style guide. CTS Essentials should inform design and function.

## Verified style sources

- https://www.lsuhsc.edu/admin/it/web/standards.aspx — purple 461D7C, gold FDD023, responsive/accessibility expectations, institutional web/CMS standards.
- https://www.lsuhsc.edu/admin/it/web/docs/LSUHNOGraphicsStandards.pdf — linked graphic standards manual; logo treatment and typography for organizational identifiers.
- https://www.lsuhsc.edu/webredesign/templateinfo.aspx — official template information.

External hosting is a user requirement. Do not treat it as proof of institutional authorization or mislabel the site as LSU-hosted. The visual guide can inform layout independently of the host; any use of official marks should match their actual authorization and source assets.

## CTS Essentials evidence

Reviewed saved design brief, sitemap notes, project index, React page, CSS, and implementation overview. Planning emphasizes three entry paths, six research stages, concise action-oriented content, and local help. Saved code shows rules-based matching and prototype consultation, video, and checklist interactions. No live browser review was completed: access was declined by the origin approval gate. Site metadata identified LA CaTS CTS Essentials and reported version 13.

Useful patterns: task-first entry, optional research-stage browsing, progressive detail, direct local support links, responsive cards, and practical next actions. Adapt for a resource hub by keeping fast directory access and adding conference navigation. Do not copy LA CaTS logos, branded instructional content, or multi-institution service assumptions.

## Package and placement

The prior database-only package is superseded by this website planning package. The proposed canonical documentation location moves to Coding/Websites/lsu-health-cts-research-hub because the objective is website development. Live source control must remain outside iCloud. Direct canonical writes remain blocked; installation and cross-machine readiness are unverified. On the receiving machine, verify the index and outputs; if using a separate implementation checkout, follow the shared status/restore or Git handoff protocol as applicable.
