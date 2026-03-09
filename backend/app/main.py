from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.database import USE_REAL_DB, Base, engine
from dotenv import load_dotenv
from .routes import team

load_dotenv()

import logging

if USE_REAL_DB and engine and Base:
    try:
        logging.basicConfig(level=logging.INFO)
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
