from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from database import *
from db import get_region

router = APIRouter()

class Region(BaseModel):
    region_id: int
    region_name: str

@router.get("/region/{region_id}", response_model=Region)
async def read_region(region_id: int):
    result = await get_region(region_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Region not found")
    return result



