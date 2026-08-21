from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, Annotated

# POST SCHEMA

class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    created_at: datetime
    owner_id: int
    owner: "User"  # Forward reference to the User model

    class Config:
        from_attributes = True
        
class PostOut(BaseModel):
    Post: Post
    votes: int

    class Config:
        from_attributes = True


# USER SCHEMA

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    
class User(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True
        
class UserLogin(BaseModel):
    email: EmailStr
    password: str
    

    #   TOKEN SCHEMA 
class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    id: Optional[int] = None
    
#  VOTE SCHEMA

class Vote(BaseModel):
    post_id: int
    dir: Annotated[int, Field(ge=0, le=1)]  # Ensure dir is either 0 or 1