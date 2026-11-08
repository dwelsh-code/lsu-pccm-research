# Vercel launch

Target project: `lsu-pccm-research`. Intended domain: `lsupccmresearch.org`.

Import `dwelsh-code/lsu-pccm-research` in the same Vercel account that hosts Arsonist Pizza. Keep the root directory at the repository root and use the Other framework preset. `vercel.json` sets `node build-vercel.cjs` as the build command and `public` as the output directory. No dependencies, environment variables, database, or paid integration are needed for this release.

The build copies only the five runtime files and database Word document into `public/`. Backup archives and project records are never copied into the published directory. In a full source checkout those files come from `dist/`; in the GitHub launch layout they are stored at repository root, alongside the existing private backups.

After deployment succeeds, add `lsupccmresearch.org` and `www.lsupccmresearch.org` in Vercel's project Domains settings. Use the exact DNS records Vercel provides for this project; do not assume Arsonist Pizza's DNS values apply. Check the deployed website, search, conference information, and Word download before marking launch complete.

## Verified deployment — November 8, 2026

Production: https://lsu-pccm-research.vercel.app/
Project dashboard: https://vercel.com/aronsistpizzas-projects/lsu-pccm-research
Project ID: prj_lc1NMQpAdKLZ6vSAqriENPShIj5N
Deployment: Ci6smtzj1qVLiSURkTCNAvTL8ZDU
Source: Vercel Drop, six checked static files; GitHub auto-deployment is not connected.
GitHub repository is public at the owner's explicit request.

Verified Vercel Ready state, HTTP 200, PCCM banner and homepage in browser, live search returning three MIMIC records, and SHA-256 matches for all five downloaded runtime/document assets. Local checks passed all 13 checks and rendered 58 routes.

Custom domains added: lsupccmresearch.org redirects (308) to www.lsupccmresearch.org, which targets Production. Both await external DNS configuration. Vercel explicitly requires:

| Type | Name | Value |
|---|---|---|
| A | @ | 216.198.79.1 |
| CNAME | www | 298a7abaf1c5c121.vercel-dns-017.com. |

Registrar/provider access is still needed. Do not claim custom-domain launch is complete until Vercel validates DNS and HTTPS works. No registrar records or nameservers have been changed.


## Additional domain — November 8, 2026

Owner requested ctsresearchhub.org as another address for this same site for now. Added ctsresearchhub.org (308 redirect to www.ctsresearchhub.org) and www.ctsresearchhub.org (Production) to the existing Vercel project. Both are awaiting DNS changes at the external provider. Vercel explicitly shows the same records for this domain: A @ 216.198.79.1; CNAME www 298a7abaf1c5c121.vercel-dns-017.com. Existing PCCM domain mappings remain in place. Registrar access/provider is still unknown.

## Porkbun DNS applied — November 8, 2026

Used owner's signed-in Safari Porkbun account to edit both domains. Each originally had only an apex ALIAS and wildcard CNAME pointing to pixie.porkbun.com. Changed each apex ALIAS into A @ 216.198.79.1 and added explicit CNAME www 298a7abaf1c5c121.vercel-dns-017.com, TTL 600. Confirmed saved tables for both domains. Retained wildcard parking entries; no mail records, nameservers, or other domain settings were changed. Vercel subsequently recognized all four names and displayed Generating SSL Certificate. HTTPS had not yet completed at that check.

### Domain launch verified

Vercel reports Valid Configuration for all four custom-domain names. HTTPS requests to both apex domains followed their configured www redirects and returned HTTP 200 with the expected PCCM banner. Opened https://ctsresearchhub.org in the browser and verified the rendered research homepage at https://www.ctsresearchhub.org/. Both https://ctsresearchhub.org and https://lsupccmresearch.org now serve this site.
