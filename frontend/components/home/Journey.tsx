"use client";

import { useTheme } from "@/lib/ThemeContext";
import { Milestone } from "@/lib/types";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, DollarSign, Globe, MoveRight, Rocket, ShieldCheck, Trophy, Zap } from "lucide-react";
import { useRef } from "react";
import JourneyCard from "./cards/JourneyCard";

const milestones: Milestone[] = [
    {
        date: "OCT 2023",
        title: "Global Technical Validation",
        description: "Awarded Best Presentation at the International Astronautical Congress (IAC) for pioneering work on control systems for hyper-redundant robotic arms.",
        icon: <Trophy className="w-8 h-8 text-yellow-500" />,
        position: "top",
    },
    {
        date: "NOV 2023",
        title: "gradCapital Fellowship",
        description: "Received the gradCapital Atomic Fellowship ($5,000) to initiate early-stage hardware development.",
        icon: <DollarSign className="w-8 h-8 text-yellow-500" />,
        position: "bottom",
    },
    {
        date: "JAN 2024",
        title: "Company Incorporation",
        description: "Armatrix Automations Pvt. Ltd. officially incorporated, marking the transition from research to commercial entity.",
        icon: <Building2 className="w-8 h-8 text-yellow-500" />,
        position: "top",
    },
    {
        date: "JUN 2024",
        title: "Strategic Funding",
        description: "Secured funding from gradCapital Venture Capital to accelerate R&D and team expansion.",
        icon: <DollarSign className="w-8 h-8 text-yellow-500" />,
        position: "bottom",
    },
    {
        date: "NOV 2024",
        title: "Prototype Alpha",
        description: "Successfully tested the first functional prototype in a simulated high-radiation environment.",
        icon: <Rocket className="w-8 h-8 text-yellow-500" />,
        position: "top",
    },
    {
        date: "MARCH 2025",
        title: "Aerospace Partnership",
        description: "Signed MoUs with major aerospace parts manufacturers for on-site inspection automation beta trials.",
        icon: <Building2 className="w-8 h-8 text-yellow-500" />,
        position: "bottom",
    },
    {
        date: "JUNE 2025",
        title: "Series A Round",
        description: "Expanding production capacity and establishing global service hubs for specialized robotics maintenance.",
        icon: <Zap className="w-8 h-8 text-yellow-500" />,
        position: "top",
    },
    {
        date: "OCT 2025",
        title: "Nuclear Facility Deployment",
        description: "First full-scale deployment of Armatrix arms in a decommissioned nuclear reactor for structural analysis.",
        icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
        position: "bottom",
    },
    {
        date: "NOV 2025",
        title: "Global Market Entry",
        description: "Scale-up for international shipments to APAC and EU regions, establishing Armatrix as the industry standard.",
        icon: <Globe className="w-8 h-8 text-yellow-500" />,
        position: "top",
    },
];



const Journey = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { setIsLightMode } = useTheme();
    const isLight = useRef(false);

    const goLight = () => {
        if (isLight.current) return;

        isLight.current = true;
        setIsLightMode(true);

        gsap.to(".main-container", {
            backgroundColor: "#ffffff",
            color: "#000000",
            duration: 0.8,
            ease: "power2.inOut",
        });
    };

    const goDark = () => {
        if (!isLight.current) return;

        isLight.current = false;
        setIsLightMode(false);

        gsap.to(".main-container", {
            backgroundColor: "#000000",
            color: "#ffffff",
            duration: 0.8,
            ease: "power2.inOut",
        });
    };

    useGSAP(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const totalScroll = wrapper.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(wrapper, {
            x: () => -totalScroll,
            ease: "none",
        });

        ScrollTrigger.create({
            animation: scrollTween,
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 0.1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onEnter: () => {
                gsap.to(wrapper, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" });
            },
            onLeaveBack: () => {
                gsap.to(wrapper, { scale: 0.90, duration: 0.8, ease: "power2.in" });
            },

            onUpdate: (self) => {
                // Smooth fade out at the very end
                if (self.progress > 0.05) {
                    gsap.to(wrapper, { opacity: 1, ease: "none", duration: 0.1 });
                }

                if (self.progress >= 0.9999999999) {
                    goLight();
                } else {
                    goDark();
                }
            }
        });
        ScrollTrigger.config({
            ignoreMobileResize: true
        });

        // Progress bar
        gsap.to(".journey-progress", {
            width: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${totalScroll}`,
                scrub: true,
            },
        });

    }, { scope: sectionRef });

    return (
        <section
            id="journey"
            ref={sectionRef}
            className="journey relative h-screen z-10 overflow-hidden flex items-center w-full mx-auto"
        >
            <div className="absolute top-16 inset-x-0 z-20">
                <div className="md:w-4/5 mx-auto max-w-7xl px-4 md:px-0">
                    <div className="flex items-center gap-4 cursor-default">
                        <span className="text-white/95 font-bold opacity-30 select-none tracking-tighter arrow-span">
                            <MoveRight />
                        </span>
                        <span className="font-mono text-xs tracking-[0.4em] uppercase">
                            OUR JOURNEY
                        </span>
                    </div>
                    {/* <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tighter">Milestones</h2> */}
                </div>
            </div>
            <div
                ref={wrapperRef}
                className="journey-wrapper relative flex items-center h-full min-w-max px-8 md:px-[20vw]"
            >
                {/* Simplified Straight Timeline Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 z-0">
                    {/* Progress Overlay */}
                    <div className="journey-progress absolute top-0 left-0 h-full w-0 bg-yellow-500/60 shadow-[0_0_20px_rgba(234,179,8,0.4)]" />
                </div>

                {/* Milestone Items */}
                <div className="relative flex items-center gap-20 md:gap-40">
                    {milestones.map((ms, i) => (
                        <div key={i} className="shrink-0">
                            <JourneyCard ms={ms} index={i} />
                        </div>
                    ))}

                    {/* Spacer for end scroll */}
                    {/* <div className="w-[5vw] shrink-0" /> */}
                </div>
            </div>
        </section>
    );
};

export default Journey;
