# First website release

Updated: November 8, 2026

## Available now

Open outputs/CTS_Research_Hub_Preview.html directly. It contains the complete website, embedded data, styles, application code, and Word document download. website/dist/index.html is the normal multi-file static site. No dependencies are required to view either build.

- 40 original databases, grouped into 17 topics.
- 13 official LSU resources covering IRB, REDCap, forms, onboarding, library, and analytic support.
- Search, collection/topic filters, 53 resource detail pages, and source links.
- Conference page with section filtering and source-linked series.
- Owner-supplied PCCM research recurrence: second and fourth Wednesdays at noon Central. Location, speakers, and topics remain pending the uploaded section schedule.
- LSU Health purple/gold presentation, responsive layouts, keyboard navigation, and a mobile menu.

## Verification

13 checks passed, including preservation of the 40 original databases and 17 topics, safe URL schemes, related-resource IDs, search/filter behavior, route rendering, exact DOCX hash, corrected conference recurrence, conference section filtering, and safe query output. 58 route renders completed in a minimal DOM harness; this is not browser testing. All shipped JavaScript passed Node syntax checks. The standalone HTML was checked for embedded scripts, unique shell IDs, and its embedded Word document.

## Not yet complete

- Browser visual/interaction review could not run: the session blocked preview-server binding, and the browser disallowed local-file navigation.
- Site registration exists: appgprj_6af08ce978ec8191bac0db9d4ed7d268. It has no published version. Do not create a duplicate registration.
- Source synchronization failed: Could not resolve host: git.chatgpt-team.site. No source push, saved deployment version, or live URL is verified.
- lsupccmresearch.org is the owner-purchased intended domain, but hosting/DNS/TLS are not connected or verified.
- Canonical workspace installation remains blocked by this session's filesystem permissions.

## Continue

Use the existing build rather than rebuilding the site from scratch. Restore the hosting source connection in an authorized environment, run website/verify.cjs from the website directory, perform a browser review, then push/package and publish the existing Site identity. After publication, add lsupccmresearch.org and use only the hosting service's returned DNS records. Add session topics/speakers from the user's schedule upload when supplied.

This website folder is a curated source snapshot; no live Git metadata, credentials, or dependencies are included.
