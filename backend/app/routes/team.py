import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException

from ..schemas.schemas import TeamMember, TeamMemberCreate, TeamMemberUpdate
from ..database.database import get_db, USE_REAL_DB
from ..models.models import TeamMemberDB

router = APIRouter(prefix="/api/team", tags=["Team"])

# --- In-Memory DB (Fallback) ---
team_db: dict[str, TeamMember] = {}

# Seed data
initial_members = [
    TeamMember(
        id=str(uuid.uuid4()),
        name="Alex Mercer",
        role="Founder & CEO",
        bio="Visionary leader with a passion for building innovative tech solutions at Armatrix.",
        photo_url="https://i.pravatar.cc/300?u=alex",
        linkedin_url="https://linkedin.com",
    ),
    TeamMember(
        id=str(uuid.uuid4()),
        name="Sarah Chen",
        role="Head of Design",
        bio="Creating beautiful, intuitive user experiences that bridge the gap between human and machine.",
        photo_url="https://i.pravatar.cc/300?u=sarah",
        github_url="https://github.com",
    ),
    TeamMember(
        id=str(uuid.uuid4()),
        name="Marcus Johnson",
        role="Lead Full-Stack Engineer",
        bio="Architecting robust and scalable systems. Loves Python, React, and pushing the boundaries of WebGL.",
        photo_url="https://i.pravatar.cc/300?u=marcus",
        linkedin_url="https://linkedin.com",
        github_url="https://github.com",
    ),
    TeamMember(
        id=str(uuid.uuid4()),
        name="Elena Rodriguez",
        role="Product Manager",
        bio="Turning complex requirements into actionable roadmaps. Ensures the team delivers maximum value.",
        photo_url="https://i.pravatar.cc/300?u=elena",
    )
]

for member in initial_members:
    team_db[member.id] = member

@router.get("/", response_model=List[TeamMember])
async def get_team_members(db=Depends(get_db)):
    if USE_REAL_DB and db:
        members = db.query(TeamMemberDB).all()
        return members
    return list(team_db.values())

@router.post("/", response_model=TeamMember, status_code=201)
async def create_team_member(member_in: TeamMemberCreate, db=Depends(get_db)):
    new_id = str(uuid.uuid4())
    if USE_REAL_DB and db:
        db_member = TeamMemberDB(id=new_id, **member_in.model_dump())
        db.add(db_member)
        db.commit()
        db.refresh(db_member)
        return db_member

    new_member = TeamMember(id=new_id, **member_in.model_dump())
    team_db[new_id] = new_member
    return new_member

@router.put("/{member_id}", response_model=TeamMember)
async def update_team_member(member_id: str, member_in: TeamMemberUpdate, db=Depends(get_db)):
    update_data = member_in.model_dump(exclude_unset=True)
    
    if USE_REAL_DB and db:
        db_member = db.query(TeamMemberDB).filter(TeamMemberDB.id == member_id).first()
        if not db_member:
            raise HTTPException(status_code=404, detail="Team member not found")
        for key, value in update_data.items():
            setattr(db_member, key, value)
        db.commit()
        db.refresh(db_member)
        return db_member

    if member_id not in team_db:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    existing_member = team_db[member_id]
    updated_member = existing_member.model_copy(update=update_data)
    team_db[member_id] = updated_member
    return updated_member

@router.delete("/{member_id}", status_code=204)
async def delete_team_member(member_id: str, db=Depends(get_db)):
    if USE_REAL_DB and db:
        db_member = db.query(TeamMemberDB).filter(TeamMemberDB.id == member_id).first()
        if not db_member:
            raise HTTPException(status_code=404, detail="Team member not found")
        db.delete(db_member)
        db.commit()
        return None

    if member_id not in team_db:
        raise HTTPException(status_code=404, detail="Team member not found")
    del team_db[member_id]
    return None
