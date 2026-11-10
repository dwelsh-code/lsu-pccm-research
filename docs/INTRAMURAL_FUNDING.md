# Secondary LSU Health Intramural Funding

Owner direction: keep Lowenstein PCCM Micro-Grants primary. The supplementary funding table lives at the bottom of the Micro-Grants page, after its form and recipients, within a closed-by-default details element. Do not add a competing main-navigation item or homepage funding card.

Scope: LSU Health New Orleans intramural mechanisms only. Eight initial records: WIRP, REP New Project, REP Clinical Research, REP Bridge, REP Healthcare Disparities, Resident Research Support, MSREP, and School of Medicine Core Vouchers. NIH deadlines, national conferences, LSU Baton Rouge and Shreveport programs, and externally sponsored opportunities are excluded from this calendar.

## Source and Deadline Rules

Edit data/intramural-funding.json and regenerate dist/app-data.js. Each entry has an official HTTPS lsuhsc.edu source, last-checked date, eligibility summary, mechanism purpose, deadline text, and schedule kind.

- recurring: publish the standing schedule and calculate the next NOMINAL date only. Do not imply an active current-year call. WIRP specifies 5 PM Central; the REP March/July/November 9 pages do not specify cutoff times. The healthcare-disparities mechanism uses different dates (the 15th) and a next-business-day rule for weekends/holidays; the UI deliberately retains nominal dates and directs users to verify adjustments.
- dated: retain the explicit call year. MSREP's posted January 31, 2026, 11:59 PM deadline is historical, with no time zone stated. Do not roll it into 2027. If passed, show Past Call — Next Cycle Not Announced.
- rolling: use only when the official page explicitly permits submission at any time. Resident support qualifies; funds are still subject to availability.
- unannounced: no fixed deadline found. Core Voucher guidance defines an approval process but not a fixed deadline; do not silently call it rolling.

Source-check dates older than 120 days trigger a visible recheck cue. This is a freshness warning, not automatic verification. No background scraping, notification, or scheduled automation was created. Recheck official pages during content maintenance, updating dates only after reviewing actual source content. A source page's current availability does not itself confirm funds are available.

## Build and Preservation

New browser module: dist/funding.js. Build-vercel includes it. Global search can surface the mechanisms and open the secondary section using #microgrants?intramural=1. Existing primary navigation, micro-grant policy, submission fields, private storage, and native email notification are unchanged.

Run node build-data.js, node build-vercel.cjs, node verify.cjs, and node --test tests/*.test.cjs. Check that Lowenstein remains prominent and the secondary section is initially closed on both desktop and mobile.
