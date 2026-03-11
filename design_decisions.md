# Armatrix Design Decisions

This document outlines the key technical and design decisions made during the development of the Armatrix full-stack application.

## 1. Tech Stack Selection

### Frontend: Next.js + GSAP + Tailwind CSS

- **Next.js (App Router)**: Chosen for its robust routing, server-side rendering capabilities, and seamless integration with Vercel.
- **GSAP (GreenSock Animation Platform)**: Used to create high-end, premium animations (e.g., character reveal, parallax, horizontal timeline). GSAP provides granular control over performance-critical animations that would be difficult to achieve with CSS alone.
- **Tailwind CSS**: Enabled rapid UI development with a utility-first approach while maintaining consistency across the responsive design.

### Backend: FastAPI + PostgreSQL + SQLAlchemy

- **FastAPI**: A modern, high-performance web framework for building APIs with Python. It provides automatic OpenAPI documentation and excellent type safety.
- **PostgreSQL**: Selected as the primary relational database to ensure data integrity and support complex queries.
- **SQLAlchemy**: Used as the ORM to facilitate database interactions and migrations.

## 2. Architectural Decisions

### Pure PostgreSQL Data Strategy

Initially, the project had some local data fallbacks. To ensure a production-ready environment, all local CRUD operations were removed in favor of strict PostgreSQL usage. This ensures a "single source of truth" and simplifies data management across environments.

### Component-Based GSAP Transitions

Animations were refactored from global scripts into React-specific hooks (`useGSAP`) and components. This prevents animation "leaks" and ensures that triggers only fire when the relevant component is in view, significantly improving page performance.

### Responsive-First Animations

Instead of purely fixed-width animations, we implemented a responsive strategy:

- **Horizontal Journey**: Milestone cards and gaps scale based on viewport width.
- **Team Carousel**: Replaced a complex GSAP horizontal pin with a Shadcn UI Carousel for more reliable interaction on mobile and touch devices.

## 3. UI/UX Philosophy

### Premium Aesthetic

The "Armatrix" brand requires a high-tech, premium feel. This was achieved through:

- **Dark Mode by Default**: Using deep zinc colors and subtle glows.
- **Micro-interactions**: Subtle hover effects on cards and buttons.
- **Interactive Backgrounds**: WebGL fluid simulations that react to mouse movement.

### Accessibility and Responsiveness

- **Semantic HTML**: Proper use of headings and landmarks.
- **Viewport-relative Sizing**: Ensuring text and gaps are readable on devices from 320px to 4K.
- **iOS Optimization**: Ensuring form inputs use at least 16px font-size to prevent unwanted browser zooming.
