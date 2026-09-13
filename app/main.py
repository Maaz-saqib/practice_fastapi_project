from fastapi import FastAPI
from . import models
from .database import engine
from .routers import post, user, auth, vote
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "https://www.google.com",
    "http://localhost:5173", # Vite React Dev Server
]  # Replace with your frontend URL in production
# [*] means allow all origins, but it's not recommended for production
# and you can also specify multiple origins in the list if needed.
# but the best practice is to specify the exact origins that are allowed to access your API. like your frontend URL.

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)

@app.get("/")
def root():
    return {"message": "Hello World!"}
