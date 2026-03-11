# Armatrix Backend

The backend of Armatrix is a high-performance REST API built with FastAPI and Python. It manages the core data for the team and capabilities, ensuring secure and efficient interaction with the PostgreSQL database.

## 🛠️ Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Data Validation**: [Pydantic v2](https://docs.pydantic.dev/latest/)
- **Deployment**: [Vercel (Python Runtime)](https://vercel.com/docs/functions/runtimes/python)

## 🚀 Getting Started

### 1. Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=postgresql://user:password@localhost/armatrix
```

### 4. Run the Server

```bash
uvicorn main:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000).

- **Interactive Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Alt Docs (Redoc)**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 📁 Key Directories

- `/app/models`: SQLAlchemy database models.
- `/app/schemas`: Pydantic models for request/response validation.
- `/app/routes`: FastAPI router endpoints (e.g., Team management).
- `/app/database`: Database connection and session management.

## 🚢 Deployment (Vercel)

The backend is configured for Vercel deployment via `vercel.json` and `@vercel/python`. Make sure to set the `DATABASE_URL` environment variable in the Vercel project settings.
