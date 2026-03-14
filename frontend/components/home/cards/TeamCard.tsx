"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TeamMember } from "@/lib/types";
import { Github, Linkedin, UserMinus, UserPen } from "lucide-react";

interface TeamCardProps {
    member: TeamMember;
    onEdit: (member: TeamMember) => void;
    onDelete: (member: TeamMember) => void;
}

const TeamCard = ({ member, onEdit, onDelete }: TeamCardProps) => {
    const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=27272a&color=fff&size=512`;
    const imageSrc = member.photo_url || fallbackSrc;

    return (
        <Card className="team-card h-full flex flex-col relative overflow-hidden bg-zinc-950/50 border-white/5 backdrop-blur-2xl transition-all duration-500 hover:border-blue-500/30 group will-change-transform shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.1)]">
            <CardHeader className="p-0">
                <div className="w-full h-56 overflow-hidden relative">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <img
                        src={imageSrc}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-10 brightness-[0.8] grayscale-[0.2] group-hover:grayscale-0 group-hover:brightness-100"
                        onError={(e) => {
                            // Fall back to avatar if the provided URL breaks
                            if (e.currentTarget.src !== fallbackSrc) {
                                e.currentTarget.src = fallbackSrc;
                            }
                        }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent z-20" />
                </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 relative z-30 flex-1">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">{member.name}</h3>
                <p className="text-sm text-blue-500/80 font-mono tracking-widest uppercase mb-4">{member.role}</p>
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 group-hover:text-zinc-400 transition-colors">{member.bio}</p>
            </CardContent>
            <CardFooter className="px-8 pt-0 flex items-center justify-between relative z-30">
                <div className="flex gap-4">
                    {member.linkedin_url && (
                        <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-500 transition-all hover:scale-110">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    )}
                    {member.github_url && (
                        <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-all hover:scale-110">
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 bg-zinc-900/50 border-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                        onClick={() => onEdit(member)}
                    >
                        <UserPen className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        className="h-9 w-9 backdrop-blur-sm"
                        onClick={() => onDelete(member)}
                    >
                        <UserMinus className="w-4 h-4" />
                    </Button>
                </div>
            </CardFooter>
            <div className="absolute inset-0 z-0 bg-linear-to-br from-blue-500/0 via-transparent to-blue-500/0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none" />
        </Card>
    );
};

export default TeamCard;