from pydantic import BaseModel, Field
from typing import Optional

class TeamMemberBase(BaseModel):
    name: str = Field(..., json_schema_extra={"example": "Alice Johnson"})
    role: str = Field(..., json_schema_extra={"example": "Lead Engineer"})
    bio: str = Field(..., json_schema_extra={"example": "Alice has 10 years of experience building scalable backends."})
    photo_url: Optional[str] = Field(None, json_schema_extra={"example": "https://i.pravatar.cc/150?u=alice"})
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None

class TeamMemberCreate(TeamMemberBase):
    pass

class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None

class TeamMember(TeamMemberBase):
    id: str
    
    class Config:
        from_attributes = True
