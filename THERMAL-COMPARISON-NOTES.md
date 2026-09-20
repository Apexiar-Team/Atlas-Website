# Aerial Intelligence: visible / thermal comparison

Implemented locally after the existing thermal explanation and before the security concept. All pre-existing page content, images, links and metadata are preserved. No dependency, commit or deployment.

## Sources and alignment

- Current visible source: `C:/Users/Ryanw/Desktop/website images/New normal.png` (3,259,452 bytes).
- Current thermal source: `C:/Users/Ryanw/Desktop/website images/new thermal.png` (2,461,551 bytes).
- Both originals are 1672 x 941 and remain untouched. Current full-resolution JPEG derivatives are `assets/Design/Aerial/railway-visible-v2.jpg` (586,323 bytes) and `railway-thermal-v2.jpg` (351,679 bytes), approximately 84% smaller combined.
- Earlier Desktop sources `tresspassers without thermal.png` and `tresspassers with thermal.png`, and web derivatives `railway-visible.jpg` and `railway-thermal.jpg`, are retained unchanged.
- Encoded with the existing CapCut FFmpeg, `-frames:v 1 -q:v 2 -pix_fmt yuvj444p`, without scaling, cropping or registration changes. No new tooling installed.
- Inspected the revised sources, a 50% blend and split composites at approximately 40%, 73% and 81%. Rail edges, major tree outlines and both people occupy closely matching positions; no obvious global translation/scale correction was warranted. Minor local foliage and figure-edge differences remain in the illustrations and are not corrected by a simple global transform. This is a visual assessment, not a pixel-perfect registration claim.
- The split comparisons show neither person thermally at 40%, the first at 73%, and both at 81%. The source people are around 69% and 77% across the frame.

## Where to adjust

- Starting position: `value="40"` on `#thermal-reveal` in `aerial-intelligence.html`; JavaScript reads the native range value.
- Heading, description, instruction, caption and image alt: the `#thermal-comparison` section in the same file.
- Alignment: `--thermal-x`, `--thermal-y` and `--thermal-scale` on `.thermal-comparison` in `thermal-comparison.css`. Defaults are 0%, 0% and 1. Keep changes subtle and recheck all landmarks and image edges; any non-default transform can crop or expose edges.
- Visual treatment, full aspect ratio, labels and focus ring: `thermal-comparison.css`.
- Visible exposure: `--visible-brightness: 1` and `--visible-contrast: 1` in the same stylesheet. Both are neutral for the revised pair; the previous 0.58 / 1.12 dusk treatment is no longer applied. Supplied exposure, image scale and registration are preserved.
- Pointer, loading/fallback and label-fit behaviour: `thermal-comparison.js`.

## Behaviour and accessibility

Both images keep the full 1672:941 ratio at every screen width. The thermal wrapper is clipped from the left; image dimensions never change with slider position. No centre crop, automated motion, detections, confidence values or temperature readings.

The native range provides keyboard and assistive-technology semantics, a descriptive label, help/caption references and percentage value text. Focusing it outlines the entire comparison and its handle. Pointer enhancement makes the entire image a generous drag target; the visible handle is 42px. Vertical touch gestures are left to browser scrolling through `touch-action: pan-y pinch-zoom` and an intent threshold. Labels hide before their side becomes too narrow, including the 0/100% endpoints.

The range stays disabled and the visible image remains the only view until both images have loaded and decoded. A thermal failure returns to the visible image and a status message. Missing JavaScript leaves the visible image and all explanatory text available. Intrinsic dimensions and CSS aspect ratio reserve space; both derivatives load lazily.

## Verification

- Six comparison behaviour tests plus seven existing inspection tests passed. Covers pending/decoded/cached images, load/decode/mismatched-image failure, mouse capture and clamping, vertical/horizontal touch intent, cancellation, range input updates, label fit and resizing. Mocked frame widths: 1320, 688, 350 and 280px. These tests do not simulate a real touchscreen or native browser key handling.
- JavaScript syntax, Git whitespace, existing-content preservation, 70 local aerial page references, unique IDs, ARIA references and preview HTTP 200 checks completed. No build/lint commands configured.
- Source and derivative alignment composites reviewed. Revised pair reviewed in Edge desktop, iPad Mini emulation (768 x 1024) and iPhone 16 emulation (393 x 852). Full image framing, dragging and readable copy confirmed. Desktop Home/End keys reached the correct endpoints with the appropriate label and visible focus. Physical touchscreen, keyboard-only tab navigation and rendered loading/error checks remain open.

Preview: http://localhost:4174/aerial-intelligence.html#thermal-comparison

## Earlier darker visible-light refinement (superseded)

The user accepted the comparison and requested a darker visible scene. The earlier visible-only CSS filter used brightness 0.58 and contrast 1.12; neither JPEG nor the thermal treatment changed. Six comparison tests, asset/script hash preservation, existing HTML preservation, 70 local references, HTTP and whitespace checks passed. The newly supplied pair replaces this presentation and resets both exposure values to 1.

Reviewed the refreshed Edge desktop page at the initial 40% split: the visible scene is darker, both figures are less obvious, and the rail corridor and dusk sky remain legible. Thermal imagery, the gold divider and labels remain clear. Rendered tablet/phone exposure review and earlier physical-touch/keyboard checks are still outstanding. No interaction logic or layout dimensions changed in this refinement.

### Revised supplied visible / thermal pair

- Replaced the active comparison images with optimised copies of Desktop/website images/New normal.png and new thermal.png. Both are 1672 x 941. New assets railway-visible-v2.jpg (586,323 bytes) and railway-thermal-v2.jpg (351,679 bytes) retain full dimensions and supplied exposure. Original PNGs and both earlier web JPEGs remain untouched.
- Reset visible brightness/contrast variables to 1 and refreshed the CSS version URL. Slider JS, default 40% position, labels, caption, page copy, layout and image alignment are unchanged. No additional crop, registration or colour adjustment applied.
- Reviewed both new sources, a 50% blend and 40/73/81% split composites. Rails, trees and figure positions align closely; minor local illustration differences remain. First figure is revealed by approximately 73% and both by 81%. No pixel-perfect alignment claim.
- Files: aerial-intelligence.html, thermal-comparison.css, the two new assets, THERMAL-COMPARISON-NOTES.md, WEBSITE-RESTRUCTURE-PLAN.md and WEBSITE-QA-REPORT.md. M30 inventory 88; M32 updated.
- Six existing comparison tests passed (including mocked desktop/tablet/phone widths), plus previous-asset and script hash preservation, exact HTML reversal except newline normalisation, 70 local references, four HTTP 200 checks and Git whitespace. No build/lint scripts configured. No commit or deployment.
- Browser follow-up: reviewed the revised pair at desktop size, iPad Mini 768 x 1024 and iPhone 16 393 x 852 in Edge. The visible figures blend into vegetation; dragging right reveals both thermal figures. Full frame, copy and labels fit all three sizes. Desktop Home/End produced visible-only/thermal-only views and correct labels; focus remained visible. Restored desktop and closed DevTools. Device emulation does not replace physical touch/Safari testing; keyboard-only tab navigation and rendered loading/error cases remain open.
