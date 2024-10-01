from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from routes.users import router
from datetime import datetime
from db import *
from database import *
origins = [
    "http://localhost:3000",  # Allow requests from this domain (for local Next.js development)
    
]

app = FastAPI()
app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,  # Whether to allow credentials (cookies, authorization headers, etc.)
    allow_methods=["*"],  # List of allowed HTTP methods (e.g., GET, POST, PUT, etc.)
    allow_headers=["*"],  # List of allowed headers
)

# Pydantic models
class UserCreate(BaseModel):
    username: str
    password_hash: str
    email: str

class UserUpdate(BaseModel):
    username: Optional[str]
    password_hash: Optional[str]
    email: Optional[str]

class User(BaseModel):
    user_id: int
    username: str
    password_hash: str
    email: str
    created_at: datetime

class Region(BaseModel):
    id: int
    name: str

class Place(BaseModel):
    id: int
    name: str
    region_id: int

class Rating(BaseModel):
    id: int
    avg_star: float
    place_id: int

class Comment(BaseModel):
    id: int
    user_id: int
    comments: str
    rating_num: int
    place_id : int

# Startup and shutdown events to manage the database connection
@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()

# CRUD Operations for Users

# Endpoint to create a new user (POST)
@app.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    result = await insert_user(user.username, user.password_hash, user.email)
    if result is None:
        raise HTTPException(status_code=400, detail="Error creating user")
    return result

# Endpoint to get a user by user_id (GET)
@app.get("/users/{user_id}", response_model=User)
async def read_user(user_id: int):
    result = await get_user(user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")
    return result

# Endpoint to update a user by user_id (PUT)
@app.put("/users/{user_id}", response_model=User)
async def update_user_endpoint(user_id: int, user: UserUpdate):
    current_user = await get_user(user_id)
    if current_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Only update fields if provided in the request body
    updated_username = user.username if user.username is not None else current_user['username']
    updated_password_hash = user.password_hash if user.password_hash is not None else current_user['password_hash']
    updated_email = user.email if user.email is not None else current_user['email']
    
    result = await update_user(user_id, updated_username, updated_password_hash, updated_email)
    if result is None:
        raise HTTPException(status_code=400, detail="Error updating user")
    return result

# Endpoint to delete a user by user_id (DELETE)
@app.delete("/users/{user_id}")
async def delete_user_endpoint(user_id: int):
    result = await delete_user(user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted"}

# Other Endpoints (Region, Place, Rating, Comment)

# Get region by region_id
@app.get("/region/{region_id}", response_model=Region)
async def read_region(region_id: int):
    result = await get_region(region_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Region not found")
    return result

# # Get place by place_id
# @app.get("/place/{place_id}", response_model=Place)
# async def read_place(place_id: int):
#     result = await get_place(place_id)
#     if result is None:
#         raise HTTPException(status_code=404, detail="Place not found")
#     return result

# Get rating by rating_id
@app.get("/rating/{rating_id}", response_model=Rating)
async def read_rating(rating_id: int):
    result = await get_rating(rating_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Rating not found")
    return result

# Get comment by comment_id
@app.get("/comment/{comment_id}")
async def read_comment(comment_id: int):
    result = await get_comment(comment_id)
    print(result)
    if result is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return result


###

@app.get("/region")
async def read_region():
    result = await get_regions()
    if result is None:
        raise HTTPException(status_code=404, detail="Region not found")
    return result

# Get place by place_id
@app.get("/place")
async def read_place():
    result = await get_places()
    if result is None:
        raise HTTPException(status_code=404, detail="Place not found")
    return result

# Get rating by rating_id
@app.get("/rating")
async def read_rating(rating_id: int):
    result = await get_rating(rating_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Rating not found")
    return result

# Get comment by comment_id
@app.get("/comment")
async def read_comment(comment_id: int):
    result = await get_comment(comment_id)
    print(result)
    if result is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return result

# @app.post("/users/login")
# async def login():
#     return "Login"