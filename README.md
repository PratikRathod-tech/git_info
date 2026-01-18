# Git Dominion

Git Dominion is an interactive, frontend-only learning platform designed to take a learner from Git fundamentals to advanced Git and GitHub mastery.

## Features

- Structured Git → GitHub syllabus (Beginner to Master)
- Dynamic sidebar navigation using Web Components
- Keyboard navigation (Arrow keys + Enter)
- Persistent progress tracking (localStorage)
- Resume last opened topic automatically
- Production-grade Tailwind CSS setup (no CDN)

## Tech Stack

- HTML5
- Tailwind CSS (CLI + PostCSS)
- Vanilla JavaScript
- Web Components
- LocalStorage

## Architecture Highlights

- Event-driven communication between components
- Decoupled sidebar and content rendering
- Static analysis–friendly Tailwind configuration
- No frameworks, no backend, no build bloat

## Why This Project

This project was built to deeply understand:
- Git concepts themselves
- Clean frontend architecture
- State management without frameworks
- Real production tooling instead of CDN shortcuts

## How to Run Locally

```bash
npm install
npx tailwindcss -i ./css/tailwind.css -o ./css/custom.css --watch
