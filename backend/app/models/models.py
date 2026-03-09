from sqlalchemy import Column, String, Text
from ..database.database import Base, USE_REAL_DB

TeamMemberDB = None

if USE_REAL_DB and Base:
    class SQLAlchemyTeamMember(Base):
        __tablename__ = "team_members"
        id = Column(String(36), primary_key=True, index=True)
        name = Column(String(255), nullable=False)
        role = Column(String(255), nullable=False)
        bio = Column(Text, nullable=False)
        photo_url = Column(String(1024), nullable=False)
        linkedin_url = Column(String(1024), nullable=True)
        github_url = Column(String(1024), nullable=True)

    TeamMemberDB = SQLAlchemyTeamMember
