from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from database import *
from db import get_place

router = APIRouter()

    
class Place(BaseModel):
    place_id: int
    place_name: str
    region_id: int

@router.get("/place/{place_id}", response_model=Place)
async def read_place(place_id: int):
    result = await get_place(place_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Place not found")
    return result