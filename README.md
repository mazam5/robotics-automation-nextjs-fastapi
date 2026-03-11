# Armatrix - Full Stack Snake-like Robotic Arm Platform

Armatrix is a premium web platform showcasing innovative snake-like robotic arm technology designed for inspecting tight spaces within complex machinery.

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/mazam5/robotics-automation-nextjs-fastapi.git
cd robotics-automation-nextjs-fastapi
```

### 2. Setup Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Set DATABASE_URL in .env
uvicorn main:app --reload
```

*Note: Ensure you have a PostgreSQL database running and accessible.*

### 3. Setup Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

*Open [http://localhost:3000](http://localhost:3000) to view the application.*

Frontend: <https://azam-armatrix.vercel.app>

Backend: <https://armatrix-nextjs-fastapi-gsap.onrender.com>

## 📁 Project Structure

- `/frontend`: Next.js application with GSAP animations and Shadcn UI components.
- `/backend`: FastAPI service with PostgreSQL integration and SQLAlchemy ORM.
- `design_decisions.md`: In-depth look at our technology choices and architectural patterns.

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, GSAP, Lucide Icons.
- **Backend**: Python, FastAPI, SQLAlchemy, Pydantic, PostgreSQL.
- **Deployment**: Vercel (Frontend & Backend).

## 📄 Documentation

For detailed information on each component, refer to the respective README files:

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Design Decisions](./design_decisions.md)
