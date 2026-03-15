"use client";

import { AddMemberDialog } from '@/components/AddMemberDialog';
import TeamCard from '@/components/home/cards/TeamCard';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { api } from '@/lib/api';
import { TeamMember, TeamMemberCreate, TeamMemberUpdate } from '@/lib/types';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveRight, UserPlus } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DRAG_THRESHOLD = 5;

function useTapToClick(ref: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let startX = 0;
        let startY = 0;

        const onPointerDown = (e: PointerEvent) => {
            startX = e.clientX;
            startY = e.clientY;
        };

        const onPointerUp = (e: PointerEvent) => {
            const dx = Math.abs(e.clientX - startX);
            const dy = Math.abs(e.clientY - startY);

            if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) {
                const target = e.target as HTMLElement;
                const anchor = target.closest("a");
                if (anchor) {
                    const href = anchor.getAttribute("href");
                    if (href) {
                        const isExternal =
                            anchor.target === "_blank" ||
                            href.startsWith("http") ||
                            href.startsWith("//");

                        if (isExternal) {
                            window.open(href, "_blank", "noopener,noreferrer");
                        } else {
                            window.location.href = href;
                        }
                    }
                }
            }
        };

        el.addEventListener("pointerdown", onPointerDown);
        el.addEventListener("pointerup", onPointerUp);

        return () => {
            el.removeEventListener("pointerdown", onPointerDown);
            el.removeEventListener("pointerup", onPointerUp);
        };
    }, [ref]);
}

const Team = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState<TeamMember | null>(null);
    // ── Delete confirmation state ──────────────────────────────────────────
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Guard so entrance animations only fire once on initial load
    const animationsRanRef = useRef(false);

    useTapToClick(carouselRef);

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

    const refreshScrollTriggers = useCallback(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                ScrollTrigger.refresh(true);
            });
        });
    }, []);

    // ── Entrance animations — runs ONCE when data first loads ──────────────
    useGSAP(() => {
        if (!loading && members.length > 0 && !animationsRanRef.current) {
            animationsRanRef.current = true;

            const ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: stickyRef.current,
                    pinSpacing: false,
                });

                gsap.fromTo(
                    ".team-header-element",
                    { y: 60, opacity: 0, scale: 0.95, filter: "blur(8px)" },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        stagger: 0.12,
                        duration: 1.1,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                gsap.fromTo(
                    ".scrub-text",
                    { backgroundPosition: "100% 50%" },
                    {
                        backgroundPosition: "0% 50%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 60%",
                            end: "25% top",
                            scrub: 1.5,
                        },
                    }
                );

                if (carouselRef.current) {
                    gsap.fromTo(
                        carouselRef.current,
                        { x: 80, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 1,
                            ease: "expo.out",
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "10% 70%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }
            }, containerRef);

            return () => ctx.revert();
        }
    }, { dependencies: [loading], scope: containerRef });

    useEffect(() => {
        if (!loading && animationsRanRef.current) {
            refreshScrollTriggers();
        }
    }, [members, loading, refreshScrollTriggers]);

    const handleSave = async (data: TeamMemberCreate | TeamMemberUpdate, id?: string) => {
        if (id) {
            await api.updateTeamMember(id, data as TeamMemberUpdate);
        } else {
            await api.createTeamMember(data as TeamMemberCreate);
        }
        await fetchMembers();
    };

    const handleDeleteRequest = (member: TeamMember) => {
        setMemberToDelete(member);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!memberToDelete) return;
        setIsDeleting(true);
        try {
            await api.deleteTeamMember(memberToDelete.id);
            await fetchMembers();
        } catch (error) {
            console.error("Failed to delete member:", error);
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setMemberToDelete(null);
        }
    };

    const openAddDialog = () => { setMemberToEdit(null); setDialogOpen(true); };
    const openEditDialog = (member: TeamMember) => { setMemberToEdit(member); setDialogOpen(true); };

    return (
        <section
            id="team"
            ref={containerRef}
            className="relative bg-transparent transition-colors duration-1000 w-full md:w-4/5 mx-auto md:min-h-[200vh]"
        >
            <div
                ref={stickyRef}
                className="sticky top-0 h-screen w-full flex flex-col justify-center pt-20 md:pt-24 pb-8"
            >
                <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10 flex flex-col gap-4 sm:gap-5 md:gap-6">

                    {/* ── Label row ── */}
                    <div className="flex items-center gap-3 sm:gap-4 cursor-default">
                        <span className="text-white/95 font-bold opacity-30 select-none tracking-tighter">
                            <MoveRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.4em] uppercase">
                            Our Team
                        </span>
                    </div>

                    {/* ── Header ── */}
                    <header className="flex flex-row items-start justify-between gap-4 sm:gap-6">
                        <div className="flex flex-col gap-3 sm:gap-4 max-w-2xl">
                            <h1 className="team-header-element text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-tight">
                                Meet the{" "}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
                                    Armatrix
                                </span>{" "}
                                Team
                            </h1>
                            <p
                                className="team-header-element scrub-text text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed bg-linear-to-r from-white via-white to-zinc-600 bg-clip-text text-transparent"
                                style={{ backgroundSize: "200% 100%", backgroundPosition: "100% 0%" }}
                            >
                                We are a collective of visionaries, engineers, and designers building the future of robotics.
                            </p>
                        </div>

                        <Button
                            onClick={openAddDialog}
                            className="team-header-element bg-white text-black hover:bg-zinc-200 px-5 sm:px-7 py-4 sm:py-5 text-sm sm:text-base rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all shrink-0 font-medium"
                        >
                            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Add Member
                        </Button>
                    </header>

                    {/* ── Cards / Carousel ── */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-56 sm:h-64 md:h-72 rounded-xl bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    ) : members.length === 0 ? (
                        <div className="text-center py-12 sm:py-16 text-gray-400">
                            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">No team members yet</h3>
                            <p className="text-sm sm:text-base">Click the "Add Member" button to get started.</p>
                        </div>
                    ) : (
                        <div ref={carouselRef}>
                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: false,
                                    watchDrag: true,
                                    dragFree: false,
                                }}
                                className="w-full"
                            >

                                <div className="flex items-center justify-end gap-2 mb-3 sm:mb-4">
                                    <CarouselPrevious className="static translate-y-0 bg-white/10 hover:bg-white/20 border-white/20 text-white" />
                                    <CarouselNext className="static translate-y-0 bg-white/10 hover:bg-white/20 border-white/20 text-white" />
                                </div>

                                <CarouselContent className="-ml-3 sm:-ml-4">
                                    {members.map((member) => (
                                        <CarouselItem
                                            key={member.id}
                                            className="pl-3 sm:pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                        >
                                            <TeamCard
                                                member={member}
                                                onEdit={openEditDialog}
                                                onDelete={handleDeleteRequest}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Add / Edit dialog ── */}
            <AddMemberDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                memberToEdit={memberToEdit}
                onSave={handleSave}
            />

            {/* ── Delete confirmation dialog ── */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className="bg-zinc-900 border-white/10 text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove team member?</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                            This will permanently remove{" "}
                            <span className="text-white font-medium">
                                {memberToDelete?.name}
                            </span>{" "}
                            from the team. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={isDeleting}
                            className="bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-white"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isDeleting}
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700 text-white border-0"
                        >
                            {isDeleting ? "Removing…" : "Remove"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
};

export default Team;