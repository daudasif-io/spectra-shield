<div align="center">

# Spectra Shield — Interactive 3D Product Experience

**Six-environment 3D showcase built with React Three Fiber and hold-to-advance interaction**

[![Live Site](https://img.shields.io/badge/Live%20Site-spectra--shield.vercel.app-gold?style=for-the-badge&logo=vercel&logoColor=white)](https://spectra-shield.vercel.app)
[![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-black?style=for-the-badge&logo=three.js)](https://r3f.docs.pmnd.rs)
[![React](https://img.shields.io/badge/React%2018-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)

</div>

---

## Overview

An interactive 3D product showcase demonstrating an immersive alternative to traditional image carousels. Users navigate six themed environments — each with a unique accent color, 3D wireframe model, and atmospheric lighting — by holding a button down to advance. Built as a proof-of-concept for high-end product marketing pages.

## Tech Stack

| Layer | Technology |
|---|---|
| 3D Framework | React Three Fiber |
| Core 3D | Three.js |
| UI Framework | React 18 |
| Styling | Tailwind CSS |
| Deployment | Vercel |

## Key Features

- **Six Themed Environments** — each slide has its own accent color scheme, lighting setup, and ambient feel
- **Hold-to-Advance Interaction** — user holds a button (or touch) to progress; releases to pause — creates deliberate, controlled navigation unlike standard click-through carousels
- **Custom Wireframe 3D Models** — each environment features a unique wireframe geometric model built with Three.js geometry primitives, styled to match the environment's color theme
- **Smooth Environment Transitions** — color, lighting, and model swap with cross-fade between slides
- **Touch + Mouse Support** — hold interaction works on both desktop (mousedown/up) and mobile (touchstart/end)

## The Six Environments

| Slide | Theme | Accent Color |
|---|---|---|
| 1 | Arctic | Ice Blue |
| 2 | Ember | Deep Orange |
| 3 | Phantom | Electric Purple |
| 4 | Verdant | Forest Green |
| 5 | Void | Pure White |
| 6 | Solaris | Solar Gold |

## Technical Notes

**Next.js 14 / React 18 (not 15/19)** — React Three Fiber's peer dependency tree requires React 18. Upgrading to Next.js 15 (which pulls React 19) breaks R3F compatibility. This project is pinned to Next.js 14 + React 18 for stable WebGL rendering.

## Local Development

```bash
git clone https://github.com/daudasif-io/spectra-shield.git
cd spectra-shield
npm install
npm run dev
```

## Live Site

**[spectra-shield.vercel.app](https://spectra-shield.vercel.app)**

---

<div align="center">
Built by <a href="https://linkedin.com/in/daudasif-dev">Daud Asif</a> · <a href="mailto:daudasif1213@gmail.com">daudasif1213@gmail.com</a>
</div>
