import os
from dotenv import load_dotenv

load_dotenv()

USE_REAL_DB = os.getenv("USE_REAL_DB", "false").lower() == "true"
DATABASE_URL = os.getenv("DATABASE_URL")

engine = None
SessionLocal = None
Base = None

if USE_REAL_DB and DATABASE_URL:
    from sqlalchemy import create_engine
    from sqlalchemy.orm import declarative_base, sessionmaker

    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base = declarative_base()

def get_db():
    if not USE_REAL_DB or not SessionLocal:
        yield None
        return
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
