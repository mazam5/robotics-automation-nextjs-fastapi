from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import logging
load_dotenv()

logging.basicConfig(level=logging.INFO)

from .database.database import Base, engine
from .routes import team

if engine and Base:
    try:
        Base.metadata.create_all(bind=engine)
        logging.info("Successfully connected to the database.")
    except Exception as e:
        logging.error(f"Failed to connect to the database. Please check your DATABASE_URL in the .env file. Error: {e}")
        # Raising the exception to prevent the app from starting with a broken DB connection
        raise e

app = FastAPI(title="Armatrix API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(team.router)
