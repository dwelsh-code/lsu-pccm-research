# CTS Research Hub

Live domains: https://ctsresearchhub.org and https://lsupccmresearch.org.

Release 1.1 is implemented and tested, with publication pending Vercel deployment access. It simplifies navigation, increases typography, adds 13 research resources, a PCCM research presentation schedule, and Lowenstein PCCM Micro-Grants applications and recipients. Shared form activation is pending connection of the approved private storage and verification of email delivery; the previous release remains live until publication is confirmed.

## Build and check

Run `pnpm install`, `pnpm build`, and `pnpm test`. Vercel uses `node build-vercel.cjs` and publishes only `public/`. Private server code is under `api/` and `lib/`. Never deploy `.env` files or expose storage tokens. Environment variable names are documented in `.env.example`.

## Content

- `data/database-inventory.json`: the preserved 40-resource PCCM database directory.
- `data/additional-resources.json`: new study design, literature, funding, writing, and collaboration resources.
- `data/microgrant-recipients.json`: approved recipients and projects; empty until the owner supplies award details.
- `dist/`: generated resource data plus website HTML, CSS and JavaScript.
- `docs/SHARED_FORMS_SETUP.md`: activation, privacy, pricing, and verification requirements.
- `docs/VERCEL_DEPLOYMENT.md`: deployment and Porkbun DNS history.

The conference recurrence is second and fourth Wednesdays at noon Central. Prior section schedule details, speakers, location, and holiday changes still need confirmation. The schedule does not fabricate presenter assignments.

The canonical documentation home is intended to be `/Users/dwelsh/Projects/Coding/Websites/lsu-health-cts-research-hub`. This session's active source checkout is outside iCloud in the permitted task workspace. Canonical promotion has not been completed because that destination is not writable in this session.

The owner approved free private Vercel Blob storage and FormSubmit on November 8, 2026. Browser automation was rejected for the current URL; the CLI authorization attempt subsequently failed because session network policy blocked api.vercel.com. No paid services or unverified email delivery have been enabled.

For an offline visual preview, run `node build-preview.cjs` and open `preview/CTS_Research_Hub_Preview.html`. Shared forms require the deployed API; the preview does not simulate successful submissions.

The GitHub source update was also rejected by the connector with HTTP 403 “Resource not accessible by integration.” The current revision is committed locally; the remote repository still contains the earlier version.
