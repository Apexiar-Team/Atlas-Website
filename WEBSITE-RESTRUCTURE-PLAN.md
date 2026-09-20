# Apexiar website restructure: control document

Last updated: 20 September 2026.

## Current position

- Current phase: Phase 6 navigation, metadata and automated QA implemented; browser/device QA and release items remain open. All three sector pages accepted for progression. Phases 2, 3a-3d and the Phase 4 homepage are accepted for progression; agent browser/device QA remains outstanding.
- Next action: Commit and push the user-approved release to main, then verify the production domain. User explicitly authorised launch; remaining QA follow-ups stay documented.
- Homepage status: video now directly follows the sector strip, before capability tiles; rebuilt around four capabilities and the supplied reference; all explicitly protected sections retained intact. Existing capability/product pages, shared scripts/styles and original assets unchanged.
- Branch: `website-restructure`.
- Original site commit: `ff480f3`.
- Deliberate baseline commit: `f1e4fe6` (existing website plus the supplied `AGENTS.md`).
- This control document and its reference in `AGENTS.md` are subsequent planning changes, not part of that baseline.
- No content deletion is approved. No framework or dependency change is approved.
- The user's six-phase direction supersedes the earlier eight-phase proposal. In particular, the customer testimonial stays on the homepage.
- Current bounded refinement completed: comparison now uses the supplied New normal.png and new thermal.png pair at neutral exposure. Both prior web images and all source files retained; behaviour, dimensions and copy preserved. Automated and desktop/tablet/phone emulation checks passed; ready for user review.

## How to use and update this document

1. At the start of each task, read `AGENTS.md` and this file; inspect Git status and the relevant implementation.
2. State the phase and bounded task. Read previous validation results and unresolved issues before changing anything.
3. Update the phase tracker, affected migration rows and progress log after each task. Record actual results, not intended results.
4. Use statuses: not started, in progress, ready for review, accepted, blocked. Record the specific missing input for any blocked item.
5. Do not mark a phase accepted until the user has reviewed it. Stop at the requested phase/page boundary.
6. Before removing a source section, implement its destination, verify content parity and links, and record that evidence here.
7. Report changed files, checks completed, checks not run, deviations and next action in every handoff.
8. Preserve baseline references. No further commits, pushes or deployments unless requested; Phase 1 baseline permission is not blanket permission.
9. Changes to destinations, protected content or scope must be recorded as decisions before implementation.

## Positioning and design brief

Apexiar is an applied technology company for regulated and safety-critical operations.

Capabilities: Software & Intelligence; Connected Systems; Aerial Intelligence; Advisory & Deployment.

Sectors: Rail; Fire & Emergency Response; Energy & Infrastructure.

The user supplied a homepage reference image in the planning chat and then the local file C:/Users/Ryanw/Desktop/website images/homepage.png. A byte-identical copy is now assets/Design/Home/homepage-reference.png. It is a visual direction and decorative illustration, not proof of product capability. The homepage uses a CSS-framed portion of its hero artwork alongside live HTML text and controls.

- Dark black/navy background, atmospheric blue lighting, gold accents, crisp light typography and fine borders.
- Strong left-aligned hero; technology and operational imagery on the right; live HTML text and calls to action.
- Reference headline: "Engineering intelligence for critical operations". Treat as draft copy for homepage review.
- Reference CTAs: "Explore capabilities" and "Discuss a requirement".
- Four image-led capability tiles with simple icons, concise summaries and clear links.
- A connected visual sequence for Sense -> Connect -> Understand -> Act.
- Rail, emergency-response and energy/infrastructure routes; evidence and real customer material.
- Use the current Apexiar brand assets. The reference does not authorise replacing the logo, inventing a unified dashboard, or claiming deployed sensing/drone products.
- Prefer supplied operational photography and actual product screenshots. Avoid generic AI imagery and generic agency language.
- Reference navigation labels are inspiration; final navigation must fit the approved information architecture and only point to existing destinations.

### Protected motion: rising glowing pixels

The current upward-moving glowing particles are explicitly valued by the user and must remain on the redesigned homepage.

- Existing implementation: `createParticleSystem` in `script.js`; `heroParticles` and `bentoParticles` containers in `index.html`; `.particle`, hero and showcase rules in `styles.css`.
- Preserve the recognisable upward motion and blue/gold glow. Reuse the implementation rather than add an animation library.
- Keep homepage particles when the product grid moves. Retain or re-home the gold particle layer around the capability area, and preserve blue hero particles.
- The Software page can reuse the effect independently. Do not create duplicate IDs within a page.
- Decorative layers must not block controls or obscure text. Check mobile performance and provide reduced-motion behaviour while retaining the normal effect for other users.
- Acceptance requires visual comparison at desktop, tablet and mobile sizes; a source-code check alone is insufficient.

## Architecture and proposed routes

Remain within static HTML, shared `styles.css`, shared `script.js` and the existing Node preview server. No React migration, new framework, CMS, build system or production dependency.

| Destination | Proposed URL | Status |
| --- | --- | --- |
| Homepage | `/` and existing `/index.html` | Accepted for progression; protected content retained |
| Software & Intelligence | `/software-intelligence.html` | Accepted by user; agent browser/device QA outstanding |
| Connected Systems | `/connected-systems.html` | Accepted for progression; agent browser/device QA outstanding |
| Aerial Intelligence | `/aerial-intelligence.html` | Accepted by user; browser/device QA outstanding |
| Advisory & Deployment | `/advisory-deployment.html` | Accepted by user; browser/device QA outstanding |
| Capabilities overview | `/capabilities.html` | Accepted by user; browser/device QA outstanding |
| Rail | `/sectors/rail.html` | Accepted for progression; homepage route connected; browser/device QA pending |
| Fire & Emergency Response | `/sectors/fire-emergency-response.html` | Accepted by user; homepage route connected; browser/device QA pending |
| Energy & Infrastructure | `/sectors/energy-infrastructure.html` | Accepted for progression; homepage route connected; browser/device QA pending |
| Existing services overview | `/services.html` | Retain |
| Insights | `/blog.html` and existing `/blog/*.html` | Retain URLs; label may change |
| Products | Existing `/products/*.html` | Retain every URL |
| Contact and policies | Existing root HTML pages and downloads | Retain |

Phase 4 precedes sector page creation. During Phase 4, sector routes must use working homepage sections and existing relevant content links. Switch to the dedicated sector pages only after Phase 5 verification. Do not publish links to missing pages.

Keep homepage `#about` and a meaningful `#products` compatibility destination. During navigation migration, existing `index.html#products` links must continue to lead visitors to the Software portfolio. URL fragments cannot be redirected by server rules alone.

## Content-migration map

All rows start as not started unless explicitly retained. Copy destination content first; remove from the homepage only in Phase 4 after verification. "Consolidate" means organise existing material, not discard or silently rewrite it.

| ID | Existing content | Current location | New destination / treatment | Homepage replacement | Status |
| --- | --- | --- | --- | --- | --- |
| M01 | Software-led hero, subtitle and product/demo CTAs | `index.html` hero | Preserve original copy on Software page alongside concise capability introduction | New company-wide hero and capability/enquiry CTAs | Original software copy retained on Software; new applied-technology homepage hero ready for review |
| M02 | Blue rising glowing pixels and hero glow | Homepage `heroParticles`; shared CSS/JS | Retain on homepage; reuse on Software page as appropriate | Adapt existing effect to new hero | Original heroParticles ID and shared blue-pixel implementation retained; browser comparison pending |
| M03 | Gold rising particles around product showcase | Homepage `bentoParticles` | Reuse on Software page; keep equivalent homepage layer | Capability-area particle layer | Original bentoParticles ID and shared gold-pixel implementation re-homed around capability tiles; browser comparison pending |
| M04 | Cyber Essentials and ICO badges | Homepage trust strip | Retain with accurate assurance wording; reuse where useful | Assurance strip; no expanded certification claims | Certified & Compliant strip, label and both badge images retained verbatim on homepage |
| M05 | Complete nine-image product tile grid | Homepage `.showcase-bento` | Software page, intact names, images, descriptions and links | Four capability tiles | All nine original tile blocks verified unchanged on Software before removing full grid from homepage; four capability cards replace it |
| M06 | Complete nine detailed product cards, icons and descriptions | Homepage `#products` / `.ecosystem` | Software page `#products`; preserve separately from image grid | Selected technology links plus working legacy anchor | Complete detailed portfolio section verified unchanged on Software; homepage #products now selected technology links plus complete portfolio route |
| M07 | Atom tile and detailed card | Both homepage collections | Software portfolio; existing Atom detail page remains | Candidate featured technology link | Both original entries preserved on Software; Homepage feature replaced by Axis at user request; Atom portfolio entries, footer link and product URL retained |
| M08 | Artemis tile and detailed card | Both homepage collections | Software portfolio; existing Artemis detail page remains | Candidate featured technology link | Both original entries preserved on Software; Artemis remains a featured homepage link; product URL unchanged |
| M09 | Axis, AMIS, Assure, Prism, Aspire and Atlas tiles/cards | Both homepage collections | Software portfolio and existing product detail URLs | Selected links only, no full catalogue | All original tiles/cards preserved on Software and product pages unchanged; Prism also featured on homepage |
| M10 | AMIS Customer tile and detailed card | Both homepage collections | Software portfolio; retain `contact.html` destination | No replacement required | Original tile/card and contact destination preserved on Software |
| M11 | Video, poster, three overlay messages and timing | Homepage `.video-reel` | Retain complete video section on homepage and Software, including poster, messages and timing | Original video retained immediately below sector strip | Complete homepage video section retained verbatim: source, poster, attributes and three timed messages; shared sync script unchanged |
| M12 | Company mission and about content | Homepage `#about` | Retain complete Built for Regulated Industries section on homepage, including mission and statistics; Software copy also retained | Original section retained | Complete Built for Regulated Industries section retained verbatim, including original mission and statistics; Software copy retained |
| M13 | 242+ sites, 4+ sectors, 99.9% uptime, enterprise SLA | Homepage `.about__stats` | Retain; strengthen presentation only after evidence review | Evidence block; no invented or increased statistics | All four existing statistics retained verbatim; no increased or invented values |
| M14 | Expertise introduction, globe and decorative artwork | Homepage `.expertise` | Preserve full expertise on Software; retain original globe/horizon and canvas animation on homepage | Connected operating model with original glowing horizon | Complete original expertise section verified unchanged on Software; exact original globe markup and shared CSS/canvas retained on homepage operating model |
| M15 | AI, AI Agents, Automation, Data Insights, Machine Learning cards | Homepage expertise | Group on Software page; preserve copy and all imagery initially | Sense -> Connect -> Understand -> Act | Full original expertise cards verified unchanged on Software; homepage uses connected operating model |
| M16 | Consultancy card and service detail | Homepage expertise; `services.html` | Advisory & Deployment; retain Services source until destination verified; cross-link Software expertise | Short advisory capability summary | Original consultancy expertise retained on Software; full service preserved on Advisory and Services; homepage capability link added |
| M17 | Four "Why Apexiar" benefits | Homepage `#why-apexiar` | Preserve full software benefits on Software page | Company-wide assurance/evidence supported by current material | Complete original benefits section verified unchanged on Software; legacy homepage #why-apexiar retained with explicit link to Software benefits |
| M18 | Gavin Thomas / Rail Fleet Services testimonial, attribution and logo | Homepage `.testimonial-break` | Retain on homepage, intact | None; place within customer evidence | Full original testimonial, attribution and logo retained verbatim on homepage |
| M19 | Discover -> Configure -> Deploy and descriptions | Homepage `.how-it-works` | Preserve on Software page; reference from Advisory where relevant | Discover -> Engineer -> Validate -> Deploy with reviewed copy | Complete original three-step process verified unchanged on Software; homepage uses Discover / Engineer / Validate / Deploy |
| M20 | Final software ecosystem CTA | Homepage `.cta-section` | Preserve on Software page | Company-wide requirement/contact CTA | Original software CTA verified unchanged on Software; homepage uses company-wide requirement CTA |
| M21 | Services introduction, six full cards and CTA | `services.html` | Retain page and full content; link to capability pages | Capability summaries | Retained; unchanged |
| M22 | Bespoke software service | Services | Also surface on Software page | Software capability summary | Destination accepted by user; source parity/link checks passed; agent browser/device QA outstanding; source retained |
| M23 | Systems integration service | Services | Also surface on Connected Systems | Connected Systems capability summary | Complete source card copied exactly; source retained; accepted for progression; browser/device QA outstanding |
| M24 | Deployment, support, training, consultancy services | Services | Also surface on Advisory & Deployment | Advisory capability summary | Four complete service cards copied verbatim to Advisory; source Services retained; accepted by user; browser QA pending |
| M25 | All product sections, screenshots, videos, mock-ups, CTAs and downloads | Eight `/products/*.html` pages | Retain existing URLs and content | Link from Software; selected homepage links | Retained; unchanged; Rail links to Atom/Artemis/Axis; Fire links to Prism/AMIS; Energy links to Artemis/Axis; all detail pages retained |
| M26 | Six articles and listing | `blog.html`; `/blog/` | Retain under Insights navigation label | Feature selected articles/case studies | Retained; unchanged |
| M27 | Contact form, email, hours and location | `contact.html` | Retain; inspect actual enquiry routing before source tagging | Final contact CTA | Retained; unchanged |
| M28 | Privacy, cookies, carbon page/PDF and 404 content | Root HTML and `/assets/` | Retain; track existing defects separately | Footer links | Retained; 404 root-relative recovery links/skip link/noindex corrected; legal text unchanged pending consent reconciliation |
| M29 | Header/footer links, software company description and metadata | Repeated across HTML pages | Preserve useful software wording on Software page before corporate revision; update consistently in Phase 6 | Complete navigation once destinations exist | All 30 desktop/mobile headers and footers standardised; original footer copy preserved on Software; corporate schema updated; unique titles/descriptions reviewed; 29 canonical routes in sitemap; all 60 Software header links now open the page top (user verified) |
| M30 | All 69 original assets, including four unreferenced files | `/assets/` | Keep filenames/paths; verify references before any later relocation | Reuse relevant assets | All original assets preserved; both earlier and revised railway comparison pairs retained; 88 assets total |
| M31 | User-supplied turbine inspection clip | Desktop/website images | Add paused scroll-controlled homepage sequence after operating model; retain source | Additive; no existing section replaced | Stronger zoom approved and integrated; seven tests and targeted Edge desktop/phone/tablet review passed; physical-device and accessibility/fallback review outstanding |
| M32 | Supplied visible and thermal railway illustrations | Desktop/website images | Add full-frame native comparison after Aerial Intelligence thermal explanation; preserve originals | None; homepage unchanged | Revised pair integrated at neutral exposure; prior images retained; six tests, alignment and Edge desktop/tablet/phone emulation passed; physical touch and remaining accessibility/loading QA open |

### Product preservation checklist

Image paths below are relative to `assets/Design/`. The detailed portfolio includes the same offerings with different descriptions and inline SVG icons; those descriptions/icons must also be retained.

| Product | Current tile image | Existing destination | Phase 2 parity verified |
| --- | --- | --- | --- |
| Atom | `atom-telemetry.jpg` | `products/atom.html` | Yes: exact HTML for both card collections; user reviewed; agent browser/device QA outstanding |
| Artemis | `artemis1.webp` | `products/artemis.html` | Yes: exact HTML for both card collections; user reviewed; agent browser/device QA outstanding |
| Axis | `Axis1.webp` | `products/axis.html` | Yes: exact HTML for both card collections; user reviewed; agent browser/device QA outstanding |
| AMIS | `audit1.webp` | `products/amis.html` | Yes: exact HTML for both card collections; user reviewed; agent browser/device QA outstanding |
| Assure | `Assure1.webp` | `products/assure.html` | Yes: exact HTML for both card collections; user reviewed; agent browser/device QA outstanding |
| Prism | `prism-fire-safety.jpg` | `products/prism.html` | Yes: exact HTML for both card collections; user reviewed; agent browser/device QA outstanding |
| Aspire | `aspire-dashboard.png` | `products/aspire.html` | Yes: exact HTML for both card collections; user reviewed; agent browser/device QA outstanding |
| Atlas | `prism-dashboard.jpg` | `products/atlas.html` | Yes: exact HTML for both card collections; user reviewed; agent browser/device QA outstanding |
| AMIS Customer | `amis-customer.jpg` | `contact.html` | Yes: exact HTML for both card collections; user reviewed; agent browser/device QA outstanding |

Preserve the Atlas image reference initially despite its filename; confirm its content before proposing a substitution. AMIS Customer has no dedicated product page. Do not invent one as part of migration.

## Six-phase implementation and review gates

| Phase | Scope | Status | Exit gate |
| --- | --- | --- | --- |
| 1 | Protect and prepare | Accepted | Baseline, branch, commands, migration map, design brief and tracker recorded; homepage untouched |
| 2 | Software & Intelligence | Accepted by user; agent browser/device QA outstanding | Two nine-card collections preserved, software content mapped, links/responsive behaviour verified; user review |
| 3a | Connected Systems | Accepted for progression; browser/device QA outstanding | Accurate reviewed content and relevant product links; page QA and user review |
| 3b | Aerial Intelligence | Accepted by user; browser/device QA outstanding | Confirmed services/imagery; page QA and user review |
| 3c | Advisory & Deployment | Accepted by user; browser/device QA pending | Existing services preserved and clearly organised; page QA and user review |
| 3d | Capabilities overview | Accepted by user; browser/device QA outstanding | Four working capability routes; page QA and user review |
| 4 | Homepage | Accepted for progression; browser/device QA outstanding | All capability destinations exist; migration checks pass; particles, testimonial and evidence retained; visual approval |
| 5 | Sector pages | Accepted for progression; browser/device QA outstanding | Review Rail, Fire & Emergency Response, Energy & Infrastructure individually; only valid underlying links |
| 6 | Navigation, metadata and QA | Implementation ready for review; automated checks passed; browser/release checks open | Site-wide regression review and final disposition inventory; release approval separate |

### Phase 1: protect and prepare

- [x] Inspect repository and current instructions.
- [x] Check Git status; original website has no uncommitted source changes.
- [x] Create `website-restructure` branch.
- [x] Make deliberate baseline commit `f1e4fe6`, including existing `AGENTS.md`.
- [x] Record preview commands and deployment limitations.
- [x] Record migration map, reusable patterns and protected motion.
- [x] Establish tracking and focused-chat handoff procedure.
- [x] User accepted preparation and authorised Phase 2 with "ok lets go".

### Phase 2: Software & Intelligence only

- Create `software-intelligence.html` using the existing design system.
- Add a concise hero and introduction, preserving the old software-led copy in the new page's content.
- Copy both product collections intact; retain every product name, image, description, category, icon and destination.
- Organise the existing software expertise, benefits, video and onboarding material around the portfolio. Record any deferred migration explicitly.
- Do not remove homepage content or update site-wide navigation in this phase. A temporary duplicate is intentional until Phase 4.
- Keep all eight individual product URLs operational and the AMIS Customer enquiry route unchanged.
- Verify parity programmatically where practical, plus visual checks at desktop/tablet/mobile widths and keyboard operation.
- Show the diff and update migration statuses to "destination verified; source retained" only after checks pass. Stop for review.

### Phase 3: other capabilities, one at a time

Build Connected Systems, then Aerial Intelligence, then Advisory & Deployment, then the overview. Complete and review each before starting the next.

Use existing telemetry/integration material for Connected Systems and existing consultancy/deployment/training/support material for Advisory. Request factual input where the repository cannot establish actual offerings. Do not generate four interchangeable generic pages.

### Phase 4: homepage

Begin only after Phase 2 and all Phase 3 destinations have passed review. Proposed order:

1. Apexiar hero, based on the reference direction, with preserved rising pixels.
2. Sector strip, then the complete original video immediately below it.
3. Four capability tiles, operating model with original glowing horizon, and Certified & Compliant strip.
4. Complete original Built for Regulated Industries section, mission and statistics.
5. Three sector routes, initially using valid in-page/existing destinations until Phase 5.
6. Selected technologies, including candidate Atom and Artemis links, not the complete catalogue.
7. Customer evidence and selected case studies, retaining the full existing testimonial.
8. Discover -> Engineer -> Validate -> Deploy.
9. Final contact CTA.

Remove a homepage section only after its migration row records verified destination parity. Keep legacy anchors useful. Retain real product/corporate imagery and the blue/gold motion language.

### Phase 5: sectors

Build and review each sector separately. Compose the pages from relevant capability summaries, evidence and links rather than duplicate all product detail.

Rail may link to Atom, TrainNode, TrackNode, aerial vegetation management and advisory only where the underlying offering, approved content and destination exist. The subsequently supplied rail brochure now establishes Train Node, Track Node and aerial vegetation-management content; use RAIL-BROCHURE-SOURCE.md and preserve development qualifications. Do not fabricate specifications or dead-end URLs. Any new product page needs explicit scope agreement.

### Phase 6: navigation, metadata and QA

- Update desktop/mobile headers and footers after all target pages exist; retain access to Products through Software & Intelligence.
- Review titles, descriptions, canonical URLs, social metadata, structured data, sitemap and old product-count wording.
- Check every internal page/fragment/product/download/asset link, including case-sensitive paths and nested 404 behaviour.
- Check image loading, alt text, headings, focus, keyboard menus, contrast, reduced motion and responsive layouts.
- Check enquiry form behaviour and source tagging. Current code uses Web3Forms; no CRM integration is established in the repository. Confirm destination/field requirements before adding CRM claims or integration.
- Do not send live test enquiries without authorisation; validate locally/mocked where possible.
- Run all configured build/lint/test commands. Currently none exist: report this accurately and run available syntax, serving and link checks. Do not invent a successful build or introduce a build system merely to tick a box.
- Visually review every changed page and representative unchanged product/article pages affected by shared CSS/JS changes.
- Produce a final retained/moved/rewritten/removed inventory against M01-M30. Removed content must be zero unless explicitly approved and recorded.
- Deployment is a separate authorised action after review; do not deploy from this plan alone.

## Reusable implementation and asset baseline

- `styles.css`: black/navy and gold/blue tokens, Inter typography, containers, buttons, heroes, both product grids, features, steps, testimonials, services, forms, blog/legal pages and screenshot layouts.
- `script.js`: mobile navigation/focus handling, scroll styling, reveal animations, counters, globe, particle systems, video text timing and cursor glow.
- Header/footer are repeated HTML, not templates. Do not add a framework to share markup. Review all copies in Phase 6.
- Existing product pages use both HTML/CSS dashboard mock-ups and real screenshots. Shared `.prism-*` classes also serve other product pages; avoid broad renames.
- Content lives in HTML. Contact handling lives partly inline in `contact.html`. Preserve YouTube demos on AMIS and Artemis.
- Asset inventory: 69 files = 44 JPG + 14 WebP + 4 PNG + 6 PDF + 1 MP4. This corrects the arithmetic slip in the initial audit prose.
- Preserve four unreferenced files: `assets/Atlaslogo.webp`, `assets/Design/Expertise/our expertise.png`, `assets/Design/Artemis/artemis-asset-insights.jpg`, `assets/Design/Artemis/artemis-customisable-reporting.jpg`.

## Preview, checks and deployment

| Purpose | Existing command / process |
| --- | --- |
| Local preview | `npm run dev`, `npm start`, or `node server.js` |
| Default URL | `http://localhost:4173` |
| Alternate port (PowerShell) | Set `$env:PORT = '4187'`, then run `npm run dev` |
| Shared script syntax | `node --check script.js` |
| Server syntax | `node --check server.js` |
| Whitespace | `git diff --check`; include explicit inspection of newly added/untracked files |
| Build, lint, automated tests | No scripts configured in `package.json`; no dependencies declared |
| Deployment | `vercel.json` supplies legacy redirects; no deployment command, CI workflow or project linkage is recorded locally |

The local server does not emulate Vercel redirects: `/services` returns 404 locally while `/services.html` works. Preserve the configured redirects and verify hosting behaviour separately when deployment access is established. Do not assume `vercel --prod` or a Git push is the approved process.

For implementation phases, test desktop (for example 1440px), tablet (768px) and mobile (390px and a narrow 320px check), including breakpoint transitions around 640px and 960px for product tiles. Record actual browsers/viewports, results and evidence in the progress log. A breakpoint declaration is not a visual pass.

## Known issues and factual inputs

| ID | Finding / input | Planned handling | Status |
| --- | --- | --- | --- |
| I01 | Missing Atlas and Assure brochure PDFs | Supply actual brochures or approve a truthful fallback; preserve links during initial migration and report known failures | Fixed broken CTA: Request Brochure now links to Contact; original missing PDFs still unavailable |
| I02 | Prism menus point to absent `#features` | Correct in approved QA/navigation scope | Resolved by consistent product route in desktop/mobile navigation; no absent fragment links remain |
| I03 | Relative paths in 404 fail for nested missing URLs | Correct and test nested error paths in Phase 6 | Resolved; nested 404 HTTP/path checks passed |
| I04 | Atom absent from most footers; inconsistent Home/About/Products/Features navigation | Standardise in Phase 6 | Resolved across 30 pages; all eight product pages and AMIS Customer in footer |
| I05 | "Seven products" metadata; sitemap missing Atom, carbon page and two articles; homepage canonical/sitemap discrepancy | Correct metadata/discovery in Phase 6 | Resolved; outdated count removed and 29 canonical routes indexed |
| I06 | AMIS/Assure/Aspire positioning overlaps; Atlas tile image name suggests mismatch | Confirm semantics/imagery before rewriting or replacing | Open |
| I07 | Cookie policy names `apexiar_consent`, implementation not found; Analytics initialises directly | Consent implementation and factual policy notes added; user verified acceptance; remaining consent-state/network checks pending | Partially resolved |
| I08 | 404 lacks skip link; heading-level gaps; no reduced-motion handling found | Address relevant changed components and final QA | 404 skip link/footer headings/focus and reduced-motion guards implemented; full visual/accessibility review pending |
| I09 | `.gitignore` contains null bytes; Atom brochure is about 23.7 MB | Separate reviewed housekeeping/optimisation; no deletion or silent PDF replacement | Open |
| I10 | Actual Connected Systems hardware, Train Node / Track Node details | User supplied rail brochure; pages 4-5 reviewed and implemented with development/approval qualifications. See RAIL-BROCHURE-SOURCE.md | Source supplied; Connected Systems accepted for progression |
| I11 | Aerial services, deliverables, operating scope and photography | Brochure pages 2-3 supply Gen 1, Gen 2 and application detail; preserve status distinctions and request original aircraft/interface imagery | Phase 3b accepted by user; browser/device QA outstanding |
| I12 | Source and period for deployment statistics and assurance claims | Preserve existing values; confirm evidence before strengthening claims | Open |
| I13 | CRM/source-tagging fields and deployment access/process | Confirm before integration/release work | Web3Forms mocked checks passed and user confirmed live email receipt; no CRM/source tagging configured; deployment not authorised |

## Progress log

### 20 September 2026: audit (preceding planning task)

- Scope: read-only repository audit; 22 HTML pages and 69 assets inventoried.
- Checks: local reference/fragment scan; 95 existing pages/assets/support files returned HTTP 200; `/` returned 200; missing brochures returned 404; shared/server and inline JavaScript syntax passed; metadata/headings/alt/duplicate-ID inspection completed.
- Limits: no browser visual QA, no form submission, no external-service/deployment verification, no binary-media visual review.
- Files changed: none during audit. The earlier supplied `AGENTS.md` was already present and untracked.

### 20 September 2026: Phase 1 preparation

- Checked instructions, Git state, package/deployment configuration and particle hooks.
- Created `website-restructure`; committed the existing website baseline and supplied instructions as `f1e4fe6`.
- Added this control document and an `AGENTS.md` pointer so separate chats find the current plan.
- Incorporated the user's reference direction, protected pixels, homepage testimonial retention, six phases and page-by-page review gates.
- Reconciled Phase 2 "move" with "do not change homepage": copy first, verify, remove source only in Phase 4.
- Reconciled Phase 4 sector links with Phase 5 creation: valid in-page routes first, dedicated sector URLs later.
- Validation: `git diff --check`, `node --check script.js` and `node --check server.js` passed. An in-memory document check confirmed 30 unique ordered migration IDs, the AGENTS pointer, and no null bytes or trailing whitespace in either planning file. Git comparison with the baseline confirms no website implementation changes. No build/lint/test scripts exist; browser/device checks are not applicable to this documentation-only task.
- Next: user review of the control document, then a focused Phase 2 task.

### 20 September 2026: Phase 2 implementation

- Starting state: branch website-restructure; pre-existing planning edits in AGENTS.md and untracked WEBSITE-RESTRUCTURE-PLAN.md. No implementation changes were present.
- Added software-intelligence.html and software-intelligence.css. No existing HTML, CSS, JavaScript, product page, asset or dependency was modified.
- New page: dedicated title/social metadata/canonical, software hero and introduction, complete bespoke service card, nine image tiles, nine detailed portfolio cards, video, about/statistics, complete expertise, four benefits, onboarding and final CTA. Customer testimonial remains on the homepage.
- Preserved heroParticles and bentoParticles with existing shared script. New page-only CSS adds layout, visible card focus outlines, small-screen spacing and reduced-motion presentation; noscript fallback reveals existing fade-in content.
- Exact source parity passed for both nine-card collections (including names, categories, images, alt text, descriptions, icons and links), video, about/statistics, expertise, benefits, onboarding, CTA and the bespoke service card.
- New-page reference check passed for 77 local references, including fragment targets. Checked unique IDs, one H1, main/skip destination, image alt attributes, new metadata, executable inline JavaScript and structured JSON.
- HTTP smoke test: all 97 existing/new HTML, asset and support files returned 200; root returned 200. Existing Atlas/Assure brochure targets still return 404 and are tracked as I01; no new broken local references were introduced.
- Confirmed all 99 existing tracked implementation/asset files match baseline f1e4fe6 (normalising Git checkout CRLF/LF for text, comparing binary assets exactly). An initial raw-byte text comparison detected checkout line endings; the corrected comparison and Git diff confirm no source changes.
- node --check script.js, node --check server.js, git diff --check and explicit new-file whitespace/encoding checks passed. No build/lint/test commands are configured.
- Browser blocker: computer-use discovery returned no browser and an empty browser/app inventory. Desktop (1440px), tablet (768px), mobile (390px/320px), breakpoint transitions, keyboard/menu, image rendering, video synchronisation and live particle/reduced-motion behaviour have NOT been visually tested. CSS source inspection is not a visual pass. No browser tooling or dependency was installed.
- Phase 2 remains in progress pending that QA and user review. Migration rows record source parity separately from visual verification; no homepage source removal is authorised yet.
- Diff: two added page files plus this tracker update. AGENTS.md changes predate this task. No commits, pushes or deployment.
- Next: complete browser QA and review this page before starting Connected Systems.

### 20 September 2026: Phase 2 user approval

- User reviewed Software & Intelligence and confirmed: "i have reviewed, all looks good".
- Phase 2 is accepted. Updated the route status, phase tracker and migrated-content/product checklist entries to record that review.
- The user did not specify tested devices or interactions. Agent-run desktop/tablet/mobile, keyboard/menu, video and motion checks remain outstanding; no unperformed test is marked passed.
- Homepage source content remains intact. This approval does not authorise removing it before Phase 4, or committing/deploying changes.
- Files changed in this task: WEBSITE-RESTRUCTURE-PLAN.md only. Documentation consistency and whitespace checks passed; no runtime tests required for this status-only update.
- Next bounded implementation task: Phase 3a, Connected Systems. No capability page was started in this approval-recording task.

### 20 September 2026: Phase 3a Connected Systems

- User authorised the next bounded phase with "lets go" after accepting Phase 2.
- Starting branch: website-restructure. Existing uncommitted files: AGENTS.md planning pointer, WEBSITE-RESTRUCTURE-PLAN.md, software-intelligence.html and software-intelligence.css. These were preserved.
- Added connected-systems.html and connected-systems.css. Updated this control document. No existing page, shared stylesheet/script, asset, dependency or configuration changed.
- Page structure: telemetry-led hero with actual Atom dashboard and existing blue particles; Sense/Connect/Understand/Act sequence; Atom and Axis product routes with real screenshots; systems integration; rail engineering project; requirement/contact CTA.
- Source mapping: Atom product page supports telemetry/status/maps/alerts/replay/data-health summaries; Axis supports fault records, optional sensor feeds, documentation and repair guidance; the full Systems Integration card from services.html is copied exactly; the March 2026 telemetry article supports the project story, explicitly described as design-and-build work rather than a completed deployment.
- M23 destination created; original services card retained. Product detail and article pages stay at their existing URLs. The approved Software page is linked, not rewritten. Global navigation remains unchanged pending Phase 6.
- Asked for optional TrainNode/TrackNode confirmation and approved details; no response received during implementation. Proceeded with existing documented scope. No new hardware claims, specifications, generic imagery, or placeholder product routes.
- Checks passed: all 50 new-page local references/fragments; unique IDs and ARIA references; one H1 and main landmark; image alt attributes; page-specific title/canonical/social metadata; inline JavaScript/structured JSON; exact integration-card preservation; new-file whitespace/encoding.
- Preservation checks passed: 99 tracked implementation/asset files still match baseline f1e4fe6 after normalising text checkout line endings; approved Software HTML/CSS match pre-task SHA-256 hashes exactly.
- HTTP checks: all 99 current HTML, assets and support files returned 200. Existing local preview serves /connected-systems.html with 200.
- node --check script.js, node --check server.js and git diff --check passed. No build, lint or test scripts are configured.
- Browser discovery again returned no browsers/apps. Desktop, tablet, mobile, keyboard/navigation, image rendering and live animation/reduced-motion checks remain unperformed. Responsive CSS has 640px and 960px layouts but those declarations are not a visual test result.
- Diff summary: added Connected Systems HTML and page-only CSS; updated tracker/M23/I10. No source content removed, no dependency added, no commit/push/deployment.
- Review status: ready for user content review; agent browser/device QA pending. Stop at Phase 3a; do not start Aerial Intelligence until review and factual inputs are available.

### 20 September 2026: Phase 3a rail brochure update

- User supplied Desktop/New brochures/APEXIAR TECHNOLGIES - Rail.pdf as the missing detail and offered original images if needed.
- Read and rendered all seven pages; visually inspected every page. Added RAIL-BROCHURE-SOURCE.md with page-level provenance, future-phase content mapping, development caveats and image extraction details.
- Updated Connected Systems with Train Node, Track Node and connected asset telemetry. Preserved existing telemetry/platform/integration/project sections, imagery and product URLs.
- Train Node names follow the brochure's spaced form; first-generation testing, end-2026 validation/approval targets and Q1 2027 market-testing plan remain explicit. Track Node final configuration remains subject to development/trials/approval. Optional and future sensing remain distinguished.
- Extracted three original embedded JPEG streams, visually inspected them and added them under assets/Design/Connected. Labelled sensor visuals as brochure illustrations and repeated the HVAC concept/asset-validation caveat in HTML. No original asset was modified or removed.
- Temporary PDF reading/rendering tooling was downloaded to the system temporary directory after network escalation; no repository package/dependency files changed. Original PDF unchanged; no public brochure download added.
- Brochure pages 2-3 and 6-7 now supply the next aerial/advisory phases; neither page is started by this update. Original larger renders and actual aircraft/payload photography would improve later hero imagery.
- Checks passed: 56 local references/fragments; unique IDs and ARIA targets; alt attributes; inline JavaScript/JSON; explicit development/approval/concept qualifiers; exact integration-card preservation; all 99 baseline implementation/assets unchanged and accepted Software hashes unchanged; all three extracted asset bytes match source JPEG streams; whitespace/encoding; script/server syntax. All 102 site HTML/assets/support files returned HTTP 200. No build/lint/test scripts exist. Brochure render/images were visually inspected; website browser/device QA remains outstanding. No commit or deployment.

### 20 September 2026: supplied image folder update

- User supplied C:/Users/Ryanw/Desktop/website images. Inspected all 12 files visually and recorded dimensions, matches and phase destinations in RAIL-BROCHURE-SOURCE.md.
- Matched higher-resolution Train Node (1672 x 941) and Track Node (1694 x 929) originals to the brochure. Added train-node.webp and track-node.webp under assets/Design/Connected at native dimensions, using WebP quality 90 without cropping or generative edits.
- Updated only the two sensor image references/dimensions in connected-systems.html. Existing alt text/captions and development qualifications remain. Retained all source files and brochure JPEGs; no content removed.
- Combined images: 450,182 bytes versus 5,413,809 bytes for source PNGs (about 92% smaller). Visually inspected both encoded outputs.
- Remaining folder images are inventoried for later phases, not imported or published. Four 256px-wide files need larger originals for detailed display: command station, thermal application, standalone Fire Node and wildfire application. Re-engineering image is a complete brochure-page composite. No higher-resolution standalone HVAC replacement was found.
- Checks passed: all 56 local references/fragments; correct image dimensions; retained brochure assets; page and both WebP files return HTTP 200 with correct MIME types; git diff --check. No build/lint/test scripts exist. Page-level browser/device QA remains outstanding; image inspection is not a page-layout test.
- Files changed: connected-systems.html, two new WebP assets, RAIL-BROCHURE-SOURCE.md and this tracker. Homepage, styles and scripts unchanged. No dependency change, commit or deployment. Phase 3a remains awaiting review.

### 20 September 2026: larger image quality review

- Inspected four files in Desktop/website images/large. Command station is 1672 x 941; thermal application, standalone Fire Node and wildfire application are each 1536 x 1024. All are materially clearer than the earlier 256px-wide files.
- Updated RAIL-BROCHURE-SOURCE.md and the current handoff to close the outstanding request for larger originals. These remain source candidates for later phases; no page or public asset changed.
- Checks: PNG dimensions read from file headers and all four images visually inspected. Documentation whitespace checks passed. Runtime/layout tests not applicable to this source-review-only task. No commit or deployment.

### 20 September 2026: Phase 3b Aerial Intelligence

- Following the phase handoff, the user said "ok lets go". Recorded Connected Systems as accepted for progression to Phase 3b; this does not mark outstanding agent-run visual/device tests passed.
- Added aerial-intelligence.html and aerial-intelligence.css. Reused shared navigation, buttons, design tokens and blue rising-particle implementation. No existing page, shared CSS/JS, product URL or dependency changed.
- Content: aircraft/payload integration, turnkey inspection, rapid-response/emergency call-off, client-aircraft data integration; operational Gen 1 Matrice 400/H30T configuration; Gen 2 development; long-term South Wales UAV manufacturing direction; vegetation/workbank, OLE/mast, clearance/condition and incident-response applications; thermal illustration; explicitly labelled security concept; related capability links and contact CTA.
- Source: rail brochure pages 2-3 for services, applications and programme maturity; supplied drone photo and larger thermal illustration. No range, flight duration, accuracy, approval, response-time or deployment-performance claim added from image labels.
- Added four assets under assets/Design/Aerial: original supplied drone.jpg (1290 x 860), directly extracted vegetation-interface.jpg/security-concept.jpg (each 799 x 380), and thermal-interface.webp (1536 x 1024, quality 90, 181,704 bytes versus 2,112,926-byte supplied PNG). Original files remain intact; no generative image edits. Brochure interface captions and thermal readings are explicitly illustrative.
- Migration impact: additive capability page, with existing source content retained. M30 inventory now 78 assets. Command-station, Fire Node and wildfire visuals remain reserved for a relevant later phase; no unverified product capabilities inferred from them.
- Checks passed: all 47 new-page local references/fragments; unique IDs, ARIA references, H1/main and alt attributes; title/canonical/social metadata; inline JavaScript/JSON; maturity/concept labels; source-preservation hashes for homepage, shared CSS/JS, Software HTML/CSS and Connected HTML/CSS. HTTP 200 for all 110 current HTML/assets/support files.
- node --check script.js, node --check server.js, git diff --check and new-file whitespace checks passed. No build/lint/test commands configured.
- Inspected the image assets visually, including the encoded thermal image. Browser inventory returned no browsers/apps; page-level desktop/tablet/mobile, keyboard/menu, animation and reduced-motion QA remain unperformed. CSS includes responsive layouts but is not a substitute for visual QA.
- Diff: new Aerial HTML/CSS and four assets; tracker and source-note updates. No source section removed, no commit/push/deployment.
- Stop at Phase 3b for review. Next phase after acceptance: Advisory & Deployment, including the brochure's re-engineering/lifecycle and collaborative-development material.

### 20 September 2026: Phase 3b user approval

- User reviewed Aerial Intelligence and responded "love it !". Recorded Phase 3b as accepted and updated the route/phase tracker and I11.
- Browser/device/interaction checks remain outstanding; user approval does not claim those agent-run checks were completed.
- Only WEBSITE-RESTRUCTURE-PLAN.md changed in this task. Status consistency, migration-row count and whitespace checks passed. No runtime changes, commit or deployment.
- Next bounded task: Phase 3c Advisory & Deployment. No new phase started in this approval-recording task.

### Template for each subsequent task

- Date / phase / bounded task:
- Starting branch and Git state:
- Files changed:
- Migration rows advanced and parity evidence:
- Checks run, viewport/browser evidence and results:
- Checks not run and reason:
- Known issues / deviations / required input:
- Review status and next action:
- Commit/deployment references, only if authorised:

## Focused-chat handoff

Start each new phase/page chat with:

> Read AGENTS.md and WEBSITE-RESTRUCTURE-PLAN.md. Inspect Git status and the files relevant to Phase [number/page]. Implement only that phase/page, preserving the migration map and protected rising particles. Update the tracker and progress log with actual checks, show the resulting diff, and stop for review. Do not commit or deploy unless requested.

Original Phase 2 task (implemented; visual QA still pending):

> Implement Phase 2 only: Software & Intelligence. Copy both existing nine-product collections intact into software-intelligence.html, preserve all names/images/descriptions/icons/links and existing product URLs, and organise the mapped software content using the current design system. Keep the homepage unchanged. Do not introduce dependencies. Verify responsive behaviour, content parity and links, record known pre-existing failures separately, update the plan, and show the diff for review.


### Phase 3c: Advisory & Deployment implementation - 20 September 2026

- Authorisation: user requested progression with "ok lets go" after accepting Aerial Intelligence. Scope is this page only.
- Added `advisory-deployment.html`, `advisory-deployment.css` and `assets/Design/Advisory/re-engineering.jpg`. Updated this tracker and `RAIL-BROCHURE-SOURCE.md`.
- Brochure pages 6-7 supply precision re-engineering, selected equipment overhaul/lifecycle extension and Conceive / Prototype / Prove / Deploy. No new approval or certification claims.
- Copied all four original Consultancy, Platform Deployment, Training & Onboarding and Ongoing Support & Maintenance cards verbatim, including all descriptions, bullets and icons. Preserved the homepage consultancy summary as the service introduction. Bespoke software and integration remain on existing pages with working capability/service links.
- Reused the existing header, footer, shared script, blue rising hero particles and design variables. Added scoped responsive layouts, focus outlines, semantic headings, image alt/caption, reduced-motion and no-JavaScript visibility. No new dependency, framework, form or CRM change.
- Validation: 113 HTML/CSS/assets/script/robots/sitemap resources returned successful local-preview HTTP responses. New-page local links and fragments, unique IDs, ARIA references, image alt, metadata/script structure and four exact source-card comparisons passed. Both existing JavaScript files passed node --check; git diff --check passed (existing AGENTS line-ending warning only). New files passed whitespace/NUL checks.
- Preservation: SHA-256 comparisons confirmed all 118 pre-task files unchanged before documentation updates. Homepage, approved capability pages, Services, product URLs, shared CSS/JS, existing assets and package configuration remain unchanged. Asset inventory is 79. Nothing deleted, moved out of a source page, committed or deployed.
- Browser limitation: CUA returned no apps or browsers. Desktop/tablet/mobile visual review, keyboard navigation, mobile menu and live particle/reduced-motion checks remain pending; responsive source review is not a visual pass. No build, lint or test scripts exist in package.json.
- Next action: review http://localhost:4173/advisory-deployment.html, then approve Phase 3d Capabilities overview. Stop here at the page review boundary.


### Phase 3c review accepted - 20 September 2026

- User response: "excellent" following the Advisory & Deployment handoff. Recorded content/design acceptance in the route, phase and migration trackers.
- Changed only this control document. No website implementation, assets or dependencies changed; no commit or deployment.
- Validation: checked updated tracker entries and Markdown whitespace. Runtime/build checks not repeated for this documentation-only update. Browser/device QA remains outstanding.
- Next bounded task: Phase 3d Capabilities overview.


### Phase 3d: Capabilities overview implementation - 20 September 2026

- Authorisation: user requested progression with "ok lets go" after accepting Advisory & Deployment.
- Added `capabilities.html` and `capabilities.css`; updated this control document. Four image-led capability cards link to the accepted Software, Connected, Aerial and Advisory pages. Existing imagery is reused without asset changes.
- Added the Sense / Connect / Understand / Act operating model, software portfolio and service links, sector context and requirement CTA. No links to unbuilt sector pages, expanded certification claims or new product specifications. Developing sensing programmes remain distinguished from established platforms.
- Reused existing header/footer, shared script, rising blue particles and design variables. Added page-scoped responsive grids, keyboard focus styling, reduced-motion rules, no-JavaScript visibility, semantic headings and page metadata. Global navigation is unchanged pending Phase 6.
- Migration: additive overview only. M01-M29 source and destination content remains unchanged; no homepage content removed. M30 remains 79 assets; four reused on the overview.
- Checks passed: all four capability card destinations, new-page local links and fragments, unique IDs, ARIA references, image alt attributes, inline JavaScript/JSON-LD structure and whitespace checks. All 115 site HTML/CSS/assets/script/robots/sitemap resources returned successful local-preview HTTP responses. Node syntax checks passed for script.js and server.js. Git diff --check passed with the existing AGENTS line-ending warning.
- SHA-256 comparisons confirmed all 121 pre-task files unchanged before this tracker update. No dependency changes, commits or deployment. No build/lint/test scripts are configured.
- Responsive source reviewed for mobile, tablet and desktop breakpoints. CUA again exposed no browser or app; actual desktop/tablet/mobile visual review, keyboard/mobile-menu operation and live particle/reduced-motion checks remain pending. These are not recorded as passed.
- Next action: review http://localhost:4173/capabilities.html. Phase 4 homepage follows overview acceptance and destination migration checks; no homepage changes made in this task.


### Phase 4 scope amendment - 20 September 2026

- Capabilities overview accepted with "perfect"; user authorised continuation of the homepage phase.
- Explicit protected homepage content: complete video/poster/three timed messages; Certified & Compliant strip and both badges; full customer testimonial/attribution/logo; complete Built for Regulated Industries and Complex Operations section, mission and statistics; rising blue/gold pixels.
- User additionally requested the existing glowing horizon/connected-node design (snip 1). Retain its original CSS/canvas implementation within the operating-model section.
- Inspected C:/Users/Ryanw/Desktop/website images/homepage.png (1672 x 941). Local visual reference: left headline, right technology scene, sector strip, four image-led capability tiles. Reuse supplied artwork as a decorative CSS-framed image with live HTML copy/links; do not infer specifications or deployment evidence from its interface labels.
- This supersedes earlier proposals to move the video off the homepage or revise the protected about section. Existing original content relocated from the homepage must first match its Software destination.


### Phase 4 homepage implementation - 20 September 2026

- Changed index.html; added homepage.css and assets/Design/Home/homepage-reference.png. Updated AGENTS.md protected-content rule and this tracker. No shared stylesheet/script, approved capability page, product page or original asset changed.
- Built live HTML headline/CTAs, four capability cards with existing imagery, sector strip and working in-page routes, connected operating model, selected Atom/Artemis/Prism links, delivery process and contact CTA. The full product catalogue now lives on Software; legacy #products leads to selected technologies with a prominent full-portfolio link.
- Reference artwork: original user PNG copied unchanged (2,019,722 bytes, 1672 x 941); CSS frames only the right-side hero scene. Original PNG remains untouched. Scene is labelled an illustration; embedded mock-up values are not used as evidence. No generated images or dependency changes.
- Preservation checks passed for complete original video, about/statistics and testimonial sections, plus exact trust-strip and globe markup. Shared video timing, counter, blue/gold particle and constellation implementations unchanged. Horizon is retained beneath the operating-model content.
- Migration checks: all nine original image tile HTML blocks and the complete detailed portfolio, expertise, four benefits, original process and original CTA match Software exactly after line-ending normalisation. The initial whole-showcase comparison detected the Software page's already-added accessible heading; comparison was narrowed to all nine complete tile blocks. No products, source imagery, descriptions or links were lost.
- Validation passed: 72 local homepage references including fragment/product/video/poster destinations; CSS image path; unique IDs; retained legacy anchors; image alt attributes; ARIA references; single h1/main; inline JavaScript/JSON-LD parse; shared script/server syntax; new-file whitespace and git diff --check (line-ending warnings only). All 117 site HTML/CSS/assets/script/robots/sitemap resources returned successful local-preview HTTP responses.
- SHA-256 checks before the final documentation update found only index.html and this tracker changed among pre-task files; the subsequent AGENTS edit records the user's preservation instruction. Nothing committed or deployed. No build/lint/test scripts are configured.
- Responsive source reviewed at mobile/tablet/desktop breakpoints. Browser tool exposed no browsers/apps, so rendered device layouts, keyboard/mobile navigation, video playback/timing, image framing and live motion remain unverified. User review and later browser QA are still required; no visual pass is claimed.
- All requested destinations exist; all removed homepage source blocks have verified preserved destinations. Global navigation remains unchanged until Phase 6; homepage CTA/cards expose the new capability routes now. No sector-page links published before those pages exist.
- Next action: review http://localhost:4173/. Phase 5 starts with Rail after homepage review; preserve development qualifications for sensor programmes.


### Phase 4 review adjustment: video placement - 20 September 2026

- User requested the video immediately below Rail / Fire & Emergency Response / Energy & Infrastructure. Moved the complete existing video block there, before capability tiles.
- Changed only index.html and this tracker. Verified a single video section, exact video-block preservation, requested DOM order and all remaining homepage content unchanged (ignoring surrounding whitespace). No CSS, scripts, media, dependencies or other pages changed.
- Preview HTTP checks passed for homepage, video and poster; script/server syntax and git diff --check passed. No build/lint/test scripts are configured. Browser/device visual and playback QA remain outstanding.
- Homepage remains ready for user review; no commit or deployment.


### Phase 5a: Rail sector page - 20 September 2026

- User accepted the homepage for progression ("much better") and requested "lets go" after the Rail-first phase explanation.
- Added sectors/rail.html and sectors/rail.css. Updated only the homepage Rail strip link and added an all-rail-capabilities link to its existing Rail card after destination checks passed; retained #rail and all original card content. Updated this tracker and the brochure source record.
- Page connects Atom, Artemis and Axis; developing Train Node/Track Node programmes; aerial inspection and vegetation workbanks; re-engineering, selected equipment lifecycle extension and deployment support. Detailed content remains on the underlying product/capability pages.
- Train Node end-2026 approval/validation and Q1 2027 market-testing dates remain explicitly targets, not achieved approvals. Track Node configuration remains subject to development, field trials and railway approval. Gen 1 aerial operation and Gen 2 development are distinguished. No new certification or case-study claims.
- Reused five existing images, the page shell, shared script, blue rising particles, design variables and scoped responsive styling. No new assets, dependencies or framework. M25 product content/URLs unchanged with new contextual Rail links; M30 inventory remains 80 assets.
- Validation: 56 local references on the new nested page passed file/fragment checks, including parent-directory styles, scripts, assets and navigation. Unique IDs, single h1/main, ARIA references, image alt attributes and inline JavaScript/JSON-LD parsing passed. All 119 site preview resources returned successful HTTP responses. Script/server syntax, new-file whitespace and git diff --check passed (existing line-ending warnings only).
- Preservation: all 125 pre-task files matched their SHA-256 hashes before homepage wiring/documentation. Homepage wiring then passed exact reversal comparison, showing only the two intended link changes. No protected sections or product/capability files modified.
- Browser tool exposes no apps/browsers. Desktop/tablet/mobile rendered layouts, keyboard/mobile menu and live motion remain pending; responsive source checks are not a visual pass. No build/lint/test commands are configured. No commit or deployment.
- Next action: review http://localhost:4173/sectors/rail.html; build Fire & Emergency Response after Rail review.


### Phase 5b: Fire & Emergency Response - 20 September 2026

- User requested progression with "lets go" following the Rail handoff. Recorded Rail as accepted for progression, with browser QA still outstanding.
- Added sectors/fire-emergency-response.html and sectors/fire-emergency-response.css. After destination verification, changed the homepage Fire sector-strip route and added a full-sector-page link to its existing card; retained #fire-emergency and original content. Updated this tracker and source record.
- Content connects Prism risk-based protection/inspection planning, AMIS reporting/investigation/learning, visual/thermal aerial reconnaissance, systems integration and deployment support. Product detail stays at its existing URLs.
- Existing Prism pages and AMIS content are the software sources. Aerial content comes from the approved capability page and supplied brochure; Gen 1 operation versus Gen 2 development remains explicit. Reused the existing Prism overview, officers-map and supplied thermal-interface imagery. Prism screenshots were visually inspected; thermal readings are labelled illustrative.
- Fire Node and wildfire/command-station images remain reserved: source imagery alone does not establish product availability, field deployment, performance or integration. No new Fire Node specifications or status claims were added.
- M25 gains contextual links to existing Prism/AMIS pages; M30 remains 80 assets, with no new image files. No protected homepage section, shared script/style, Rail page or product/capability page changed.
- Checks passed: 49 new-page local file/fragment references, unique IDs, single h1/main, ARIA references, image alt attributes, inline script/JSON-LD parsing, new-file whitespace, shared script/server syntax and git diff --check (existing line-ending warnings only). All 121 site preview resources returned successful HTTP responses.
- All 127 pre-task files matched SHA-256 before homepage wiring and documentation. Exact reversal comparison verified homepage changes were limited to the two intended links. No dependency changes, commits or deployment. No build/lint/test scripts are configured.
- Responsive CSS uses existing mobile/tablet/desktop patterns. CUA returned no browsers/apps; rendered device layouts, keyboard/mobile menu and live particle behaviour remain unverified.
- Next action: review http://localhost:4173/sectors/fire-emergency-response.html. Energy & Infrastructure is next after review.


### Phase 5c: Energy & Infrastructure - 20 September 2026

- User accepted Fire & Emergency Response with "excellent" and authorised progression. Energy is the final individual sector-page implementation.
- Added sectors/energy-infrastructure.html and sectors/energy-infrastructure.css. After destination verification, connected the homepage Energy sector-strip route and added a full-sector link to its existing card, preserving #energy-infrastructure and all original card content. Updated this tracker and the source record.
- Content links Artemis/Axis, connected asset telemetry and integration, aerial inspection, selected equipment re-engineering/lifecycle extension, and deployment support. Product/capability detail remains at existing URLs.
- Reused four existing assets. HVAC concept and sensor survey/validation caveat retained; Gen 1 versus developing Gen 2 distinction retained. Selected auxiliary/electromechanical scope preserved. No invented energy deployments, generation metrics, certifications or sector-specific hardware specifications. M25 contextual product links updated; M30 remains 80 assets.
- Validation: 52 new-page local file/fragment references passed. Unique IDs, single h1/main, ARIA references, image alt attributes, inline JavaScript/JSON-LD parsing and new-file whitespace passed. All 123 site preview resources returned successful HTTP responses. Shared script/server syntax and git diff --check passed (existing line-ending warnings only).
- Preservation: all 129 pre-task files matched their SHA-256 hashes before homepage wiring/documentation. Exact reversal comparison verified homepage changes were limited to two intended links. No protected section, shared CSS/JS, other sector page or existing product/capability content changed. No dependencies, commits or deployment.
- No build/lint/test scripts are configured. Responsive source follows the reviewed sector-page breakpoints; CUA still returns no browsers/apps, so actual desktop/tablet/mobile visual, keyboard, menu and motion checks remain pending.
- Next action: review http://localhost:4173/sectors/energy-infrastructure.html. Phase 6 follows acceptance; it must address global navigation, metadata/sitemap, forms and the outstanding browser/device checks.


### Phase 6 implementation and automated QA - 20 September 2026

- User accepted Energy for progression and authorised Phase 6. Standardised desktop/mobile navigation and footer across all 30 HTML pages. Capabilities, Sectors, Products, Insights and Company routes now match; enquiry CTA retained. All eight product pages plus AMIS Customer are available in footers. Sector navigation targets a real homepage #sectors section.
- Added site-navigation.css for responsive footer, focus styling, tablet hamburger layout and video control. Updated script.js for reduced-motion guards, mobile-menu cleanup on desktop resize and accessible video pause/play control. Original normal-motion particle designs and video timing ranges remain. Reduced-motion users can explicitly start the video.
- Rebuilt sitemap.xml with all 29 canonical public routes, excluding noindex 404. Reviewed unique titles, descriptions and canonicals; corporate JSON-LD now reflects all four capabilities. Original software-focused footer description retained in Software introduction.
- Corrected nested 404 root-relative links/assets and skip target. Atlas/Assure missing PDF download actions now say Request Brochure and route to Contact; no replacement PDF fabricated or existing file deleted.
- Contact form remains Web3Forms. Corrected forced-false honeypot payload to preserve checked state. No new CRM destination, fields or tracking introduced; no live submissions sent.
- Full results and migration disposition: WEBSITE-QA-REPORT.md. 1,687 local HTML references, CSS assets, all 124 preview resources, 29 sitemap routes, inline/shared JavaScript parsing and structural checks passed. All 80 asset hashes unchanged.
- Seven mocked form cases passed: success, server failure, timeout, invalid input, whitespace-only message, duplicate submission and honeypot preservation. Isolated menu tests passed opening/focus, tab wrap, Escape/focus restoration and desktop resize. Video tests passed pause/play, reduced-motion behaviour and timed slide selection. These are logic tests, not browser interaction passes.
- Main content remained identical across pages except the documented additive Software footer-description preservation, homepage sector anchor, 404 skip target and truthful missing-brochure actions. Protected homepage content retained. Existing product URLs and all assets preserved.
- No build/lint/test scripts or dependencies exist in package.json; node syntax and git whitespace checks passed. No commit or deployment.
- CUA again returned no browsers/apps. Desktop/tablet/mobile rendered review, keyboard/contrast and actual video/particle playback remain open. Cookie policy refers to unimplemented consent storage; legal text and analytics configuration preserved pending reconciliation. Brochure originals, CRM tagging requirements and hosting/release confirmation remain outstanding where required.
- Phase 6 is not signed off as complete. Next: review navigation and complete the explicit release checklist in the QA report.


### User verification: consent acceptance and enquiry delivery

- User confirmed the cookie banner appeared and acceptance worked. User subsequently confirmed that the webform enquiry arrived at the company email. Live email delivery is now user-verified; no additional enquiry was sent by the assistant.
- Consent files and all-page loader/settings changes from the preceding task are implemented, but rejection, persistence, withdrawal and pre-consent network checks remain pending. Browser URL detection interrupted automation after desktop observation.
- Updated only WEBSITE-QA-REPORT.md and this control document in this verification-recording task. Checked verification entries and whitespace; application tests were not repeated for documentation-only changes. No commit or deployment.
- Next: finish consent validation and responsive QA. No CRM integration requirement inferred from email delivery confirmation.


### Capabilities dropdown navigation

- User requested direct capability routes in a dropdown. Added native details/summary disclosures to desktop and mobile navigation on all 30 HTML pages: All capabilities, Advanced software solutions, Connected systems & sensing, Aerial reconnaissance & inspection, Engineering & deployment. All destinations are existing pages.
- Changed script.js and site-navigation.css for Escape/focus return, outside-click/link/resize dismissal, responsive panels, and visible-only mobile focus trapping including summary controls. Native activation works without a new dependency. All other HTML preserved by exact replacement-reversal checks.
- 300 dropdown destination checks passed. Mocked Escape/focus, inside/outside click, link selection, focus exit and resize tests passed; script syntax and git diff --check passed. Browser/device menu review remains pending. No configured build/lint/test scripts.
- M29 navigation extended; product URLs, protected homepage content and assets unchanged. No commit or deployment.


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
- Updated M31, this tracker, INSPECTION-NOTES.md and WEBSITE-QA-REPORT.md. These are targeted rendered checks, not physical iOS/Safari tests or full-site sign-off. Keyboard-only focus, rendered reduced-motion/loading/error cases and wider Phase 6 release checks remain open. No commit or deployment.

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
- Browser follow-up: reviewed the revised pair at desktop size, iPad Mini 768 x 1024 and iPhone 16 393 x 852 in Edge. The visible figures blend into vegetation; dragging right reveals both thermal figures. Full frame, copy and labels fit all three sizes. Desktop Home/End produced visible-only/thermal-only views and correct labels; focus remained visible. Restored desktop and closed DevTools. Device emulation does not replace physical touch/Safari testing; keyboard-only tab navigation and rendered loading/error cases remain open. Next action is user review, then remaining Phase 6 QA.


### Approved production release

- User confirmed the Software header correction works and explicitly requested saving, committing and pushing the approved restructure to main for the domain launch. This supersedes earlier no-commit/no-deploy review gates.
- Software navigation: removed #products from all 60 desktop/mobile Software header links across 30 pages. Dedicated portfolio links and all other content remain intact; exact reversal and destination checks passed. User verified browser behaviour. M29 updated.
- Release checks: 13 Node tests passed; 1,999 local links/assets/fragments across 30 pages passed; root/inline JavaScript and JSON-LD parsed; Git whitespace passed. No build or lint scripts are configured for this static site. Existing documented physical-device, accessibility and consent follow-ups remain open, not represented as passed.
- Scope: capability and sector pages, homepage/media enhancements, software-content migration, shared navigation/consent, retained product routes/assets, tests and project records. No new framework or production dependency.
- Fetched origin/main; approved branch descends from it with no remote divergence. Preparing a normal fast-forward main push; production verification follows the push.
