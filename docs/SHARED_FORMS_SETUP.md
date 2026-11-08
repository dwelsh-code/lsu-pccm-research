# Shared forms setup — release 1.1

## Implemented

- Research conference dates: second and fourth Wednesdays at noon America/Chicago, twelve upcoming sessions, calendar downloads with daylight-saving offsets.
- One presenter per session; one upcoming booking per LSU Health email; server-side domain validation; explicit public-display consent for names/topics; private email storage; cancellation by a private management token.
- Lowenstein PCCM Micro-Grants application for LSU Health New Orleans medical students, residents, and fellows: name, LSU email, training level, project description, funding need, and requested USD budget. No attachments or CV.
- Applications are stored privately before notification is attempted. The reviewer address is read exclusively from a server environment variable and is absent from all published files.
- Recipients section reads approved award records from `data/microgrant-recipients.json`. It is empty because the owner has not supplied recipient data. Record shape: `{name, level, project, summary, year}`. Do not publish applicant data as awards.
- Six main pages, directly linked official resources, 40 unchanged databases, 13 additional research resources. Body text is 18px; purple banner is 70px high on desktop; navigation is 18px.

## Remaining activation requirements

1. Complete Vercel's email verification for the uploaded release. The existing live release remains unchanged until publication is confirmed. The uploaded source includes `vercel.json`, the build helper, and one Vercel Function. Verify the built output and API after deployment.
2. The owner explicitly approved free **private Vercel Blob storage** and FormSubmit on November 8, 2026. Create and connect the store to this existing project when deployment access is restored; no further approval is needed within that free scope. Do not upgrade to paid services.
3. Connect the private store to the Production environment, supplying `BLOB_READ_WRITE_TOKEN` automatically. Do not reveal this token or put it in client code, source control, or screenshots.
4. Set `MICROGRANT_RECIPIENT` privately to the owner's designated reviewer mailbox. The app's server email module uses FormSubmit as a free email relay. Activate the destination with the mailbox owner and verify delivery of a clearly labeled synthetic test application. Do not set `EMAIL_DELIVERY_VERIFIED=true` until actual delivery is confirmed. Provider approval was received; mailbox activation and real delivery verification remain required.
5. Redeploy after adding environment variables. Verify status endpoint capabilities, cross-browser booking persistence, collision handling, cancellation, private data filtering, and end-to-end application delivery. Remove test bookings using their cancellation tokens; keep synthetic test labels clear.

## Pricing and privacy

Vercel official documentation: https://vercel.com/docs/vercel-blob/usage-and-pricing
As checked November 8, 2026, Blob on Hobby is free within included limits (1GB storage, 10,000 simple operations, 2,000 advanced operations). Hobby does not bill overages; access pauses if quotas are exceeded. Do not upgrade or add paid services without approval.

Email domain validation is not proof that the applicant owns the mailbox. This release does not claim LSU SSO or verified inbox ownership. Do not describe it as authenticated institutional access. Public schedule names/topics are displayed only with consent; emails and application details remain in the private store. Do not collect PHI or confidential participant details.

## Failure behavior

`GET /api/hub?action=status` exposes only capability flags. Without private storage, submissions return 503 and no success confirmation. Grants remain disabled until both storage and verified email delivery are configured. A failed notification after private storage returns a receipt with notification pending; it does not claim email delivery. No browser-local imitation of a shared booking store is used.

## Verification completed

Eight integrity checks and eight behavior tests pass. Coverage includes original resource preservation, direct links, LSU destination labels, unchanged DOCX, all page renderers, email validation, concurrent booking conflict, cancellation protection, DST, grant validation, privacy boundaries, and storage/delivery failure behavior. Desktop browser visual review completed for the revised homepage and Micro-Grants form; full live API verification awaits activation. Browser viewport emulation was unavailable; responsive CSS still needs a device check.

## Latest deployment access check

On November 8, browser automation returned “Computer Use is not allowed on the current browser URL.” The CLI OAuth attempt then failed because session network policy blocked https://api.vercel.com:443. No Vercel CLI authentication file was created. These restrictions are separate from the owner approval above. Production remains on the earlier release.

The GitHub connector also rejected creating the updated source tree with HTTP 403 “Resource not accessible by integration.” Repository metadata permission flags do not establish connector write access. No remote source update was confirmed.
