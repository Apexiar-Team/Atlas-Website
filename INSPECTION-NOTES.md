# Homepage aerial inspection sequence

Status: stronger zoom edit approved by the user and integrated into the local homepage. Automated checks and targeted Edge desktop/phone/tablet layout review passed. Physical-device and wider Phase 6 review remain open. Nothing deployed.

## Current media

- Homepage file: assets/media/apexiar-turbine-inspection.mp4. Byte-for-byte identical to the approved review/inspection-dramatic.mp4 (SHA256 verified).
- Exactly 10 seconds: four-second stationary approach, six-second inspection; 1600 x 902, 24 fps, 240 independently seekable H.264 frames, silent, fast-start, 13,805,629 bytes.
- Approach source: first four seconds of C:/Users/Ryanw/Desktop/website images/without water mark.mp4. The new source's rotating-turbine opening was excluded to preserve the locked-blade brief.
- Inspection source: C:/Users/Ryanw/Desktop/website images/final video.mp4. Source files remain untouched.
- Two accelerated zoom stages plus centred digital magnification (1.08 to 1.15 to 1.28). No generated texture or optical-flow interpolation. The approved footage uses a direct viewpoint cut at four seconds; the previous derivative's dissolve is not applied.
- Poster extracted at 0 seconds; evidence thumbnail extracted at 7.5 seconds from the approved edit. All three files retain their established asset paths. Inspection URLs use v=approved-zoom to refresh older cached media and code.

## Timeline

| Seconds | Footage / overlay |
| --- | --- |
| 0-4 | Stationary-turbine approach; approach copy fades out by 4s |
| 4-4.25 | Inspection establishing hold; brackets begin at 4.1s |
| 4.25-5.667 | First zoom |
| 5.667-6 | Brief hold |
| 6-7.5 | Second zoom |
| 7.5-10 | Final still close-up; evidence appears at 7.5s, finding/closing caption at 8s |

The final 60 frames before encoding are identical, giving a genuine 2.5-second hold. Lossy encoding can introduce tiny quantisation differences. The tracker has matching constant keyframes during both pauses and the final hold.

## Layout and controls

The section follows the complete operating model and original globe, before the existing Certified & Compliant strip. All unrelated homepage HTML is unchanged.

Native sticky positioning, natural scrolling, paused forward/reverse seeking and no autoplay. Lazy loading and error handling are retained. Reduced motion, missing IntersectionObserver and short landscape screens show static content. The skip link advances keyboard focus to the certification strip.

Video remains contained. Desktop evidence is positioned to the left of the larger observation; on tablet/phone it sits below the image. Tracking coordinates are normalised to the actual rendered video rectangle. The illustrative workflow label and engineering-review caveat remain; finding wording is now Potential surface damage to match the selected illustration without diagnosing it.

## Adjustment locations

- Copy, alternative text, URLs: inspection section in index.html.
- Frame rate, cut/caption timing, scroll distance, load timeout: INSPECTION_CONFIG in inspection.js.
- Manual tracking boxes: damageKeyframes in the same configuration (seconds, left, top, width, height). Calibrated against eight extracted frames from the approved edit; include margins around the observation.
- Responsive placement and type: inspection.css.
- Media edit: review/build-inspection-preview.js. Run with FFmpeg, the stationary approach source and final video source as its three quoted arguments. The script produces review/inspection-dramatic.mp4; adding --verify produces temporary pre-encoding frame hashes.
- FFmpeg used: C:/Users/Ryanw/AppData/Local/CapCut/Apps/9.4.0.4015/ffmpeg.exe. Existing local tool; no dependencies installed.

## Verification and remaining review

Passed: seven Node VM tests using node --test tests/inspection.test.js; inspection syntax; approved-media SHA256 parity; 102 local homepage references; exact unrelated-HTML preservation; homepage/CSS/JS/poster/thumbnail/capability HTTP 200 and MP4 byte-range 206. Annotated video frames reviewed for tracking alignment. Tests include the four-second cut, final evidence timing, constant final marker, reverse scrubbing and contained-video geometry at simulated 1440/768/390 sizes. No build/lint scripts configured.

Previous media checks verified full decode, 240 keyframes and 60 identical final pre-encoding frames. Seven VM tests do not constitute rendered browser/device QA.

Preview: http://localhost:4174/#aerial-inspection. The ordinary command remains npm.cmd run dev (default port 4173); the running alternative server uses PORT=4174 and supports MP4 byte ranges. Production hosting has not been verified or deployed.

Rendered review completed in Edge at the full desktop window, iPhone 16 emulation (393 x 852) and iPad Mini emulation (768 x 1024). Checked forward/reverse seeking, settled marker alignment, final hold, evidence placement and release into the certification strip. Phone and tablet evidence remains below the contained video without clipping; desktop evidence stays left of the observation. The tablet skip link advanced to the retained certification and regulated-industries content. Device emulation and DevTools were closed afterwards.

Remaining: physical-device/Safari playback, keyboard-only skip/focus, rendered reduced-motion and loading/error scenarios, plus the wider Phase 6 release review. Emulated phone/tablet checks are not physical iOS tests. Earlier URL-detection failures did not recur in this targeted browser session. No claim of a complete console audit or full-site browser sign-off.
