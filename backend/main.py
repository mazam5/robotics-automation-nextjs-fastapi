from app.main import app

@app.get("/")
async def root():
    from app.database import USE_REAL_DB
    return {"message": "Armatrix API is running", "db_mode": "REAL_DB" if USE_REAL_DB else "MEMORY"}


