# Design System

## Direction

Editorial Engineering: an off-white editorial base, near-black type, thin rules, large display typography and one accent per project.

## Tokens

Core tokens are defined in `styles/globals.css`: surfaces, foregrounds, type sizes, spacing, border colors and transition timing.

## Typography

Geist Sans is used for display/body and Geist Mono for labels, metadata and technical annotations. Both are loaded with `next/font`.

## Motion

Motion uses small CSS transforms, opacity changes and image-scale transitions. There is no scroll hijacking. `prefers-reduced-motion: reduce` disables non-essential transitions and smooth scrolling.

## Layout

The site uses a wide editorial container, asymmetric two-column case-study sections and responsive collapse points at 1024px, 768px and 560px.
