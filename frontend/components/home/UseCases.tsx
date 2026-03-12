import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface CardData {
    index: string;
    title: string;
    video: string;
    accentColor: string;
    overlayColor: string;
}

const cards: CardData[] = [
    {
        index: "/001",
        title: "Inspection",
        video: "/videos/use-case-1.mp4",
        accentColor: "text-blue-400",
        overlayColor: "bg-blue-900/20",
    },
    {
        index: "/002",
        title: "Painting",
        video: "/videos/use-case-2.mp4",
        accentColor: "text-purple-400",
        overlayColor: "bg-purple-900/20",
    },
    {
        index: "/003",
        title: "Welding",
        video: "/videos/use-case-3.mp4",
        accentColor: "text-orange-400",
        overlayColor: "bg-orange-900/20",
    },
];

const CARD_HEIGHT_VH = 72;
const CARD_GAP_PX = 20;

// ─────────────────────────────────────────────────────────────────────────────
// Hook: returns true when window width ≥ breakpoint (default 768px / "md")
// ─────────────────────────────────────────────────────────────────────────────
function useIsDesktop(breakpoint = 768) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        setIsDesktop(mql.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, [breakpoint]);

    return isDesktop;
}

// ─────────────────────────────────────────────────────────────────────────────
// UseCaseCard
// ─────────────────────────────────────────────────────────────────────────────
interface UseCaseCardProps extends CardData {
    stackIndex: number;
    total: number;
    cardHeightVh: number;
    cardGapPx: number;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({
    index,
    title,
    video,
    accentColor,
    overlayColor,
    stackIndex,
    cardHeightVh,
    cardGapPx,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isDesktop = useIsDesktop();

    const handleMouseEnter = () => {
        gsap.to(videoRef.current, { scale: 1.05, duration: 1.5, ease: "power2.out" });
        gsap.to(contentRef.current, { x: 10, duration: 0.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        gsap.to(videoRef.current, { scale: 1, duration: 1.5, ease: "power2.inOut" });
        gsap.to(contentRef.current, { x: 0, duration: 0.5, ease: "power2.inOut" });
    };

    /*
     * Inline styles are split by breakpoint so mobile styles never get
     * clobbered by the desktop object (Tailwind can't toggle inline styles).
     *
     * Desktop: absolute positioning inside the 100 vh stage — GSAP takes over.
     * Mobile:  natural flow with a clamped height.
     */
    const cardStyle: React.CSSProperties = isDesktop
        ? {
            position: "absolute",
            height: `${cardHeightVh}vh`,
            top: `calc(50vh - ${cardHeightVh / 2}vh + ${stackIndex === 0 ? 0 : cardGapPx}px)`,
            left: 0,
            right: 0,
            zIndex: stackIndex + 1,
        }
        : {
            position: "relative",
            // Tall on phones/tablets without exceeding the viewport
            height: "clamp(280px, 60vw, 440px)",
        };

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="
                stacked-card
                overflow-hidden
                rounded-[1.75rem] sm:rounded-[2.25rem] md:rounded-[3rem]
                bg-zinc-950
                border border-white/10
                shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]
                flex flex-col
                mb-4 sm:mb-6 md:mb-0
            "
            style={cardStyle}
        >
            {/* ── Background video ── */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    className="
                        absolute inset-0 w-full h-full object-cover
                        brightness-50 grayscale hover:grayscale-0
                        transition-[filter] duration-1000
                    "
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={video} type="video/mp4" />
                </video>

                <div className={`absolute inset-0 ${overlayColor} mix-blend-overlay opacity-50`} />

                {/* Slightly denser vignette on mobile for legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-transparent md:via-black/40" />
            </div>

            {/* ── Content ── */}
            <div
                ref={contentRef}
                className="
                    relative z-10 mt-auto
                    p-5 sm:p-7 md:p-10 lg:p-12
                    w-full flex justify-between items-end
                "
            >
                <div>
                    <span
                        className={`
                            ${accentColor}
                            text-sm sm:text-base md:text-xl lg:text-2xl
                            tracking-widest mb-2 sm:mb-3
                            block font-mono
                        `}
                    >
                        {index}
                    </span>

                    <h3
                        className="
                            font-bold tracking-tighter text-white leading-none
                            text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl
                        "
                    >
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// UseCases (parent)
// ─────────────────────────────────────────────────────────────────────────────
const UseCases: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const cardEls = gsap.utils.toArray<HTMLElement>(".stacked-card");
            const snapSteps = cardEls.length - 1;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${snapSteps * 100}%`,
                    scrub: 0.6,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: 1 / snapSteps,
                        duration: { min: 0.3, max: 0.6 },
                        ease: "power2.inOut",
                        delay: 0.05,
                    },
                },
            });

            cardEls.forEach((card, i) => {
                if (i === 0) return;
                const prev = cardEls[i - 1];

                tl.fromTo(
                    card,
                    { yPercent: 105 },
                    { yPercent: 0, ease: "none", duration: 1 },
                    i - 1
                );

                tl.to(
                    prev,
                    { scale: 0.88, opacity: 0.35, filter: "blur(5px)", ease: "none", duration: 1 },
                    i - 1
                );
            });
        });

        mm.add("(max-width: 767px)", () => {
            gsap.utils.toArray<HTMLElement>(".stacked-card").forEach((card) => {
                gsap.fromTo(
                    card,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            id="use-cases"
            className="
                cards-section relative z-10 bg-black
                w-full md:w-4/5 mx-auto
                overflow-visible
            "
        >
            {/* ── Section label ── */}
            <div className="max-w-7xl mx-auto w-full px-4 md:px-0">
                <div className="flex items-center gap-3 sm:gap-4 cursor-default mt-6 md:mt-10">
                    <span className="text-white/95 font-bold opacity-30 select-none tracking-tighter">
                        <MoveRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.4em] uppercase">
                        Use Cases
                    </span>
                </div>
            </div>

            {/*
             * Stage: full-viewport height on desktop so the pin + scrub works.
             * On mobile, height is auto — cards flow and each has its own height.
             */}
            <div className="cards-stage relative w-full h-auto md:h-screen overflow-hidden">
                <div
                    className="
                        relative
                        flex flex-col
                        gap-4 sm:gap-6 md:gap-0
                        px-4 sm:px-6 py-8 sm:py-10 md:py-0
                        md:mx-20 lg:mx-24
                        md:h-screen md:flex md:items-center md:justify-center
                    "
                >
                    {cards.map((card, i) => (
                        <UseCaseCard
                            key={card.index}
                            {...card}
                            stackIndex={i}
                            total={cards.length}
                            cardHeightVh={CARD_HEIGHT_VH}
                            cardGapPx={CARD_GAP_PX}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UseCases;