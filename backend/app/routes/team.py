import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException

from ..schemas.schemas import TeamMember, TeamMemberCreate, TeamMemberUpdate
from ..database.database import get_db
from ..models.models import TeamMemberDB

router = APIRouter(prefix="/api/team", tags=["Team"])


@router.get("/", response_model=List[TeamMember])
async def get_team_members(db=Depends(get_db)):
    members = db.query(TeamMemberDB).all()
    return members


@router.post("/", response_model=TeamMember, status_code=201)
async def create_team_member(member_in: TeamMemberCreate, db=Depends(get_db)):
    new_id = str(uuid.uuid4())
    member_data = member_in.model_dump()
    
    # Assign default avatar if photo_url is missing or empty
    if not member_data.get("photo_url"):
        name_param = member_data.get("name", "Member").replace(" ", "+")
        member_data["photo_url"] = f"https://ui-avatars.com/api/?name={name_param}&background=random&color=fff&size=512"
        
    db_member = TeamMemberDB(id=new_id, **member_data)
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


@router.put("/{member_id}", response_model=TeamMember)
async def update_team_member(
    member_id: str, member_in: TeamMemberUpdate, db=Depends(get_db)
):
    update_data = member_in.model_dump(exclude_unset=True)

    db_member = db.query(TeamMemberDB).filter(TeamMemberDB.id == member_id).first()
    if not db_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    for key, value in update_data.items():
        setattr(db_member, key, value)
    db.commit()
    db.refresh(db_member)
    return db_member


@router.delete("/{member_id}", status_code=204)
async def delete_team_member(member_id: str, db=Depends(get_db)):
    db_member = db.query(TeamMemberDB).filter(TeamMemberDB.id == member_id).first()
    if not db_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    db.delete(db_member)
    db.commit()
    return None
