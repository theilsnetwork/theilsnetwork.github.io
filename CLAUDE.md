# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static single-page marketing site for **The ILS Network** (theILSnetwork.com), hosted on GitHub Pages via the `CNAME` file (repo name `theilsnetwork.github.io`). No build step, no package manager, no framework — just three files rendered directly by GitHub Pages:

- `index.html` — the entire site (nav, hero, about, pillars, network, connect/contact, footer), all in one page navigated via `#anchor` links.
- `style.css` — all styling. Theme is driven by CSS custom properties in the `:root` block (colors, spacing, fonts) — change those instead of hunting for hardcoded values.
- `script.js` — vanilla JS, no dependencies: scroll-triggered nav styling, mobile hamburger menu, `IntersectionObserver`-based scroll-reveal animations, smooth-scroll anchor handling, and the contact form submit handler.

## Development

There is no build, lint, or test tooling in this repo. To preview changes, just open `index.html` in a browser or serve the directory locally, e.g. `python3 -m http.server`. Changes to any of the three files are live on refresh — nothing to compile.

Publishing is automatic: pushing to `main` updates the live site through GitHub Pages (source: root of `main`).

## Contact form

The form in the `#connect` section posts to Formspree (`https://formspree.io/f/YOUR_FORM_ID` in `index.html`). `script.js` explicitly checks for the literal `YOUR_FORM_ID` placeholder and shows a "form not yet connected" message instead of submitting if it hasn't been replaced with a real Formspree form ID — keep that guard in mind when testing the form locally, since it will not actually send unless the ID is set.

## Footer links to legal pages

The footer in `index.html` links to `privacy.html`, `terms.html`, `cookies.html`, `disclaimer.html`, and `accessibility.html` — none of these files currently exist in the repo. Be aware these are dead links unless/until those pages are added.
