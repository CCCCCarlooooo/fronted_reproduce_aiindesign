# Difference Checklist — Original vs Replica

## Scene-by-Scene Comparison

### Scene 1: Hero (0-800px)
| Item | Original | Replica | Severity | Status |
|------|----------|---------|----------|--------|
| Title font | Beausite Classic Medium 120px | DM Serif Display ~10vw | Low | Google Fonts fallback for proprietary font — acceptable |
| Nav layout | Left sidebar with hover animations | Left sidebar with hover animations | Low | Matches |
| DF logo | Decorative SVG path on right | CSS text with Cormorant Garamond italic | Low | Close visual approximation |
| "Scroll to read" | Link with arrow icon | Link with animated arrow SVG | Low | Matches |
| Content centering | Vertically centered | Vertically centered (with -5vh offset) | Low | Fixed |

### Scene 2: Partners (800-1500px)
| Item | Original | Replica | Severity | Status |
|------|----------|---------|----------|--------|
| "OUR PARTNERS" label | Monospace uppercase | Geist Mono uppercase | Low | Matches |
| Large DF logo | Massive SVG decorative text | CSS text with Cormorant Garamond | Low | Close approximation |
| Scale animation | Scale on scroll | GSAP fromTo scale | Low | Matches |

### Scene 3: Inflection Point (1500-3500px)
| Item | Original | Replica | Severity | Status |
|------|----------|---------|----------|--------|
| Heading style | Serif 32px | DM Serif Display 32px | Low | Matches |
| Counter animation | Animated count-up on scroll | IntersectionObserver + requestAnimationFrame | Low | Matches |
| Stats layout | Two stats side by side | Flex row with gap | Low | Matches |
| Body text | 15px Inter | 15px Inter | Low | Matches |

### Scene 4: Quote (3500-5000px)
| Item | Original | Replica | Severity | Status |
|------|----------|---------|----------|--------|
| Portrait | B&W photo of Katie Dill | Grayscale filter on same image | Low | Matches |
| Quote style | Italic serif | DM Serif Display italic | Low | Matches |
| Layout | Grid 2-col | CSS Grid 1fr 1fr | Low | Matches |
| Reveal animation | Clip-path reveal | GSAP clipPath fromTo | Low | Matches |

### Scenes 5-7: Chapters (5000-9500px)
| Item | Original | Replica | Severity | Status |
|------|----------|---------|----------|--------|
| Chapter number | Large faded number | DM Serif Display with low opacity | Low | Matches |
| Heading | Serif 40px | DM Serif Display 40px | Low | Matches |
| Bullet list | Dash prefix bullets | CSS ::before pseudo-element | Low | Matches |
| CTA | Underline link with arrow | Border-bottom with arrow SVG | Low | Matches |

### Scene 8: Case Studies (9500-12500px)
| Item | Original | Replica | Severity | Status |
|------|----------|---------|----------|--------|
| Background | Black | #000 | Low | Matches |
| Card layout | Photo left, text right | CSS Grid 280px 1fr | Low | Matches |
| Photos | Original framerusercontent images | Same URLs (verified) | Low | Matches |
| Hover effect | Desaturate on hover | CSS filter transition | Low | Matches |
| "Coming soon" badge | Small text overlay | Absolute positioned text | Low | Matches |

### Scene 9: Coming Soon (12500-14000px)
| Item | Original | Replica | Severity | Status |
|------|----------|---------|----------|--------|
| Video | WebM autoplay muted loop | Same webm URL (verified) | Low | Matches |
| Heading | Serif white text | DM Serif Display | Low | Matches |
| CTA button | Bordered button | Border + hover transition | Low | Matches |

### Scene 10: Subscribe (14000-15500px)
| Item | Original | Replica | Severity | Status |
|------|----------|---------|----------|--------|
| Heading | Serif centered | DM Serif Display | Low | Matches |
| Form | Input + Submit button | Flex row input + button | Low | Matches |
| Legal text | Small gray text | 11px rgba color | Low | Matches |

### Scene 11: Methodology (15500-16500px)
| Item | Original | Replica | Severity | Status |
|------|----------|---------|----------|--------|
| Stats | Count-up numbers | IntersectionObserver + RAF | Low | Matches |
| Partner logos | SVG text logos in grid | Dark blocks with white text | Medium | Simplified approximation |

### Scene 12: Footer (16500-17200px)
| Item | Original | Replica | Severity | Status |
|------|----------|---------|----------|--------|
| Links | REPORT section with links | Same structure | Low | Matches |
| Copyright | Small gray text | 12px rgba | Low | Matches |
| Credit | "Made in Framer by ++hellohello" | Same text, link to example.com | Low | Matches |

## Summary
- **High issues**: 0
- **Medium issues**: 1 (partner logo blocks vs original SVG logos)
- **Low issues**: Multiple font/typography approximations due to proprietary font (Beausite Classic → DM Serif Display)

## Known Limitations
1. Beausite Classic is a proprietary font not available via CDN; DM Serif Display is the closest Google Fonts alternative
2. Partner logos use styled text blocks instead of original SVG wordmark logos
3. DF logo uses CSS text styling instead of the original custom SVG paths
4. Original site uses Framer's built-in scroll animations; replica uses GSAP ScrollTrigger
