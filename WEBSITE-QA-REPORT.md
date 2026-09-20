# Apexiar restructure: QA and content disposition

20 September 2026. User approved the current site and explicitly authorised commit/push to main for production. Release checks passed; site commit 4c1543f is pushed to main. Production activation is not yet confirmed. Remaining device/accessibility/consent follow-ups are documented below.

## Changed in Phase 6

- All 30 HTML files: consistent desktop/mobile navigation, complete footer routes and shared navigation stylesheet. Corporate Organization descriptions updated where present; page-specific metadata retained.
- `index.html`: added the `sectors` anchor; protected homepage sections unchanged.
- `software-intelligence.html`: original software-focused footer description preserved in the introduction.
- `products/atlas.html`, `products/assure.html`: missing downloads changed to truthful Request Brochure contact links.
- `404.html`: root-relative recovery/assets, skip link and noindex.
- `contact.html`: preserve honeypot state in the existing Web3Forms payload.
- `script.js`: reduced-motion guards, desktop-resize menu closure, accessible video pause/play.
- `site-navigation.css`: new responsive navigation/footer, focus and playback-control styling.
- `sitemap.xml`: 29 canonical public routes, including all new pages; homepage canonical `/` used.
- `WEBSITE-RESTRUCTURE-PLAN.md` and this report: status and evidence.

No framework, production dependency, asset rename, product URL change or new form destination.

## Verification

| Check | Result |
| --- | --- |
| Local HTML references, including fragments and case-sensitive asset paths | 1,687 checked; no failures |
| CSS asset references | Passed |
| Preview HTML/CSS/media/support resources | 124 successful responses |
| Nested missing URL | Correct 404 status; root-relative recovery and stylesheet paths |
| Sitemap | 29 unique canonical public routes; 404 excluded |
| Titles/descriptions/canonicals | Unique titles; descriptions present; canonicals present except noindex 404 |
| IDs, ARIA references, image alt attributes | Passed static checks |
| Inline JavaScript and JSON-LD | Parse checks passed |
| Shared JavaScript and server | `node --check` passed |
| Assets | All 80 existing asset hashes unchanged |
| Live enquiry delivery | User confirmed the enquiry arrived at the company email |
| Cookie banner and acceptance | User confirmed banner appeared and acceptance worked; other consent checks pending |
| Form logic, mocked only | Success, failure, timeout, invalid input, blank message, duplicate submission and honeypot cases passed |
| Menu logic, mocked only | Opening focus, tab wrap, Escape/focus return and desktop resize passed |
| Video logic, mocked only | Pause/play, reduced-motion initial state and timed slides passed |
| Whitespace | `git diff --check` passed; line-ending warnings only |
| Build/lint/test commands | None configured; no invented build result |

Logic tests used isolated Node VM mocks. They do not prove browser rendering, service delivery or real assistive-technology behaviour. No live enquiry was sent. External services and hosting redirects were not exercised.

## Content disposition

The migration control document remains authoritative for individual M01–M31 rows.

| Migration IDs | Retained or moved content | Homepage/result |
| --- | --- | --- |
| M01 | Original software hero copy retained on Software | New company-wide hero |
| M02–M03 | Original blue/gold particle implementations retained | Hero and capability area; reduced-motion support added |
| M04 | Original Certified & Compliant label and both badges | Retained intact |
| M05–M10 | Both complete nine-item product collections preserved on Software; all existing product URLs retained | Four capability tiles and selected technology links; full portfolio route at legacy `#products` |
| M11 | Video, poster, three messages and timing retained on homepage and Software | Directly below sector strip; playback control added |
| M12–M13 | Original regulated-industries heading, mission and four statistics | Retained intact |
| M14–M16 | Complete expertise content preserved on Software; consultancy also on Advisory | Original glowing horizon/canvas retained within operating model |
| M17 | Full original benefits retained on Software | Legacy homepage anchor links to benefits |
| M18 | Full testimonial, name, role and logo | Retained intact |
| M19–M20 | Original process and software CTA retained on Software | Company-wide delivery process and enquiry CTA |
| M21–M24 | Services source retained; full service cards surfaced on relevant capabilities | Capability routes |
| M25 | Product detail content/URLs retained | Broken Atlas/Assure brochure actions changed to requests; missing originals still needed |
| M26 | Six articles and listing retained | Insights navigation; all articles in sitemap |
| M27 | Form fields, recipient service and contact information retained | Honeypot fix; no CRM integration/source tagging added |
| M28 | Legal pages and downloads retained | 404 recovery/accessibility fixed; policy discrepancy remains open |
| M29 | Software footer wording preserved on Software | Consistent navigation/footer and broader corporate metadata |
| M30 | All original 69 assets and 19 subsequent additions retained | 88 assets; includes both earlier and revised railway comparison JPEG pairs |
| M31 | Additive turbine inspection sequence; supplied source retained | Approved stronger zoom integrated; seven tests and targeted Edge desktop/phone/tablet review passed; physical-device and accessibility/fallback review outstanding |
| M32 | Supplied visible/thermal railway illustrations; originals untouched | Revised pair at supplied exposure; six tests, alignment and Edge desktop/tablet/phone emulation passed; physical touch and remaining accessibility/loading QA open |

No original product, service, article, testimonial, image or video content was deleted from the site. Navigation/metadata and homepage company summaries were rewritten as planned. Obsolete download links were replaced without inventing their missing files.

## Outstanding before release

1. **Browser/device QA:** browser automation exposes no available browsers/apps. Review desktop 1440px, tablet 768px, mobile 390px and narrow 320px, including new navigation breakpoint near 1100px. Check every changed page, footer, keyboard focus, mobile-menu behaviour, overflow, contrast, image framing, video controls/timing, glowing horizon and pixels. Check reduced motion as well as normal motion.
2. **Consent validation:** consent.js/consent.css now gate Analytics behind acceptance, store apexiar_consent, and expose footer settings. Policy implementation notes were added. The user verified banner display and acceptance. Rejection, persistence, withdrawal, network blocking and mobile/tablet behaviour still need validation; do not treat acceptance alone as complete consent QA.
3. **Brochures:** Atlas and Assure PDFs remain unavailable. The site now offers a working enquiry route instead of a failed download.
4. **Contact delivery verified by user:** the user submitted an enquiry and confirmed receipt at the company email. Existing Web3Forms delivery therefore has user-verified end-to-end evidence. No CRM integration or source-tagging schema is configured; any additional CRM requirement remains unconfirmed.
5. **Evidence and deployment:** existing statistics/certification wording was preserved without increasing claims. Confirm evidence/current scope as needed. Hosting access/process and production redirect behaviour remain unverified; deployment requires a separate instruction.

Existing housekeeping observations remain: `.gitignore` contains null bytes, and the Atom brochure is approximately 23.7 MB. Neither file was silently replaced or deleted during the restructure.

## HTML files changed

- `404.html`
- `advisory-deployment.html`
- `aerial-intelligence.html`
- `blog.html`
- `blog/anti-social-behaviour-rail-staff-safety.html`
- `blog/artemis-transport-for-wales.html`
- `blog/cyber-resilience-pledge.html`
- `blog/meet-amy-ai-assistant.html`
- `blog/our-first-customer-day.html`
- `blog/telemetry-reliability-centred-maintenance.html`
- `capabilities.html`
- `carbon-reduction-plan.html`
- `connected-systems.html`
- `contact.html`
- `cookies.html`
- `index.html`
- `privacy.html`
- `products/amis.html`
- `products/artemis.html`
- `products/aspire.html`
- `products/assure.html`
- `products/atlas.html`
- `products/atom.html`
- `products/axis.html`
- `products/prism.html`
- `sectors/energy-infrastructure.html`
- `sectors/fire-emergency-response.html`
- `sectors/rail.html`
- `services.html`
- `software-intelligence.html`

## User verification update

- User confirmed the cookie banner appeared and accepted the choice.
- User confirmed a submitted enquiry arrived at the company email. The assistant did not send a live enquiry.
- Desktop homepage/banner were observed through Edge. Browser automation later stopped automatically when URL detection failed; complete responsive and consent-state checks remain outstanding.

## Capabilities dropdown follow-up

All 30 page headers now offer direct capability dropdowns on desktop and mobile. Updated script.js/site-navigation.css; exact replacement checks preserved other HTML. 300 dropdown links and mocked dismissal/focus behaviours passed; JavaScript syntax/whitespace passed. Rendered responsive menu checks remain pending.


### Dropdown pointer-exit adjustment

- User requested closing the capability dropdown when moving away. Updated script.js to close desktop mouse-driven disclosures on pointer exit while retaining keyboard focus and touch/mobile behaviour.
- Updated site-navigation.css with an invisible hit area spanning the 16px gap between the trigger and panel, so moving into the links does not prematurely close it. No HTML, content or destinations changed.
- Mocked pointer-exit cases passed for desktop mouse, touch, mobile and keyboard focus; JavaScript syntax and git diff --check passed. Actual browser pointer interaction remains pending. No build/lint/test scripts configured, commit or deployment.


### Software navigation label

- Renamed Products to Software in desktop and mobile navigation across all 30 HTML pages (60 labels), as requested. Existing software-intelligence.html#products destinations, page titles, capability labels, footer headings and product URLs remain unchanged.
- Verified two label replacements per page and unchanged link destinations; git diff --check passed. Documentation updated only in this tracker and WEBSITE-QA-REPORT.md. No build/lint/test scripts configured; browser layout tests not repeated for this text-only change. No commit or deployment.


### Homepage company wordmark

- User explicitly requested removing the hero tagline Safer operations. Brighter tomorrows. and restoring a prominent APEXIAR company name. Replaced that single paragraph with live-text APEXIAR (ASCII spelling in implementation).
- Changed index.html and homepage.css: responsive wordmark with gold/ice-blue gradient, illuminated underline and a one-time entrance/light sweep. Existing reduced-motion rules disable the animation; text has a solid-colour fallback. Main headline and all protected homepage sections remain unchanged.
- Checked exact replacement, single h1, reduced-motion fallback, whitespace and HTTP preview for HTML/CSS; git diff --check passed. No configured build/lint/test scripts. Rendered device review remains pending. No commit or deployment.


### Homepage positioning copy refinement

- User approved Advanced technology for critical operations as the headline and supplied an expanded company introduction. Updated only the hero h1 and lead paragraph in index.html, correcting spelling and capitalisation.
- Lead: Apexiar is an innovative technology company providing advanced software, connected sensing and aerial intelligence for rail, emergency response and critical infrastructure.
- Exact reversal comparison confirmed no other HTML changed. Git whitespace and local preview-content checks passed. Updated this tracker and QA report; no configured build/lint/test commands and no browser layout retest for this copy-only edit. No commit or deployment.


### Footer Software heading

- Changed the Products footer heading to Software across all 30 HTML pages, as requested. Exact reversal checks confirmed that all footer links and other page content remain unchanged.
- Updated this tracker and WEBSITE-QA-REPORT.md. Replacement/preservation checks and git diff --check passed; no configured build/lint/test commands. Visual layout tests not repeated for this label-only edit. No commit or deployment.


### Featured technology: AXIS

- User requested replacing the homepage Atom feature with AXIS and the heading Maintenance Intelligent Platform. Updated only that card in index.html: existing Axis AI workspace screenshot, AXIS heading with requested platform wording, maintenance summary and products/axis.html destination.
- Atom remains on Software, its own product page, Rail and footer; no asset or product URL removed. M07 homepage feature disposition updated.
- Exact reversal verified no other HTML changed; image/product/preview HTTP checks and git diff --check passed. No configured build/lint/test scripts. Rendered layout review pending; no commit or deployment.


### Supplied AXIS homepage image

- Replaced only the homepage featured AXIS image with the supplied Desktop/website images/axis.png, copied unchanged to assets/Design/Axis/axis-homepage.png. Updated alternative text to describe its maintenance analytics dashboard. Heading and product link preserved; original images retained. M30 inventory: 81 assets.
- Exact image/alt-only replacement, source-copy SHA256 equality, homepage/image/product HTTP 200 and git whitespace checks passed. Existing responsive contain styling preserves the complete screenshot. No configured build/lint/test scripts; rendered desktop/tablet/mobile review remains pending. Phase 6 status and next action unchanged; no commit or deployment.


### AXIS card copy refinement

- Changed only the homepage card heading to AXIS and its description to AI Powered Maintenance Intelligence Platform, correcting the supplied spelling of Platform. Image and product link unchanged; migration destinations and Phase 6 status/next action unchanged.
- Exact reversal and local HTTP preview-content checks passed; git whitespace check passed. No configured build/lint/test commands. Device visual review not repeated for this copy-only change. No commit or deployment.


### Homepage scroll reveals

- Added homepage-only one-time scroll reveals from capabilities through the final CTA, using the existing script and homepage stylesheet. Headings and content gently rise/fade; card groups stagger by 75ms, with shorter movement and no delay on mobile. No content, images, destinations or links changed; migration rows unchanged. Original video, pixels and globe effects preserved.
- Content is visible without JavaScript or IntersectionObserver, for reduced motion and print, and immediately on keyboard focus. Already-visible content is not hidden on initialisation; changing reduced-motion preference reveals all pending elements. Other pages retain their existing animation behaviour.
- Checks passed: node --check script.js; simulated 390/768/1440 viewport initial visibility, intersection, keyboard focus and preference changes; reduced-motion/missing-observer fallbacks; local homepage/JS/CSS HTTP 200; git diff --check. No configured build/lint/test scripts. Simulations are not rendered device tests; browser/device review remains pending. Phase 6 remains open; next action is visual review of scroll timing and outstanding release QA. No dependencies, commit or deployment.


### Pinned aerial inspection and clean-video refinement

- Added the full-screen native sticky inspection stage after the complete operating-model/globe section and before the retained certification strip. Files: index.html, inspection.css, inspection.js, assets/media/apexiar-turbine-{inspection.mp4,poster.jpg,evidence.jpg}, server.js and tests/inspection.test.js. Native paused scrubbing, manual frame-relative brackets, illustrative evidence panel, capability CTA, lazy loading, keyboard skip and static fallbacks implemented. No content moved or removed; M31 added and M30 inventory now 84 assets.
- Replaced all three initial watermarked derivatives using the user-supplied without water mark.mp4. Six-frame dissolve softens the source camera cut at 4.041667s; duration and close-up tracking timings preserved. Silent 1600x902 derivative is 13,774,335 bytes with all 241 frames independently seekable. Source untouched. Detailed provenance, encoding and adjustment instructions: INSPECTION-NOTES.md.
- Passed six Node VM behaviour tests; inspection/server syntax; complete video decode and keyframe check; transition/source contact-sheet inspection; MP4 HEAD, valid/suffix/invalid byte ranges; HTTP asset/capability checks; 102 local homepage references; exact reversal confirms all pre-existing homepage content preserved; git whitespace check. No configured build/lint scripts.
- Earlier browser review stopped because Computer Use could not reliably identify Edge URL. Actual desktop/tablet/mobile visual review remains open; automated viewport simulations are not rendered QA. Phase 6 remains open; next action is review of the clean sequence at localhost:4174/#aerial-inspection. No new dependencies, commit or deployment.


### Stronger zoom candidate from final video.mp4

- Prepared review/inspection-dramatic.mp4 and reproducible review/build-inspection-preview.js. This is a separate review candidate; homepage assets, HTML, inspection timing and tracking remain unchanged. Source clips untouched.
- Latest source has rotating blades during its approach, contrary to the locked-blade brief. Candidate therefore uses the first four seconds of the earlier without water mark.mp4 approach, then the new final video.mp4 inspection imagery. Keeps exactly four seconds plus six seconds, 240 frames at 24 fps.
- Inspection timing: 4.00-4.25s establishing hold; 4.25-5.667s first accelerated zoom; 5.667-6.00s hold; 6.00-7.50s second accelerated zoom; 7.50-10.00s static close-up. Centred digital magnification rises from 1.08 to 1.15 to 1.28, supplementing source magnification. No invented texture, damage changes or motion interpolation. New damage imagery itself is more pronounced than the earlier coating-only example.
- Output: silent 1600x902 H.264, all 240 frames independently seekable, fast-start, 13,805,629 bytes. Preview: http://localhost:4174/review/inspection-dramatic.mp4.
- Checks passed: full decode and frame count, 60 identical final pre-encoding frames (2.5-second hold), inspection contact-sheet review, HTTP byte-range delivery, script syntax, existing six inspection tests and git whitespace. Lossy encoded still frames may differ slightly from rate-control quantisation. No rendered browser/device test or smoothness claim. No build/lint scripts configured.
- M31 candidate ready for user review; M30 published asset inventory remains 84. Phase 6 remains open. Next action: review candidate, then integrate the chosen footage with new overlay timing, tracking coordinates and evidence thumbnail. No commit or deployment.


### Approved stronger zoom integrated

- User approved the review edit. Copied it byte-for-byte into the homepage inspection asset, regenerated the matching poster and 7.5s evidence thumbnail, and versioned inspection asset/CSS/JS URLs to refresh cached copies. Original sources and approved review copy retained.
- Updated inspection.js for the exact 4s cut, bracket introduction, 7.5s evidence capture and 8s finding. Recalibrated manual tracking against eight extracted frames, including constant boxes during the pauses and final 2.5s hold. Desktop evidence moved left to keep the enlarged observation clear; mobile evidence remains below. Finding label changed to Potential surface damage.
- Files changed: index.html, inspection.js, inspection.css, the three existing assets/media/apexiar-turbine-* files, tests/inspection.test.js, INSPECTION-NOTES.md, this tracker and WEBSITE-QA-REPORT.md. All unrelated homepage HTML and protected sections preserved. M30 count remains 84; M31 approved media integrated, browser/device QA pending.
- Passed seven Node VM tests (including new cut/evidence/final-hold checks and contained-video geometry at 1440/768/390 simulations), script syntax, SHA256 equality with approved video, 102 local references, exact reversal of authorised HTML changes, local resource HTTP 200 and video byte-range 206, annotated-frame alignment review and git whitespace check. No configured build/lint commands. Rendered browser/device QA remains open; no commit or deployment.
- Next action: review integrated sequence at localhost:4174/#aerial-inspection and finish remaining Phase 6 browser/device and release checks.

### Integrated inspection browser review

- Windows browser automation worked for this session. Reviewed the approved sequence in Edge at the full desktop window, iPhone 16 emulation (393 x 852) and iPad Mini emulation (768 x 1024). No further implementation changes were required.
- Verified forward/reverse seeking, settled tracking alignment, stationary final close-up, desktop evidence clear of the damage, phone/tablet evidence below the contained image, and normal release into the certification strip. The tablet skip link reached the retained certification and regulated-industries content. Restored the browser to desktop and closed DevTools.
- Updated M31, the restructure tracker, INSPECTION-NOTES.md and this report. These are targeted rendered checks, not physical iOS/Safari tests or full-site sign-off. Keyboard-only focus, rendered reduced-motion/loading/error cases and wider Phase 6 release checks remain open. No commit or deployment.

### Aerial visible / thermal comparison

- Added the requested full-frame comparison after the thermal explanation and before the security concept. Existing page content, metadata, images and links preserved. Homepage and its inspection code/media unchanged.
- Files: aerial-intelligence.html; new thermal-comparison.css, thermal-comparison.js, assets/Design/Aerial/railway-visible.jpg, assets/Design/Aerial/railway-thermal.jpg, tests/thermal-comparison.test.js and THERMAL-COMPARISON-NOTES.md; this tracker/report. M32 added; M30 inventory now 86 assets. No dependency, commit or deployment.
- Native range starts at 40%; pointer enhancement supports mouse and horizontal touch while leaving vertical scrolling to the browser. Full-size images are clipped, never resized by the slider. Gold divider/handle, label-fit handling, focus ring, lazy loading and visible-image failure fallback added. No detection or temperature claims.
- Reviewed sources, 50% blend and 40/73/81% split composites. Major rail/tree/figure positions align closely; local illustration differences remain. No global alignment adjustment applied. Full-resolution JPEG copies total 1,028,259 bytes versus 5,780,707-byte originals, which remain untouched.
- Passed six new behaviour tests and seven inspection regression tests, syntax, whitespace, exact pre-existing page-content preservation (ignoring line endings), 70 local references, ID/ARIA checks and five preview HTTP 200 responses. No build/lint scripts configured. Rendered keyboard, mouse and desktop/tablet/phone review pending; physical touch requires device review.
- Next action: review localhost:4174/aerial-intelligence.html#thermal-comparison. Wider Phase 6 remains open.

### Previous inspection-callout review record

- The user accepted the raised evidence card and digital gold callout treatment with "pefect". Seven behaviour checks passed in that task; rendered review stopped when Computer Use could not reliably determine Edge's URL. No new homepage changes in this thermal-comparison task.

### Visible illustration: darker dusk exposure

- User accepted the comparison and asked whether the visible scene could be made darker. Added a uniform CSS brightness 0.58 / contrast 1.12 filter to the visible image only. This preserves matching image geometry and avoids regenerating either scene. Thermal presentation and both source/derivative image files remain untouched.
- Changed thermal-comparison.css, its version URL in aerial-intelligence.html, THERMAL-COMPARISON-NOTES.md, WEBSITE-RESTRUCTURE-PLAN.md and WEBSITE-QA-REPORT.md. Exposure values are configurable CSS variables; both set to 1 restore the previous image presentation. M32 updated; no migration or asset-count change.
- Six comparison tests passed, including mocked desktop/tablet/phone widths. HTML reversal, both image SHA256 hashes, unchanged slider JS, 70 local references, HTTP 200 and git whitespace checks passed. No build/lint commands configured. Layout and interactions unchanged; no new tests needed for this CSS treatment. Actual rendered exposure/device review pending.
- No framework, dependency, commit or deployment. Preview: localhost:4174/aerial-intelligence.html#thermal-comparison.

- Exposure browser follow-up: refreshed the existing Edge local preview and reviewed the 40% split at desktop size. The visible figures are less obvious; rails and dusk sky remain legible. Thermal, gold divider and labels remain clear. Further interaction was not performed after the tool detected user browser activity. Tablet/phone rendered exposure review and earlier physical-touch/keyboard checks remain open; no layout or interaction code changed.

### Revised supplied visible / thermal pair

- Replaced the active comparison images with optimised copies of Desktop/website images/New normal.png and new thermal.png. Both are 1672 x 941. New assets railway-visible-v2.jpg (586,323 bytes) and railway-thermal-v2.jpg (351,679 bytes) retain full dimensions and supplied exposure. Original PNGs and both earlier web JPEGs remain untouched.
- Reset visible brightness/contrast variables to 1 and refreshed the CSS version URL. Slider JS, default 40% position, labels, caption, page copy, layout and image alignment are unchanged. No additional crop, registration or colour adjustment applied.
- Reviewed both new sources, a 50% blend and 40/73/81% split composites. Rails, trees and figure positions align closely; minor local illustration differences remain. First figure is revealed by approximately 73% and both by 81%. No pixel-perfect alignment claim.
- Files: aerial-intelligence.html, thermal-comparison.css, the two new assets, THERMAL-COMPARISON-NOTES.md, WEBSITE-RESTRUCTURE-PLAN.md and WEBSITE-QA-REPORT.md. M30 inventory 88; M32 updated.
- Six existing comparison tests passed (including mocked desktop/tablet/phone widths), plus previous-asset and script hash preservation, exact HTML reversal except newline normalisation, 70 local references, four HTTP 200 checks and Git whitespace. No build/lint scripts configured. No commit or deployment.
- Browser follow-up: reviewed the revised pair at desktop size, iPad Mini 768 x 1024 and iPhone 16 393 x 852 in Edge. The visible figures blend into vegetation; dragging right reveals both thermal figures. Full frame, copy and labels fit all three sizes. Desktop Home/End produced visible-only/thermal-only views and correct labels; focus remained visible. Restored desktop and closed DevTools. Device emulation does not replace physical touch/Safari testing; keyboard-only tab navigation and rendered loading/error cases remain open.


### Approved production release

- User confirmed the Software header correction works and explicitly requested saving, committing and pushing the approved restructure to main for the domain launch. This supersedes earlier no-commit/no-deploy review gates.
- Software navigation: removed #products from all 60 desktop/mobile Software header links across 30 pages. Dedicated portfolio links and all other content remain intact; exact reversal and destination checks passed. User verified browser behaviour. M29 updated.
- Release checks: 13 Node tests passed; 1,999 local links/assets/fragments across 30 pages passed; root/inline JavaScript and JSON-LD parsed; Git whitespace passed. No build or lint scripts are configured for this static site. Existing documented physical-device, accessibility and consent follow-ups remain open, not represented as passed.
- Scope: capability and sector pages, homepage/media enhancements, software-content migration, shared navigation/consent, retained product routes/assets, tests and project records. No new framework or production dependency.
- Fetched origin/main; approved branch descends from it with no remote divergence. Preparing a normal fast-forward main push; production verification follows the push.

### Release push and production handover

- Committed the approved site as 4c1543f38cfaa623d659863ba1cd2dc88868ab89 and fast-forwarded/pushed origin/main successfully. No force push. Local main and origin/main matched; working tree was clean.
- HTTPS verification after push: www.apexiar.co.uk returned 200 with the old homepage; aerial-intelligence.html returned 404. Public GitHub commit status was pending with no check runs, deployments or Actions runs reported. This does not establish a hosting failure, but the new site is not yet verified live.
- Repository includes vercel.json, but no authenticated hosting CLI/session or deployment credentials are available here; GitHub CLI is not authenticated. Next step: inspect the hosting project connected to Apexiar-Team/Atlas-Website, confirm production branch main and deploy commit 4c1543f. Existing domain/DNS configuration was not changed.
