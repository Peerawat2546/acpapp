from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from database import *
from db import get_rating

router = APIRouter()

class Rating(BaseModel):
    rating_id: int
    rating_value: float
    place_id: int

@router.get("/rating/{rating_id}", response_model=Rating)
async def read_rating(rating_id: int):
    result = await get_rating(rating_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Rating not found")
    return result