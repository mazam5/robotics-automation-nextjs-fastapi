"use client";

import { useEffect, useState, useRef } from "react";
import { TeamMember, TeamMemberCreate, TeamMemberUpdate } from "@/lib/types";
import { api } from "@/lib/api";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { AddMemberDialog } from "@/components/AddMemberDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveBackground from "@/components/InteractiveBackground";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState<TeamMember | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const data = await api.getTeamMembers();
            setMembers(data);
        } catch (error) {
            console.error("Failed to fetch members:", error);
        } finally {
            setLoading(false);
        }
    };

    useGSAP(() => {
        if (!loading && members.length > 0) {

            // Text Header Animation
            gsap.fromTo(
                containerRef.current?.querySelectorAll(".team-header-element") || [],
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "expo.out"
                }
            );

            // Cards ScrollTrigger Animation
            const cards = gsap.utils.toArray(".team-card");

            gsap.fromTo(
                cards,
                { opacity: 0, y: 100, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".team-grid",
                        start: "top 80%",
                        end: "bottom bottom",
                        toggleActions: "play none none reverse",
                    },
                    clearProps: "all"
                }
            );
        }
    }, { dependencies: [loading, members], scope: containerRef });

    const handleSave = async (data: TeamMemberCreate | TeamMemberUpdate, id?: string) => {
        if (id) {
            await api.updateTeamMember(id, data as TeamMemberUpdate);
        } else {
            await api.createTeamMember(data as TeamMemberCreate);
        }
        await fetchMembers();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this team member?")) {
            await api.deleteTeamMember(id);
            await fetchMembers();
        }
    };

    const openAddDialog = () => {
        setMemberToEdit(null);
        setDialogOpen(true);
    };

    const openEditDialog = (member: TeamMember) => {
        setMemberToEdit(member);
        setDialogOpen(true);
    };

    return (
        <main className="min-h-screen relative px-4 md:px-8 py-20 pb-24 font-sans bg-black" ref={containerRef}>
            <InteractiveBackground />

            <div className="max-w-7xl mx-auto relative z-10 mt-20">
                <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <h1 className="team-header-element text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
                            Meet the <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">Armatrix</span> Team
                        </h1>
                        <p className="team-header-element text-zinc-600 text-lg md:text-2xl font-light leading-relaxed scrub-text bg-linear-to-r from-white via-white to-zinc-600 bg-clip-text bg-size-[200%_100%] bg-position-[100%]">
                            We are a collective of visionaries, engineers, and designers building the future of robotics.
                        </p>
                    </div>
                    <Button
                        onClick={openAddDialog}
                        className="team-header-element bg-white text-black hover:bg-zinc-200 px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all shrink-0 font-medium"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add Member
                    </Button>
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 team-grid">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-96 rounded-xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : members.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 team-grid">
                        <h3 className="text-2xl font-semibold text-white mb-2">No team members yet</h3>
                        <p>Click the "Add Member" button to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 team-grid min-h-[50vh]">
                        {members.map((member) => (
                            <TeamMemberCard
                                key={member.id}
                                member={member}
                                onEdit={openEditDialog}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            <AddMemberDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                memberToEdit={memberToEdit}
                onSave={handleSave}
            />
        </main>
    );
}
