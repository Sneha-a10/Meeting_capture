import os
import shutil
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
TEMP_DIR = "backend/temp"

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(TEMP_DIR, exist_ok=True)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_location = os.path.join(TEMP_DIR, file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": file.filename, "url": f"/temp/{file.filename}"}

@app.delete("/cleanup/")
async def cleanup_temp():
    for filename in os.listdir(TEMP_DIR):
        file_path = os.path.join(TEMP_DIR, filename)
        try:
            os.unlink(file_path)
        except Exception:
            pass
    return JSONResponse(content={"status": "cleaned"})

# Mount the temp directory to serve uploaded files
app.mount("/temp", StaticFiles(directory=TEMP_DIR), name="temp")