"use client";

import { TeamMember } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Github, Linkedin, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMemberCardProps {
    member: TeamMember;
    onEdit: (member: TeamMember) => void;
    onDelete: (id: string) => void;
}

export function TeamMemberCard({ member, onEdit, onDelete }: TeamMemberCardProps) {
    return (
        <Card className="team-card relative overflow-hidden bg-black/40 border-white/10 backdrop-blur-md transition-all duration-300 hover:border-white/30 group will-change-transform">
            <CardHeader className="p-0">
                <div className="w-full h-48 overflow-hidden relative">
                    {/* Fallback pattern if image is missing, but typically we want the src */}
                    <div className="absolute inset-0 bg-linear-to-tr from-gray-900 to-gray-800" />
                    {member.photo_url && (
                        <img
                            src={member.photo_url}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-10"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-20" />
                </div>
            </CardHeader>
            <CardContent className="p-6 relative z-30">
                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{member.name}</h3>
                <p className="text-sm text-blue-400 font-medium mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm line-clamp-3">{member.bio}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex items-center justify-between relative z-30">
                <div className="flex gap-3">
                    {member.linkedin_url && (
                        <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    )}
                    {member.github_url && (
                        <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-black/50 border-white/10 hover:bg-white/10" onClick={() => onEdit(member)}>
                        <Pencil className="w-4 h-4 text-white" />
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => onDelete(member.id)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardFooter>
            <div className="absolute inset-0 z-0 bg-linear-to-br from-blue-500/0 via-purple-500/0 to-white/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
        </Card>
    );
}
