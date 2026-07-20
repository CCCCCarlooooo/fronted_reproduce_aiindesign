# Difference and Repair Log

Viewport: 1440×900. Live page height: 11209px. Final replica height: 11231px (0.20% difference).

| ID | Scene | Live evidence | Replica evidence | Severity | Repair | Final state |
|---|---|---|---|---|---|---|
| H1 | 1 Header | Header leaves the viewport after the hero (`original/scroll-01-00900.png`) | Earlier build kept it fixed | High | Changed header to document-positioned absolute layout | Closed; final scene 1 contains no fixed header |
| H2 | 1 Header menu | Read Report opens a 584px orange chapter drawer (`original/read-report-menu.png`) | Earlier build navigated directly | High | Added matching Report Chapters drawer with Tools/Craft/Teams rows and Escape/close handling | Closed; `replica/read-report-menu.png` |
| H3 | Global media/runtime | One narratively active video at a time; failures must not blank scenes | Earlier build allowed covered sticky videos to continue | High | Added scene-aware lifecycle, media fallbacks, visibility handling, and preload strategy | Closed; runtime audit reports max 1 active video and capture reports zero media failures |
| M1 | 4 Founders | Purple/sage panels meet without a gutter; counters animate (`original/scroll-02-01800.png`) | Equal panels with a 14px gap and static values | Medium | Removed gap, matched panel ratio, added scroll counters | Closed; scene similarity 93.25% |
| M2 | 7–9 Chapters | Incoming panels cover outgoing content with clipped stacking (`original/scroll-05-04500.png`, `original/scroll-07-06300.png`) | Earlier offsets exposed the next chapter too early and hid the Tools CTA | Medium | Retuned entry/exit transforms, clipped each sticky scene, and measured the Tools CTA at `top=543px` vs live ≈`544px` | Closed; final paired screenshots preserve the CTA and scene 07 pacing |
| M3 | 10 Carousel | Cards show compact title/notify treatment and lilac accent (`original/scroll-09-08100.png`) | Extra descriptions extended cards; Stripe accent differed | Medium | Hid descriptions at the reference viewport and unified the documented accent | Closed; layout and interactions match; dynamic image/frame differences remain Low |
| M4 | 12–14 Footer | Methodology, wordmark, and year have a compact cinematic sequence (`original/scroll-11-09900.png`, `original/scroll-12-10309.png`) | Earlier build entered later and ended 95px short | Medium | Retuned methodology spacing, wordmark/year spacing, and overflow behavior | Closed; final endpoint differs by 22px (0.20%) |
| M5 | Interactions | Hover state, menus, carousel color reveal, and pointer feedback are individually observable | Earlier particle capture retained menu focus/overlay | Medium | Added deterministic interaction captures and corrected close/focus timing | Closed; see hover/menu/carousel/particle screenshots |
| L1 | Dynamic media | Live and replica use the same verified hero/chapter/preview assets | Captured frames differ because videos are time-varying | Low | No visual substitution; retain authentic source media | Accepted with evidence |
| L2 | Partner logos | Live uses exact brand SVG lockups | Replica uses simplified vector/text approximations | Low | Kept lightweight approximations to preserve layout without copying large path payloads | Accepted and disclosed |
| L3 | Very short viewports | No short-height target was specified | `min-height: 720px` makes scenes taller than sub-720px viewports | Low | Preserve readable 720px minimum while supporting tested 768/900/1080 heights | Accepted and disclosed |
| L4 | Menu accessibility polish | Visual behavior matches and Escape closes both menus | Header triggers do not expose every optional ARIA state and focus is not restored after close | Low | No visual/runtime impact; retain as documented accessibility polish | Accepted and disclosed |
| L5 | Report drawer typography | Live drawer row numbers sit at slightly different offsets | Replica row/number alignment is a few pixels different | Low | Preserve current evidence-backed 584px composition | Accepted and disclosed |

## Objective evidence arbitration

- Same-source video frame differences are retained as Low because network URLs, intrinsic dimensions, and browser loading are verified; replacing them with unrelated static imagery would conflict with source evidence.
- Raw mean pixel similarity is secondary because dynamic media frames dominate pixel differences. Scene structure, measured coordinates, colors, typography, and interactions are evaluated semantically by the independent designer.
