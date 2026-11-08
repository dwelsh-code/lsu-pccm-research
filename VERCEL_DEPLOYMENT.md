# Vercel launch

Target project: `lsu-pccm-research`. Intended domain: `lsupccmresearch.org`.

Import `dwelsh-code/lsu-pccm-research` in the same Vercel account that hosts Arsonist Pizza. Keep the root directory at the repository root and use the Other framework preset. `vercel.json` sets `node build-vercel.cjs` as the build command and `public` as the output directory. No dependencies, environment variables, database, or paid integration are needed for this release.

The build copies only the five runtime files and database Word document into `public/`. Backup archives and project records are never copied into the published directory. In a full source checkout those files come from `dist/`; in the GitHub launch layout they are stored at repository root, alongside the existing private backups.

After deployment succeeds, add `lsupccmresearch.org` and `www.lsupccmresearch.org` in Vercel's project Domains settings. Use the exact DNS records Vercel provides for this project; do not assume Arsonist Pizza's DNS values apply. Check the deployed website, search, conference information, and Word download before marking launch complete.

Current state: deployment preparation only. Vercel account sign-in, project creation, deployment, and domain verification are not yet confirmed.
