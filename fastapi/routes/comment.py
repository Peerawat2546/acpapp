from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from database import *
from db import get_comment

router = APIRouter()

class Comment(BaseModel):
    comment_id: int
    comment_text: str
    rating_id: int

@router.get("/comment/{comment_id}", response_model=Comment)
async def read_comment(comment_id: int):
    result = await get_comment(comment_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return result

