# Armatrix Frontend

The frontend of Armatrix is a modern Next.js application designed to provide a premium, interactive user experience. It features high-end GSAP animations, a responsive design system, and a robust administrative interface for team management.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (based on Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Scroll Library**: [Lenis](https://github.com/darkroomengineering/lenis) (Smooth Scroll)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file (if not already present) and configure any necessary API endpoints:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🎨 Key Features

- **Snake-like Visualization**: Interactive components showcasing robotic arm capabilities.
- **Horizontal Journey**: A smooth-scrolling timeline of milestones.
- **Team Management**: A Shadcn Carousel-based team display with full CRUD capabilities (Add/Edit/Delete members).
- **Responsive Animations**: Animations are optimized for all screen sizes, ensuring a premium feel on mobile and desktop alike.

## 📁 Key Directories

- `/app`: Next.js App Router pages and global layouts.
- `/components`: Reusable UI components (Shared and Section-specific).
- `/lib`: Utility functions, API clients, and TypeScript types.
- `/public`: Static assets (images, logos, videos).
