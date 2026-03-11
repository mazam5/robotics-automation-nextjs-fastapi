from app.main import app

@app.get("/")
async def root():
    return {"message": "Armatrix API is running", "db_mode": "POSTGRESQL"}