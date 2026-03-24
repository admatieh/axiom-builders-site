# Axiom Builders — Premium Construction Website

Axiom Builders is a high-fidelity, cinematic business website for a modern construction firm. Built with Next.js and Framer Motion, the project emphasizes structural clarity, technical coordination, and premium architectural aesthetics.

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Current Features & Pages](#current-features--pages)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Future Development](#future-development)

---

## Overview
The project is designed to feel like a real-world premium construction brand. It features a **data-driven architecture**, where all site content (text, metrics, images, and services) is separated from the UI components. This makes the codebase manageable, scalable, and ready for future integration with a backend/admin dashboard (e.g., MongoDB).

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React](https://react.dev/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/) (Cinematic reveal animations & 3D interactions)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Current Features & Pages
- **Home**: High-impact hero sequence, about preview, and featured project highlights.
- **About Page**: Company story, core values, and philosophy with architectural 3D models.
- **Services Page**: Detailed breakdown of core expertise (Interior, Construction, Exterior, etc.) with real project imagery.
- **Blog & Projects**: Premium "Coming Soon" placeholders to maintain the brand experience while content is being compiled.
- **Contact Page**: Comprehensive inquiry system including a project brief form and technical location hub.

## Project Structure
```text
src/
├── app/          # File-based routing (Home, About, Services, etc.)
├── components/   # Modular UI components (Shared & Page-specific)
│   ├── home/     # Homepage specific sections
│   ├── about/    # About page modules
│   ├── layout/   # Global components (Navbar, Footer, Shells)
│   └── ui/       # Reusable UI elements (ComingSoon, Surface)
├── data/         # Centralized content store (Source of truth for all text)
└── public/       # Static assets (Images, Icons, Local Assets)
```

## Getting Started

### 1. Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### 2. Installation
```bash
git clone <repository-url>
cd axiom-builders-site
npm install
```

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

## Future Development
The project is currently in a **"Backend-Ready"** state. 
- **Database Integration**: Content in `src/data/` is structured to map 1:1 to future MongoDB collections.
- **Admin Dashboard**: Future plans include a simple dashboard to update site content dynamically without touching the code.
- **Project Archive**: Transitioning the "Coming Soon" projects page into a full filterable portfolio.
