"use client";

import { AddMemberDialog } from '@/components/AddMemberDialog';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { TeamMember, TeamMemberCreate, TeamMemberUpdate } from '@/lib/types';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { MoveRight, Plus, UserPlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Team = () => {
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

    const horizontalRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!loading && members.length > 0) {

            // Text Header Animation
            gsap.fromTo(
                containerRef.current?.querySelectorAll(".team-header-element") || [],
                { y: 60, opacity: 0, scale: 0.9, filter: "blur(10px)" },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    stagger: 0.15,
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Horizontal Scroll Animation
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const totalWidth = horizontalRef.current?.scrollWidth || 0;
                const viewportWidth = window.innerWidth;
                const scrollAmount = totalWidth - viewportWidth + 100; // adding some padding

                if (scrollAmount > 0) {
                    gsap.to(horizontalRef.current, {
                        x: -scrollAmount,
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top top",
                            end: `+=${scrollAmount}`,
                            pin: true,
                            scrub: 1,
                            invalidateOnRefresh: true,
                        }
                    });
                }
            });

            // Fallback for mobile if needed, or keeping it as is.
            // For now, let's keep the grid/vertical flow on mobile as it's more standard.
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
        <section
            id="team"
            ref={containerRef}
            className="relative py-24 md:py-32 px-4 md:px-0 md:w-4/5 mx-auto bg-transparent transition-colors duration-1000 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10 mt-20">
                <div className="flex items-center gap-4 mb-4 cursor-default">
                    <span className="text-white/95 font-bold opacity-30 select-none tracking-tighter arrow-span">
                        <MoveRight />
                    </span>
                    <span className="font-mono text-xs tracking-[0.4em] uppercase">
                        Team
                    </span>
                </div>
                <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <h1 className="team-header-element text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
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
                        <UserPlus className="w-5 h-5 mr-2" /> Add Member
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
                    <div className="md:relative -mx-4 px-4 overflow-visible">
                        <div
                            ref={horizontalRef}
                            className="flex flex-col md:flex-row gap-6 team-grid min-h-[50vh] transition-all duration-300 w-full md:w-max"
                        >
                            {members.map((member) => (
                                <div key={member.id} className="w-full md:w-87.5 shrink-0">
                                    <TeamMemberCard
                                        member={member}
                                        onEdit={openEditDialog}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <AddMemberDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                memberToEdit={memberToEdit}
                onSave={handleSave}
            />
        </section>
    )
}

export default Team