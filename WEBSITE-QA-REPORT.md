# Apexiar restructure: QA and content disposition

## Local audit: 10-11 October 2026

Current audit supersedes the historical verification statements below. Status: QA-01 to QA-11 and QA-14 are fixed locally and retested, ready for user review. QA-12 and QA-13 are confirmed production hosting defects and remain open. The user reports successful iPhone/Safari checks and receipt of personally submitted enquiries from both the LAN preview and production. No deployed staging environment exists, and production does not contain the current local candidate. This is not full QA completion or release sign-off.

Environment: local Node preview at http://localhost:4173 and trusted-LAN preview at http://192.168.0.14:4173, integrated Chromium and isolated Edge on Windows, with an existing dirty main worktree. Local checks are not deployed-candidate verification. Production checks below were read-only. Browser viewport emulation is not physical-device evidence; the separate iPhone results are user-reported.

### Git publication authorisation: 11 October 2026

- User accepted the AMIS Customer phone section and authorised saving, committing and pushing the accumulated current work to main at https://github.com/Apexiar-Team/Atlas-Website.git. This covers the page/assets/phone demonstration, approved brochure refresh, responsive/accessibility fixes including Software's RISQS badge, tests and review records. No force push or hosting configuration change is included.
- Candidate evidence remains 46 passing tests and the recorded responsive, keyboard, image, link and scoped accessibility checks. Final staged validation and push verification belong to this Git task. The containing commit identifies the published source; this entry does not claim a verified deployed version.
- QA-12/13 and broader release checks remain open. Existing CI may deploy after a push; no direct deployment, live enquiry or hosting change is performed here. AMIS Customer's separate brochure remains deferred.

### AMIS Customer mobile-reporting section: 11 October 2026

- User authorised the previously deferred phone feature using the supplied local form PNG. Added a five-step demonstration after Event Operations: incident type, station/location/time, description, event/optional contact context, then review. Existing product content, images, viewer and routes retained. The source PNG is unchanged and not published.
- products/amis-customer.html, its scoped CSS and JS implement a front-facing phone with a source-shaped light form inside the existing black/blue/gold page. Timed selections, description typing and in-phone scrolling run once on first visibility. Play/pause, replay, previous/next and direct step selection are available; direct phone interaction and page-wide Pause effects stop playback. Offscreen, hidden-tab and page-exit time do not advance the sequence. Portrait dimensions keep playback controls in view at 320x740 and 390x844.
- Data/claims boundary: demonstration values only, anonymous contact fields, no live form, network submission, persistence or fabricated ticket reference. Native-app distribution, audience and actual post-submission routing remain unconfirmed. The final screen is explicitly an illustrative review, not a claimed live confirmation. Copy and design await user approval; brochure remains deferred.
- Nine new tests in tests/amis-customer-phone.test.js cover timeline bounds, progressive typing, manual controls/announcements, one-shot autoplay, pause/replay, visibility/page lifecycle, reduced motion, global pause and observer fallback. All 46 Node tests passed; complete page-script syntax and source/test editor diagnostics passed. No build/lint npm scripts exist.
- Browser evidence: 20 stage/viewport combinations at 320/390/768/1440px passed with no page/form/control horizontal overflow. Manual review reaches full progress. Keyboard Enter/Space, partial typing, full real-time playback, global pause and unchanged page scroll passed. All 39 local resource HEAD checks passed; local fragment targets, unique IDs and single h1 verified. No reporting requests were made.
- Visual evidence: six isolated Edge section/device/review views inspected with exact viewport/PNG checks and visible-image decoding. Mobile captures rechecked after portrait refinement. No runtime exceptions; two equivalent 200%/400% reflow checks passed. Four scoped axe-core 4.10.3 WCAG A/AA scans across form/review at 390/1440px reported no confirmed violations; contrast nodes remain incomplete. These are not full accessibility or native-device certification.
- Static/reduced-motion behaviour: no automatic playback with reduced motion; explicit playback uses settled field values and instant internal scrolling. A missing observer retains manual/explicit operation. Static form markup remains without JavaScript, but JS-disabled browser validation was not performed. Earlier user iPhone results predate this feature; new physical touch/Safari/Android and screen-reader checks remain open.
- Files changed: products/amis-customer.html, products/amis-customer.css, products/amis-customer.js, tests/amis-customer-phone.test.js, WEBSITE-QA-REPORT.md and WEBSITE-RESTRUCTURE-PLAN.md. No production dependencies or public assets added. Ready for user page review; QA-12/13 and all deployment gates remain open. No commit, push or deployment.

### Software RISQS badge restoration: 11 October 2026

- User reported that Software showed only two certification logos while the homepage correctly showed three. QA-14 restores the missing RISQS image in software-intelligence.html, reusing the homepage's assets/RISQS.png reference, RISQS Verified alt text, dimensions and shared class. Homepage, existing badges, assets and styles unchanged.
- Browser checks passed at 320/390/768/1440px: exactly three decoded badges, each 48px high, correct proportions, all within the strip and no horizontal page overflow. The rendered three-logo strip was visually inspected.
- All 37 Node tests passed; Software editor diagnostics clear. No build/lint npm scripts configured. Files changed: software-intelligence.html, WEBSITE-QA-REPORT.md and WEBSITE-RESTRUCTURE-PLAN.md. Ready for local review; QA-12/13 and other release gates unchanged. No commit, push or deployment.

### Release-readiness review: 11 October 2026

- User authorised all three activities: browser/accessibility review, real-device checks and staging/delivery verification. No staging deployment exists. User performed the live enquiries personally; the agent sent none. No hosting changes, commit, push, deployment, framework or production dependency added.
- QA-07: closed mobile navigation was still keyboard-focusable because opacity and pointer-events do not hide focus targets. styles.css now sets visibility:hidden when closed and visibility:visible when active. Closed-menu focus attempts passed across all 31 public pages; focused desktop/phone keyboard checks passed on the homepage, Software, AMIS Customer and Contact.
- QA-08: AMIS Customer's source-image caption link used colour alone to distinguish it from adjacent text (1.26:1). products/amis-customer.css now applies a persistent underline. The corresponding axe finding cleared at 1440/390px. Image-viewer opening, closing and focus return passed; native Enter/Escape passed in isolated Edge. Integrated-browser Escape input was unreliable and was not treated as an application defect.
- QA-09: shared primary buttons had white text over a gold gradient, with minimum base-stop contrast of 1.66:1. styles.css now uses dark text over the existing light/bright gold tokens and removes the white shine overlay. Background movement remains; homepage-specific styling is retained. All 42 normal/hover/focus checks across five journey pages passed, as did 77 non-mobile primary buttons across all 31 pages. Shared minimum contrast is 8.53:1; the homepage-specific minimum is 6.21:1.
- QA-10: short-landscape mobile-menu content began behind the fixed header. site-navigation.css now provides top clearance, scrollable overflow and auto margins, plus constrained/wrapping actions for narrow screens. All 16 focused route/viewport cases passed at 320x740, 390x844, 768x1024 and 844x390; the first control is unobscured, the last enquiry action is reachable, hit testing and Escape/focus return pass. Shared regression passed 62 cases across all 31 pages at 320x740 and 844x390, with no menu horizontal overflow.
- QA-11: the smooth-anchor handler prevented native skip-link focus progression. script.js now makes a skip destination programmatically focusable when needed and focuses it before scrolling. Ten desktop/phone cases across the homepage, Capabilities, Software, AMIS Customer and Contact passed: Enter focuses main, then Tab stays inside main. Ordinary section-anchor behaviour is unchanged. Four new tests in tests/anchor-navigation.test.js cover normal/reduced motion, existing tabindex, ordinary anchors and missing targets.
- Accessibility automation: axe-core 4.10.3, WCAG 2 A/AA, 2.1 AA and 2.2 AA tags, five journey routes at 1440/390px with reduced motion: ten final scans, zero confirmed violations. Gradient contrast and video-caption nodes remain incomplete and require human assessment. Button contrast was separately measured; this is not complete WCAG or screen-reader certification. Settled/reduced-motion checks excluded transient entrance opacity from final contrast findings.
- Keyboard journeys: homepage -> Capabilities -> Software -> AMIS Customer -> Contact passed using focused links and Enter at 1440/390px. Homepage video was playing, paused from its control, and resumed successfully. Protected homepage particles, horizon, complete video, trust strip, testimonial and regulated-industry content were not removed or rewritten.
- Contact, intercepted local requests: required fields, whitespace-only message/focus, success reset/counter, HTTP 500 recovery, offline recovery, pending disabled/busy state, duplicate guard and the real 10-second timeout passed. Five intercepted requests; zero agent-sent live enquiries. Error paths retained the message and restored the submit action/fallback email.
- Consent, isolated local checks: no tag before choice; keyboard rejection and reload persistence; settings close restores focus; acceptance inserts the stubbed tag; withdrawal reload clears seeded root _ga/_gid and nested /products _ga_QA_NESTED cookies and prevents tag reload. Two intercepted tag requests; no real analytics execution. Actual collection, HTTPS/domain cookie scope and consent-policy reconciliation remain separate checks.
- Physical-device evidence: user reported that the iPhone/Safari journey, portrait/landscape menus, image viewer and a brochure download all passed over the trusted LAN. Device model, iOS version and specific brochure were not supplied; no broader device claim is made. Android remains untested. User separately confirmed personally submitted enquiries arrived from both the local preview and production.
- Reflow: ten isolated Edge checks across the five journey pages passed at 640 CSS pixels/device scale 2 and 320 CSS pixels/device scale 4, representing 200%/400%-equivalent layouts from a 1280px baseline. No page overflow. This is equivalent emulation, not native browser zoom or text-only resizing.
- Visual review: nine exact-dimension Edge captures inspected: homepage and Contact at 390/1440px, AMIS caption at 390px, Software menu at 320px, landscape menu top/end at 844x390, and image viewer at 1440px. Visible images decoded and viewport/PNG dimensions were asserted. Temporary harnesses/screenshots remain outside the repository. These representative views do not constitute every-page visual approval.
- QA-12, production hosting blocker: apex HTTP redirects to apex HTTPS, which redirects to HTTP www before reaching HTTPS www. https://apexiar.co.uk/products/prism.html?qa=readiness returns 404 instead of preserving the path/query. Hosting/domain forwarding must redirect directly to HTTPS www with path/query preservation. Configuration access and change approval are required; no local redirect patch was made.
- QA-13, production hosting blocker: a nested missing URL redirects to a trailing slash and returns 404 with the homepage body/title, not the recovery document. Its relative links resolve under the missing directory. Browser DOM inspection confirmed this. Review the CloudFront/origin error mapping to serve the root-relative recovery document while retaining HTTP 404; changing local 404.html alone will not correct the deployed mapping.
- Production differs from local: AMIS Customer currently redirects to a 404, the shared landscape fix is absent, and Atom's deployed PDF HEAD reports 23,735,244 bytes versus 755,923 bytes locally. These are candidate-delivery/cache gates, not evidence that local routes should be renamed. HSTS was absent in sampled responses; review hardening separately, without silently enabling includeSubDomains or preload.
- Regression: all 37 Node tests passed; node --check script.js passed. Editor diagnostics are clear for all seven changed files; scoped git diff --check passed. No build/lint npm scripts exist. Earlier successful local link/asset/fragment crawl remains applicable: this pass changed CSS, focus behaviour and tests, not paths or content destinations.
- Files changed in this pass: styles.css, site-navigation.css, products/amis-customer.css, script.js, tests/anchor-navigation.test.js, WEBSITE-QA-REPORT.md and WEBSITE-RESTRUCTURE-PLAN.md. Earlier brochure/page/responsive work remains untouched. AMIS Customer's future phone feature and deferred brochure remain out of scope.
- Review gate: local fixes ready for review. Next agree hosting/domain/CloudFront review and an authorised staging/deployment plan; retest the actual candidate after delivery/cache refresh. QA-12/13, Android, full accessibility/media review and production consent checks remain open. No release approval is inferred from the iPhone or enquiry results.

### Remaining defect fixes and regression: 11 October 2026

- User authorised working through all remaining recorded QA issues. QA-02 to QA-06 were fixed individually, with a focused browser check immediately after each source edit. Earlier QA-01 changes and all unrelated uncommitted work are retained. No content, route, asset, dependency or framework removed or replaced.
- QA-02: .prism-officers-title now uses white-space: normal. The unchanged heading is fully visible at 320/390/768/1440px; its scroll width equals its available width, and Prism no longer has horizontal page overflow. All four exact-width screenshots inspected.
- QA-03: the Carbon Reduction Plan download anchor now has a parent-width limit and a centred, wrapping label. At 320/390px it fits its 232/302px parent, retains its working hit area and unchanged href/download filename. The original 34,355-byte PDF returned HTTP 200, application/pdf and a %PDF- signature. Both phone screenshots inspected. Native embedded-PDF rendering and physical-device download UX remain unverified; headless captures did not establish PDF-viewer functionality.
- QA-04: Assure's risk-matrix SVG now has a valid height="120" attribute and height:auto CSS. At 320/390/768/1440px it retains its 200:120 aspect ratio within its parent. All nine rectangles, five circles and seven labels remain; no console errors or runtime exceptions during the focused reload. Phone/tablet/desktop chart screenshots inspected.
- QA-05: repaired three Prism metadata separators with &mdash; and three source-comment separators with ASCII hyphens. Parsed description, OG/Twitter titles and descriptions match the intended wording; Prism's source encoding scan is clear. Canonical URL, single h1 and product claims retained.
- QA-06: only the shared mobile enquiry CTA now uses dark text and a lighter existing-brand gold gradient. Its white shine pseudo-element is disabled so it cannot wash over the label; other buttons and protected motion are unchanged. Minimum base-gradient text contrast is 8.53:1, above the 4.5:1 normal-text requirement. All 36 focused normal/hover/keyboard-focus checks passed on Atom/Axis/Prism at 320/390/768/1099px, including label fit and visible focus. Phone/narrow-phone/tablet captures inspected.
- Shared regression: all 31 public pages (30 sitemap routes plus 404) passed geometry at 320/390/768/1440px: 124 checks, no horizontal page overflow. At 390px, all 93 mobile CTA state checks passed with the same 8.53:1 minimum, unchanged contact route, Enter opening, reverse focus wrap to the CTA, Escape/focus return and scroll unlock. No uncaught JavaScript exceptions across the 31-page run. This is not full-page visual or screen-reader approval.
- Link/structure regression: 2,082 same-origin references, 140 unique resources and 216 fragment references passed. HTML was parsed from GET responses; other resources were checked with HEAD. Each public page has one h1 and unique IDs. Nested missing-page recovery returned HTTP 404 and the expected heading. External destinations, JavaScript-generated references and case-sensitive hosting behavior are not exhaustively verified by this crawl.
- Image-harness correction: AMIS Customer's initial <img alt=""> belongs to the closed, hidden native image viewer and intentionally has no source. It was initially flagged by the generic zero-width check; a focused four-width retest verified that state and found no broken assigned images. No AMIS Customer source change was needed. Offscreen lazy media are not exhaustively covered.
- Twelve isolated Edge CDP captures inspected for QA-02/03/04/06, with exact viewport and PNG dimensions, settled reveal/menu transitions and successful visible-image decoding. Harness/screenshots remain outside the repository. Integrated Chromium PDF-viewer extension request cancellation was not classified as a broken site asset.
- All 33 existing Node tests passed; editor diagnostics and source git diff --check passed. No build/lint scripts are configured. No live enquiry, analytics acceptance, commit, push or deployment.
- Files changed in this pass: styles.css, site-navigation.css, carbon-reduction-plan.html, products/assure.html, products/prism.html, WEBSITE-QA-REPORT.md and WEBSITE-RESTRUCTURE-PLAN.md. Earlier Atom/Axis stylesheet fixes remain, but those files were not edited again.
- Review gate: all six numbered defects fixed locally, ready for combined user review. Physical iOS/Android and Safari, full accessibility/contrast/zoom and full-page visual review, external services, real analytics, native downloads and deployed delivery remain separate outstanding checks. AMIS Customer's future phone feature and deferred brochure are unchanged.

### QA-01 navigation stylesheet restoration: 11 October 2026

- Resumed the backlog at the user's request. Added one ../site-navigation.css reference after the base stylesheet in products/atom.html, products/axis.html and products/prism.html. Exact reversal against HEAD confirmed all other content in those three files is unchanged. Shared CSS/JS, protected homepage content, assets and earlier uncommitted work were not changed by this fix.
- All three pages passed header/footer geometry checks at exact 320/390/768/900/1099/1100/1440px viewports: mobile navigation below 1100px, desktop navigation from 1100px, and one/two/five footer columns at the existing breakpoints. No header/footer overflow. Prism's separate QA-02 heading still produces a 709px document width on phones; this is not a whole-page overflow pass.
- Desktop checks at 1100/1440px passed on all three: click-to-open, pointer travel across the trigger/panel gap, pointer-exit closure, Enter/Tab access, Escape/focus return, visible focus, keyboard-focus retention during pointer exit, and focus-out dismissal. Mobile checks at 320/390/768/900/1099px passed: Enter opens, initial focus, forward/reverse focus wrap, capability links, disclosure Escape followed by overlay Escape, focus return and scroll unlock. Resizing an open menu from 1099 to 1100px closed it and restored scrolling on each page.
- Reduced-motion checks passed on all three at 390/768/1440px: scroll-behavior auto, visible fade-in content, hidden decorative particles, and element/pseudo-element animation and transition durations capped at 0.01ms. This is focused CSS coverage, not a complete site or assistive-technology audit.
- 204 same-origin references across the three pages resolved to 56 unique resources, all HTTP 200; 18 fragment references passed. The restored stylesheet returned text/css. No uncaught runtime exceptions in the geometry run or isolated Edge capture session.
- Isolated Edge CDP menu/footer screenshots inspected at 1440x1000 (Atom), 768x1024 (Axis) and 390x844 (Prism). Device metrics and PNG dimensions asserted; visible images decoded. These are representative navigation/footer views, not full-page visual approval. The integrated browser reset its viewport during capture, and early long-footer crops captured transitions/fixed-layer artefacts; those captures were excluded. Final captures use settled overlays and ordinary viewports without temporary styling changes. Harness/screenshots remain outside the repository; no dependency added.
- Visual inspection exposed QA-06: the mobile enquiry CTA inherits grey text from .mobile-nav__links a. On all three pages at 390px, computed text is rgb(156, 163, 175), 22.4px/600; contrast against the four base gold-gradient stops is 2.00:1, 1.28:1, 1.24:1 and 1.53:1, below even the 3:1 large-text threshold. Normal-state failure confirmed; hover/focus and wider shared-page coverage remain for its own fix. No button styles changed here.
- All 33 existing Node tests passed; the three source files have no editor diagnostics. No build/lint scripts are configured. The first inline source check hit PowerShell quoting; its temporary-file replacement passed. No live enquiry, analytics acceptance, commit, push or deployment.
- Review gate: QA-01 fixed locally, retested and ready for user review. Next fix is QA-02; QA-03 to QA-06 remain open. Physical iOS/Android, Safari, screen readers, full contrast coverage and deployed delivery remain unverified. AMIS Customer's accepted page, future phone workflow and deferred brochure are unchanged.

### AMIS Customer visual refinement: 11 October 2026

- The first page passed technical checks but was not visually accepted: user requested a stronger SpaceX/NVIDIA-inspired enterprise presentation, clearer product screenshots and motion. Refined only AMIS Customer; earlier brochure/discovery/responsive changes and QA-01 to QA-05 remain untouched.
- Source: C:/Users/Ryanw/Downloads/AMIS Customer short booklet.pdf, all eight pages reviewed. The SharePoint copy required authentication; the downloaded file supplied by the user was used instead. Source PDF remains unchanged and is not published as a download.
- Added assets under assets/Design/AMIS-Customer/: dashboard-full.png (page 5 image 4, X20.png, 2304x1560) and briefing-full.png (page 4 image 4, X22.png, 1536x1040), byte-identical to embedded streams. Lossless WebP crops: service-pressure.webp (1212x502; dashboard rectangle 704,210,1916,712), executive-briefing.webp (1212x686; dashboard rectangle 704,734,1916,1420), assistant-detail.webp (533x1040; briefing rectangle 1003,0,1536,1040). Crop pixels verified against the sources. brand-ribbon.webp derives from page 1 image 0, X4.png (1440x843). Prior JPEGs remain preserved but are no longer displayed by the page.
- Updated products/amis-customer.html and products/amis-customer.css; added products/amis-customer.js. Full-width supplied artwork, controlled ribbon/particle motion, one-time data-flow/event sequences and progressive scroll reveals retain the Apexiar black/blue/gold identity. Existing substantive content, anchors, contact CTAs, event descriptions and aerial/privacy qualifications retained. No new dependency or fabricated interface/metrics.
- Product stage switches between source-faithful service-pressure, executive-briefing and full-workspace images. Fixed stage dimensions prevent tab shifts. Phone views scroll a readable 960px image inside a 340px-high stage instead of shrinking every label to phone width. Source detail is available in a native dialog with fit/actual-size controls, scrollable image, Escape/close and focus return. Original-image links remain usable without JavaScript; normal modified-click behavior is preserved.
- Independent Edge CDP checks passed at exact 1440x1000, 768x1024, 390x844 and 320x740 viewports: no page overflow, oversized text or clipped CTA text; no image upscaling in the product stage; stable tab height; all referenced displayed images decoded. Hero, product, briefing and event captures taken; desktop/tablet/phone/narrow examples inspected. Phone product-image horizontal scrolling verified.
- Keyboard mobile menu, section anchor, product ArrowRight selection, event/biometric disclosures, viewer Enter/Escape, native modal containment and opener focus return passed. Reopening resets actual-size state. Simulated image error disables sizing and reports failure; a subsequent briefing image loads successfully. Reduced motion disables animations, removes pending reveals and hides particles; pause/resume and offscreen hero suspension passed. JavaScript-disabled reload retains content, hides inactive tab controls and preserves original-image links.
- All 45 unique same-origin page references returned HTTP 200; local fragments and unique IDs passed; one h1; no uncaught runtime exceptions. All 33 existing Node tests passed; page editor diagnostics clear. No build/lint scripts configured. git diff --check passed for the refinement record and source changes.
- Test-harness corrections: explicit instant scrolling with a primitive return avoids pending scroll promises; screenshot readiness excludes decorative particles; native dialog focus may move to browser chrome rather than a particular control. Additional test-assertion quoting was repaired. These were temporary harness issues, not reported as site defects. Harness/screenshots remain outside the repository; no production dependency added.
- Status: visual refinement accepted by the user on 11 October, not release sign-off. Real touch/pinch behavior, physical iOS/Android devices, Safari, full contrast/screen-reader audit, production caching/delivery and real image-network failure remain unverified. Brochure publication remains pending. No commit, push or deployment.
- Evening handoff: user paused work until 12 October; resume the QA backlog with QA-01. Future AMIS Customer enhancement noted in the control document: an interactive phone within the page showing a step-by-step mobile workflow. Scope/screens to be agreed later; no feature implementation tonight. This handoff changes documentation only; application tests were not rerun.

### AMIS Customer page: 10 October 2026

- User authorised the new /products/amis-customer.html page ahead of QA-01. Brochure publication remains deferred until page review; no download link or public copy of AMIS Customer.pdf added.
- New products/amis-customer.html and page-scoped products/amis-customer.css. Two distinct areas cover customer intelligence and event operations; existing navigation, consent, particles and footer styling reused. Homepage content/shared CSS/JS unchanged apart from the homepage footer discovery link.
- Brochure review: all eight pages of the supplied AMIS Customer.pdf read. Pages 2-3 establish complaint visibility, CSV mapping/preview/verification and data review; page 4 supports AI briefing and forecasting; page 5 supports periods and journey-normalised metrics; pages 6-7 support complaint workflow and management priorities. Event planning/rosters/risk/forecasting come from the user's brief, not the brochure. Additional source connections are described as scoped integrations, not universal native connectors.
- Two original JPEGs extracted without recompression: page 3 X25.jpg -> assets/Design/AMIS-Customer/customer-dashboard.jpg (839x567); page 4 X35.jpg -> management-briefing.jpg (675x638). Original PDF unchanged. A third extraction containing personal-looking contact/vulnerability information was discarded before page implementation and is not in the workspace. Screen figures are labelled as brochure examples, not performance evidence.
- Aerial links describe deployment-specific crowd-condition/site-awareness/incident-context use cases. They do not claim an existing AMIS Customer drone integration, permission to fly over crowds or standard facial recognition. A disclosure distinguishes biometric identification and its separate feasibility/privacy/legal assessment. User review of commercial positioning remains required.
- Discovery: both existing Software portfolio entries, Software footer and homepage footer link to the new route; descriptions and original cover image retained. Sitemap includes one canonical entry. Other existing footer enquiry links remain unchanged in this bounded task.
- Validation: 74 local page references returned successfully, fragment/ID checks passed, one h1, zero brochure links. New portfolio/homepage links and XML sitemap verified. All three content images decoded successfully.
- Independent Edge CDP tests passed at 1440x1000, 768x1024, 390x844 and 320x740 with exact device-metric assertions: no page overflow, oversized text or clipped CTA labels. Hero and event-section screenshots captured; desktop, phone and tablet samples visually inspected. Native Enter/Escape menu/focus, Enter section-link scroll, event disclosure and biometric disclosure passed. Reduced-motion title animation and particles disabled; no uncaught JavaScript exceptions.
- Tool limitations: integrated-browser captures reset the viewport and plain Edge --window-size cropped narrow captures. Those misleading captures were not counted as visual passes. Final evidence used explicit CDP device emulation, with temporary scripts/profiles/screenshots outside the repository; no production dependency added. Initial harness assumptions about decorative button overflow and URL hashes were corrected against the existing CSS/scroll handler.
- Final checks: all 33 existing Node tests passed, editor diagnostics clear across the page/discovery/document files, and git diff --check passed. No build/lint scripts configured. Physical devices, Safari, screen-reader/contrast audit and production delivery remain unverified. Ready for user page review; QA-01 to QA-05 remain open. No commit/push/deployment.

### Brochure update: 10 October 2026

- User chose brochures before QA-01, selected Axis - Maintenance Intelligence Platform.pdf, approved an Aspire download and deferred AMIS Customer. Alternate Axis Product Brochure.pdf is not published.
- Replaced the existing AMIS, Artemis, Atom, Axis and Prism PDFs at their established assets/brochures download paths. Added assets/brochures/Aspire-Brochure.pdf and a Download Brochure action to products/aspire.html; retained Get Started and Book a Demo. Aspire's action group wraps at intermediate phone widths.
- Sources: C:/Users/Ryanw/Desktop/atlas-website/assets/brochures/new brochures. Source PDFs untouched. All six published files match their approved sources byte-for-byte and have PDF signatures. Each is under 1 MB; the previously large Atom download is now 755,923 bytes.
- Ten download anchors across the six product pages return HTTP 200, application/pdf and the expected PDF sizes/signatures. Aspire buttons and page fit at 320/390/480/600/640/768/1440px after correcting the new three-button row's 480px overflow.
- Final regression: 33 Node tests passed; Aspire/document editor diagnostics and git diff --check clear. The supplied Prism PDF already matches the tracked version, so it produces no Git diff; four existing PDFs change and Aspire is added.
- PDF editorial/content review, physical-device download handling and production cache refresh are not verified. Stable URLs may require cache invalidation on deployment. No commit, push or deployment.
- This is a brochure update, not a QA-01 fix. Next: user review, then restore missing shared navigation CSS under QA-01.

### Defect backlog

Priority: P1 = shared navigation/accessibility or insecure redirect risk; P2 = broken presentation, contrast failure, browser error or incorrect recovery; P3 = lower-impact quality issue. Fix and retest one ID at a time.

| ID | Priority | Finding and reproduction | Owner / proposed correction | Retest / status |
| --- | --- | --- | --- | --- |
| QA-01 | P1 | Atom, Axis and Prism omitted site-navigation.css. Shared dropdown layout, tablet menu breakpoint, footer and CSS reduced-motion rules were absent. | Restored the existing shared stylesheet reference in products/atom.html, products/axis.html and products/prism.html; other page content unchanged. Earlier footer-only CSS fix did not resolve this root cause. | Fixed locally, ready for user review on 11 October. Pointer/keyboard, 320/390/768/900/1099/1100/1440px navigation/footer, reduced motion and links passed. Not release sign-off; QA-02 and QA-06 remain separate. |
| QA-02 | P2 | Prism's inspecting-officers heading was truncated on phones by nowrap, producing about 709px document width. | styles.css .prism-officers-title now allows normal wrapping; wording and typography retained. | Fixed locally, retested 11 October. Complete heading, no page overflow and screenshots passed at 320/390/768/1440px. Ready for review. |
| QA-03 | P2 | Carbon Reduction Plan's unwrapped download label overflowed at 320px. | Page-local download-anchor styles now constrain width and allow centred wrapping; original PDF link and filename retained. | Fixed locally, retested 11 October. Fit/hit-area and screenshots passed at 320/390px; original PDF HTTP 200, MIME and signature passed. Native download/viewer UX remains separate. |
| QA-04 | P2 | Assure's risk SVG logged an invalid height="auto" attribute error. | products/assure.html uses height="120" with responsive height:auto CSS. | Fixed locally, retested 11 October. Console clear; 200:120 chart proportions and all marks/labels retained at four widths; phone/tablet/desktop screenshots inspected. |
| QA-05 | P3 | Prism metadata and three comments contained misencoded separators. | products/prism.html uses valid metadata entities and ASCII comment separators; claims unchanged. | Fixed locally, retested 11 October. Exact parsed metadata and source encoding/comment checks passed. |
| QA-06 | P2 | Mobile enquiry button inherited grey text on gold, with base-stop contrast as low as 1.24:1. | site-navigation.css scopes dark text, a lighter gold gradient and no white shine overlay to the mobile enquiry CTA only. | Fixed locally, retested 11 October. Minimum contrast 8.53:1; 36 focused checks plus 93 shared-page normal/hover/focus checks passed, with fit, focus and routes retained. Narrow-phone/phone/tablet screenshots inspected. |
| QA-07 | P1 | Closed mobile navigation allowed focus on invisible links. | styles.css hides the closed overlay with visibility, restoring it when active. | Fixed locally; closed-focus checks passed on all 31 pages; focused keyboard checks passed at desktop/phone widths. |
| QA-08 | P2 | AMIS Customer caption link depended on colour alone and only had 1.26:1 contrast against adjacent text. | Persistent underline in products/amis-customer.css. | Fixed locally; axe finding cleared at 1440/390px; native image-viewer keyboard/focus checks passed. |
| QA-09 | P2 | Shared primary-button white labels fell to 1.66:1 contrast; animated shine could further wash out text. | Dark labels, lighter existing gold tokens and no white shine in styles.css. | Fixed locally; 42 state checks and 77 buttons passed. Minimum 8.53:1 shared, 6.21:1 homepage. |
| QA-10 | P1 | Short-landscape menu began behind the fixed header; narrow action could overflow. | Top clearance, scrolling, auto margins and constrained/wrapping actions in site-navigation.css. | Fixed locally; 16 focused and 62 all-page phone/landscape cases passed. First/last controls reachable, no horizontal menu overflow, focus return intact. |
| QA-11 | P1 | Skip link scrolled to main but the next Tab returned to the header logo. | script.js focuses a programmatically focusable skip destination; other anchors unchanged. | Fixed locally; ten five-route desktop/phone cases and four new Node tests passed. |
| QA-12 | P1 | Apex HTTPS redirects through HTTP www; apex product path/query returns 404. | Hosting/domain administrator: direct HTTPS canonical redirect preserving path/query. | Open, confirmed on production. Requires configuration review/access and explicit change approval; no hosting changes made. |
| QA-13 | P2 | Production nested 404 serves homepage HTML, whose relative links resolve incorrectly. | Hosting/CloudFront administrator: correct error-document mapping and retain HTTP 404. | Open, confirmed by response status and browser DOM. Local root-relative recovery works; deployed mapping not changed. |
| QA-14 | P2 | Software's Certified & Compliant strip omitted RISQS while the homepage correctly displayed three logos. | Restore the homepage's existing RISQS image entry in software-intelligence.html; no style or asset changes. | Fixed locally; three decoded, proportional 48px-high badges fit at 320/390/768/1440px. Visual inspection and all 37 tests passed. |

QA-01 to QA-11 and QA-14 are fixed locally; QA-12/13 remain open hosting blockers. Next: review the local fixes and agree hosting/candidate-delivery work, alongside the outstanding coverage below. Do not commit, push or deploy until requested.

### Earlier local checks

These results predate the release-readiness review above. Its newer evidence supersedes the limits below where explicitly tested; historical counts are retained for traceability.

| Check | Current result and limits |
| --- | --- |
| Internal HTML links, assets and fragments | 11 October: 31 public pages, 2,082 references, 140 unique local resources and 216 fragments passed. Parsed HTML GET responses; other resources HEAD-checked. One h1 and unique IDs per public page. External links, dynamic references and case-sensitive hosting remain unverified. |
| CSS asset paths | One local url() reference found in the linked stylesheets; HTTP check passed. JavaScript-generated assets are not exhaustively covered by this static crawl. |
| Responsive geometry | 11 October: all 31 public pages at 320/390/768/1440px, 124 checks with normal motion. No horizontal page overflow after QA-02/03 fixes. Geometry checks are not comprehensive visual approval of every section or late-loading state. |
| Browser errors and images | No uncaught JavaScript exceptions across the 31-page run; Assure's focused console check is now clear. No broken completed assigned images found after excluding the verified closed-viewer placeholder. Offscreen lazy media not exhaustively loaded. Chromium PDF-viewer extension cancellation is not classified as a broken site asset. |
| Representative screenshots | Twelve exact-viewport QA-02/03/04/06 captures inspected, plus the earlier navigation/homepage/consent/aerial samples. Full-site screenshot review remains open; headless PDF captures do not prove native viewer functionality. |
| Contact form, mocked network only | Required fields and whitespace-only message blocked; success resets fields; server failure retains message, shows fallback email and restores enabled submit button. Two intercepted requests; zero live enquiries. Expected mocked 500 logs excluded from site defects. Timeout, offline and pending/duplicate behavior not newly browser-tested. |
| Homepage navigation | Keyboard mobile open, initial focus, Escape/focus return and desktop-resize close passed. Desktop dropdown keyboard open, Tab into first link and Escape passed. Full focus trap, all-page menus and touch gestures not exhaustively exercised. |
| Shared mobile CTA regression | 11 October: all 31 public pages at 390px, 93 normal/hover/keyboard-focus checks passed; 8.53:1 minimum text contrast. Enter opening, reverse wrap to CTA, Escape/focus return and scroll unlock passed. Additional focused Atom/Axis/Prism checks cover 320/390/768/1099px. This is not a complete contrast or touch audit. |
| Consent | Fresh choice panel, reject, reload persistence, settings focus, accept script insertion and withdrawal/reload passed. Keyboard rejection and focus return passed. Analytics script requests were aborted for the test; real tag execution, collection endpoints and cookie cleanup under actual analytics remain unverified. |
| Media controls | Homepage Pause video changes to Play video and pauses the element. Aerial Pause/Resume clouds label changes passed. Thermal slider enabled after image loading, keyboard ArrowRight changed 40 to 41; both 1672x941 images loaded. Cloud animation timing and thermal dragging were not newly visually certified. |
| Reduced motion | Earlier homepage check found no active element CSS animations. QA-01's focused Atom/Axis/Prism checks now cover restored shared CSS, including pseudo-element duration caps, hidden particles and visible reveals. Not a full audit of canvas, videos or every route. |
| Error recovery | Nested /qa/missing/page returns HTTP 404 and the correct recovery page with root-relative links. Production redirects/headers not tested. |
| Automated tests | 11 October after QA-02 to QA-06: node --test tests/*.test.js, all 33 passed. No build/lint/test npm scripts configured. Editor diagnostics and source whitespace check passed for the five changed source files. |

### Earlier local fixes awaiting review

These were implemented before the user requested an audit-first backlog. They remain uncommitted and are not claimed as production fixes.

- styles.css: statistics stack below 360px and use four columns from 768px; original 320/640px overflow no longer reproduced on the homepage.
- styles.css: shrinkable mobile footer tracks; Atom's initial footer overflow cleared. QA-01's missing stylesheet references are now restored locally and retested, pending user review.
- software-intelligence.css: narrow product tiles use min-width: 0 and aspect-ratio: auto while retaining their 260px minimum height; all nine fit the 272px grid at 320px.
- styles.css: expertise cards stack through 435px and oversized globe decoration is horizontally clipped at its section. Software page geometry passed at 320/390/768/1024/1200/1440px; desktop edge popover bounds remained within the viewport.
- Protected content and original assets unchanged. These CSS changes still need user visual review, including the globe, product images and stats at desktop/tablet/phone sizes.

### Outstanding coverage

- QA-12 apex redirect/path preservation and QA-13 production recovery body require approved hosting changes and retesting. No deployed staging exists; agree delivery of the current candidate, cache refresh and case-sensitive path checks. Review missing HSTS separately.
- User-reported iPhone/Safari journey/orientation/viewer/brochure checks passed. Android, wider physical browser/device coverage, real slow/mobile networks and thorough pinch/touch behaviour remain unverified.
- Full-page visual review, remaining gradient contrast and video-caption assessment, screen readers, complete focus workflows, native browser zoom and text-only resizing. Ten clean axe scans and emulated reflow do not certify these.
- External destinations, all PDF content/native viewers/downloads, late-loading images and broader offline/media failures. One user-tested brochure is not all-download approval.
- Real analytics collection and cookie deletion on HTTPS/domain scopes, plus consent-policy reconciliation. Seeded local cookie cleanup and blocked/stubbed tag checks passed. User-confirmed enquiry receipt from both preview and production is current evidence; the deployed candidate must still be retested after release.
- Legacy housekeeping: null bytes in .gitignore and missing source Atlas/Assure brochures remain outside this defect pass; working request links are retained. Atom's approved local replacement is 755,923 bytes, but production still reports the old 23,735,244-byte file and needs candidate delivery/cache verification.

## Historical release record

23 September 2026. User approved the current site and explicitly authorised commit/push to main for production. Release checks passed; site commit 4c1543f is pushed to main and verified live. Remaining device/accessibility/consent follow-ups are documented below.

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
5. **Evidence and hosting operations:** existing statistics/certification wording was preserved without increasing claims. Confirm evidence/current scope as needed. The approved site is verified live through Amazon S3/CloudFront, but the authenticated hosting administration process remains undocumented in this repository.

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

### Production activation verified

- Rechecked production on 23 September 2026. The restructured homepage is live at `https://www.apexiar.co.uk/`.
- HTTPS HEAD checks returned 200 for the homepage, capabilities overview, all four capability pages, all three sector pages and `assets/media/apexiar-turbine-inspection.mp4`.
- All nine checked HTML production objects exactly matched their local `main` counterparts after expected CRLF-to-LF normalisation: deployed content lengths equalled normalised local lengths and S3 ETags equalled normalised local MD5 hashes. The inspection MP4 returned 200, advertised byte-range support and matched the local 13,805,629-byte length; its multipart S3 ETag is not treated as a content hash.
- Response headers identify Amazon S3 behind CloudFront. No hosting setting, DNS, application code or dependency was changed. Deployment activation is resolved; keyboard-only, reduced-motion, consent rejection/persistence/withdrawal, 320px and physical-device/Safari coverage remain open.

### Homepage capability heading and callout

- Updated the homepage capability heading to "Connected Technology Ecosystems" and added a dedicated class to the existing supporting sentence.
- The callout copies the established Pause Video visual values: `#06101e` background, `#d4a24c` one-pixel border, `#f1d397` text, 6px radius and 10px/16px padding. It remains a semantic paragraph, not a misleading interactive control.
- Capability cards, links, imagery, particles and protected homepage sections remain unchanged. No dependency, asset, route, commit or deployment change.
- Verification passed: 13 existing Node tests, `node --check script.js`, exact heading/class checks and `git diff --check`. Local Edge renders at 1440 x 4000, 768 x 4000 and 390 x 5000 included the full capability section; heading and callout fit at all three widths, the callout stacks cleanly at tablet/mobile sizes and the four-card layouts remain intact. Computer Use exposed no browser, so the rendered fallback used installed Edge headless against the existing local preview. Temporary screenshots were removed after inspection.
- Follow-up: changed only the Advisory & Deployment homepage-card description to "Practical expertise from engineering strategy to assurance." Image, heading, destination and layout markup remain unchanged. The user requested manual visual review, so no additional rendered browser check was performed; exact-copy, preservation and whitespace checks passed.

### End-of-day release — 23 September 2026

- User authorised committing and pushing all current homepage refinements to main. Final suite: 21/21 tests passed; script.js and inspection.js syntax and Git whitespace passed. No build/lint commands configured. Local main matched freshly fetched origin/main before commit. Visual review remained with user; production activation of this new release is not yet verified.

### Assurance strip and synchronised counters (implementation)

- Homepage assurance label now uses the existing gold border/text/navy treatment; three 48px-high badges sit underneath. Added byte-identical supplied RISQS.png; original badges retained. Statistics preserve all final values and use one shared two-second clock, including 99.9% at one decimal. Reduced-motion and no-observer fallbacks show final values.
- Three new behaviour tests verify shared completion, different rates, no early final value/replay and motion fallbacks. All 21 project tests passed, alongside script syntax, Git whitespace, 101 local references, four local HTTP checks and source/copy SHA256 equality. No configured build/lint scripts; manual visual review remains with user. No commit/deployment.

### Inspection introduction layout refinement (earlier work)

- Remaining-gap correction: user screenshot showed viewport-stage letterboxing above the footer after the padding fix. Desktop stage now fits footage plus measured footer, capped to the available viewport, with matching section height and reserved media/footer space. Added geometry regression for tall/short viewports and changing caption heights. All 18 tests, syntax and whitespace passed. These are automated geometry checks; user visual review remains pending.

- Closing-panel follow-up: compact 16px vertical padding, 10px workflow spacing, and a closing-state layout that removes the faded approach copy's reserved space. Existing timeline regression test now asserts closing-state entry and reversal. All 17 tests, inspection JavaScript syntax and Git whitespace passed; no rendered review per user preference. This adjusts the caption panel, not the pinned-stage height or contained-video aspect ratio.

- Width follow-up: removed the two intro text width caps to use the available container width. Desktop copy can occupy one line per element; responsive wrapping is retained. Manual visual review remains with the user.

- Moved the introduction above the sticky stage onto solid navy; removed the inspection skip control/handler/styles as requested. Top-aligned the contained footage, updated tracking coordinates and offset the scroll timeline by the measured introduction height. The existing horizon, footage and gold evidence treatment remain intact.
- All 17 tests passed, including eight inspection checks covering header scroll timing, forward/reverse seeking, desktop/tablet/mobile marker geometry, final hold, loading failures and reduced motion. JavaScript syntax and Git whitespace passed. No build/lint scripts configured; rendered layout review is assigned to the user per their instruction. No commit or deployment.

### Operating-model sequential pulse (earlier work)

- Added progressive-enhancement classes and a dedicated IntersectionObserver to pulse the timeline purple once, in order from Sense through Act, when 20% of the timeline enters the viewport. CSS delays are 420ms per step; each node/line pulse lasts 800ms and Act settles to its pre-existing purple state.
- Missing IntersectionObserver, disabled JavaScript and reduced-motion retain the original static presentation. A live reduced-motion preference change disconnects the observer, cancels enhancement classes and restores the static state.
- Timeline HTML/copy, responsive grids and the globe/horizon are unchanged. The user requested manual visual review, so no desktop takeover or rendered browser check was performed.
- Added three focused VM tests covering one-time viewport entry, non-intersecting state, reduced-motion/missing-observer fallbacks and live motion-preference cancellation. All 16 project tests passed, as did `node --check script.js`, local homepage/script/CSS HTTP checks and `git diff --check`.
- Timing follow-up: increased both the pulse duration and step delay by exactly 50% (`.8s` to `1.2s`; `.42s` to `.63s`). The sequence still runs Sense / Connect / Understand / Act once and settles on Act. No rendered browser check was requested.
- Colour follow-up: changed the travelling neon and final Act node from purple to the homepage's existing gold palette. Inactive nodes remain blue; timing and JavaScript are unchanged. No rendered browser check was requested.

## Capabilities visual refinement ? 24 September 2026

- Ready for manual review. Changed capabilities.html and capabilities.css; updated the control document and this report. Native linked capability graphic with finite signal animation, responsive hero layout, card hover/focus treatments and sequential operating-model highlights. All existing copy, imagery and destinations retained, including the latest user-requested hero copy.
- 21 Node tests, preservation checks, unique IDs, 79 local references including fragments, localhost HTML/CSS and Git whitespace passed. Build/lint scripts are not configured.
- User explicitly requested manual visual review and no computer takeover: rendered desktop/tablet/mobile, keyboard and reduced-motion checks remain pending. No shared CSS/JS, homepage, dependency, commit or deployment changes.

## Aerial hero search focus - 24 September 2026

- Updated aerial-intelligence.html hero heading, introduction, hero CTA and search/social metadata around drone inspections. Kept the existing canonical URL, imagery, broader offering and all lower-page content. Updated both project records.
- 21 existing tests, 72 local references/fragments, one-H1 check, lower-content parity, localhost HTML and Git whitespace passed. No build/lint scripts configured. User owns visual review; no browser takeover. No UK keyword-volume or ranking validation claimed. No commit or deployment.

## Shared hero typography - 24 September 2026

- User requested consistent hero sizes across pages. Ten shared/page stylesheets now use --hero-heading-size; accent lines inherit the full size and aerial container-based sizing is removed. HTML/content and protected homepage sections retained. Updated both project records.
- 21 tests, 2,000 references across 30 pages, all 10 localhost stylesheet byte comparisons, static shared-token checks and Git whitespace passed. No configured build/lint commands.
- Rendered desktop/tablet/mobile, zoom and line-wrap review remains with the user, per their explicit preference. Earlier exact two-line aerial fit is superseded by consistent sizing. No computer takeover, commit or deployment.

## Aerial hero two-line desktop layout - 24 September 2026

- Widened hero copy column using the heading intrinsic width, reduced column gap, kept the shared font size and added the authorised slight 4:3 image crop. Image source/caption and all copy retained. Small screens retain natural wrapping and stacked layout. Changed aerial-intelligence.css, versioned CSS link and both project records.
- 21 tests, 72 local references, localhost HTML/CSS and Git whitespace passed. No build/lint scripts configured. User manual visual review pending; no computer takeover, commit or deployment.

## Aerial platform section relocation - 24 September 2026

- Moved complete Platform and development section after Security intelligence / Concept and before Part of the wider operational picture. All content preserved. Added scoped blue/gold lighting, differentiated status-card accents and a gradient separator; early programme section now uses the base background to distinguish it from the adjacent navy applications section.
- Changed aerial-intelligence.html, aerial-intelligence.css and both project records. Full section preservation/order checks, unique platform ID, 72 local references, localhost HTML/CSS, 21 tests and Git whitespace passed. No build/lint scripts configured.
- Manual desktop/tablet/mobile review remains with user; no computer takeover, commit or deployment.

## Aerial cloud-to-survey background - 24 September 2026

- User approved the concept. Added aerial-survey.css/js and a shared decorative wrapper across Platform and development / wider operational picture in aerial-intelligence.html. Original sections, all copy, images, IDs and links retained. Blue-grey clouds reveal an illustrative terrain mesh and gold infrastructure connections on scroll; solid foreground panels preserve readability. Updated this report and the control document; added tests/aerial-survey.test.js.
- 27 Node tests, JavaScript syntax, exact section parity/order, unique IDs, 74 local references/fragments, four localhost byte comparisons and Git whitespace passed. No build/lint scripts configured. New tests cover forward/reverse/clamped scroll, cache reuse, reduced motion, desktop/tablet/mobile backing-store limits, frame coalescing, offscreen/hidden/page lifecycle, missing observer and canvas failure/recovery.
- No new dependency or image asset. Terrain is decorative, not a real survey dataset. CSS static fallback and reduced-motion static composition included. Runtime performs no network requests.
- User retains rendered desktop/tablet/mobile, contrast and performance review; no browser takeover. No commit or deployment.

## Cloud-to-survey corrected destination - 24 September 2026

- User corrected the intended location: Thermal and visual evidence plus Reveal a different perspective. Effect moved to exactly those two sections; lower platform/operational backgrounds restored. Thermal copy panel and comparison text backing keep content readable. Original section content, imagery, comparison controls and both interaction scripts preserved. Changed aerial-intelligence.html, aerial-survey.css and both records.
- Exact section parity/order, wrapper membership, 27 tests, 74 local references, localhost HTML/CSS and Git whitespace passed. No build/lint scripts configured. Rendered desktop/tablet/mobile review remains with user; no computer takeover, commit or deployment.

## Seamless background and timed cloud entrance - 24 September 2026

- Removed the comparison section dark pseudo-element causing the visible horizontal split. Background remains continuous across thermal evidence and comparison, with local text shadows. Clouds now perform a 4.8-second reveal on section entry, continue without scrolling and then settle. Offscreen/hidden time pauses; scroll cannot scrub/restart. Reduced motion remains static.
- Files: aerial-survey.css/js, aerial-intelligence.html resource versions, tests/aerial-survey.test.js, both project records. Content/images/slider unchanged.
- 29 tests, syntax, wrapper membership, seam-rule removal, unique IDs, 74 local references, localhost HTML/CSS/JS and Git whitespace passed. No build/lint scripts configured. User manual rendered review remains pending; no browser takeover, commit or deployment.

## Continuing ambient cloud flow - 24 September 2026

- Clouds now keep drifting after the terrain reveal, with stronger residual visibility and no dependence on scrolling. Added Pause/Resume clouds, hidden when unavailable or reduced motion is active. User pause and hidden/offscreen suspension preserve the motion clock. Canvas painting capped near 30fps. Seamless background, copy, images and comparison controls preserved.
- Changed aerial-survey.css/js, aerial-intelligence.html, tests/aerial-survey.test.js and both project records. All 31 tests, syntax, playback markup, 74 references, localhost resource equality and Git whitespace passed. No build/lint scripts configured.
- Rendered desktop/tablet/mobile review remains with user; no computer takeover, commit or deployment.

## Static cloud flow follow-up - 24 September 2026

- Replaced reversing sinusoidal drift with seamless constant-speed cloud bands and stronger residual opacity. Reduced-motion visitors now see Play clouds and can explicitly opt into movement; the scene remains static by default. Existing pause/resume, entrance reveal, visibility suspension, performance bounds, copy, imagery and slider remain intact.
- Changed aerial-survey.js, its cache version in aerial-intelligence.html, tests/aerial-survey.test.js and both records. All 33 Node tests passed, including continuous displacement/coverage across complete loops and reduced-motion playback opt-in. Existing simulated desktop/tablet/mobile geometry and slider checks passed. JavaScript syntax, 74 local references/fragments, unique IDs, localhost HTML/CSS/JS byte equality and Git whitespace passed. No build/lint scripts configured.
- Localhost is serving the current resources, but the cause in the user's browser is unconfirmed. No rendered desktop/tablet/mobile review or browser takeover in this follow-up; user manual confirmation remains required before calling the reported issue resolved. No commit or deployment.

## End-of-day release - 24 September 2026

- User accepted the final cloud flow and authorised saving, committing and pushing all current refinements to main. This covers capabilities, shared hero typography, aerial copy/layout/section order, the cloud background with playback controls, tests and retained concept preview.
- The unchanged implementation has 33 passing tests, JavaScript syntax and 74 aerial local-reference checks; localhost resources match disk. No build/lint scripts configured. Freshly fetched origin/main matches local main before commit. User visual acceptance recorded; wider device/accessibility checks remain open.
- Commit/push authorised; remote commit and clean-worktree verification follow. Production activation is not yet verified.
