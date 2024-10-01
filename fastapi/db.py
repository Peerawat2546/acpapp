#from databases import Database
from database import database
# POSTGRES_USER = "temp"
# POSTGRES_PASSWORD = "temp"
# POSTGRES_DB = "advcompro"
# POSTGRES_HOST = "db"

# DATABASE_URL = f'postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}'

# database = Database(DATABASE_URL)

# async def connect_db():
#     await database.connect()
#     print("Database connected")

# async def disconnect_db():
#     await database.disconnect()
#     print("Database disconnected")


async def get_region(region_id: int):
    query = "SELECT * FROM region WHERE id = :id"
    return await database.fetch_one(query=query, values={"id": region_id})


async def get_place(place_id: int):
    query = "SELECT * FROM place WHERE id = :id"
    return await database.fetch_one(query=query, values={"id": place_id})


async def get_rating(rating_id: int):
    query = "SELECT * FROM rating WHERE id = :id"
    return await database.fetch_one(query=query, values={"id": rating_id})


async def get_comment(comment_id: int):
    query = "SELECT * FROM comment WHERE id = :id"
    return await database.fetch_one(query=query, values={"id": comment_id})


async def get_places():
    query = "SELECT * FROM place"
    return await database.fetch_all(query=query)

async def get_regions():
    query = "SELECT * FROM region"
    return await database.fetch_all(query=query)

async def get_comments():
    query = "SELECT * FROM comment"
    return await database.fetch_one(query=query)

async def get_ratings():
    query = "SELECT * FROM rating"
    return await database.fetch_one(query=query)
