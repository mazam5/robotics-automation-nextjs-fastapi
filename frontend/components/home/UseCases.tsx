import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";
import React, { useRef } from "react";

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

// Card dimensions — tweak these two values to taste
const CARD_HEIGHT_VH = 72;   // card height as % of viewport
const CARD_GAP_PX = 20;    // visible gap between stacked cards (px)

const UseCases: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const cardEls = gsap.utils.toArray<HTMLElement>(".stacked-card");

            // Total scroll distance: one "snap" step per card transition
            const snapSteps = cardEls.length - 1;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${snapSteps * 100}%`,
                    scrub: 0.6,          // slightly smoothed for snap feel
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: 1 / snapSteps,   // snap to each card boundary
                        duration: { min: 0.3, max: 0.6 },
                        ease: "power2.inOut",
                        delay: 0.05,
                    },
                },
            });

            cardEls.forEach((card, index) => {
                if (index === 0) return;

                const prevCard = cardEls[index - 1];

                // Slide new card up from below (accounting for gap offset)
                tl.fromTo(
                    card,
                    { yPercent: 105 },          // slightly more than 100 so gap is visible
                    { yPercent: 0, ease: "none", duration: 1 },
                    index - 1
                );

                // Push previous card back + fade
                tl.to(
                    prevCard,
                    {
                        scale: 0.88,
                        opacity: 0.35,
                        filter: "blur(5px)",
                        ease: "none",
                        duration: 1,
                    },
                    index - 1
                );
            });
        });

        mm.add("(max-width: 767px)", () => {
            const cardEls = gsap.utils.toArray(".stacked-card");

            cardEls.forEach((card: any) => {
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
            className="cards-section md:w-4/5 mx-auto relative bg-black z-10 w-full overflow-visible md:overflow-visible"
        >
            <div className="max-w-7xl mx-auto w-full px-4 md:px-0">
                {/* Mobile heading */}
                <div className="relative z-10 text-center pt-20 pb-6 md:hidden">
                    <span className="text-white/95 font-mono text-sm tracking-[0.3em] uppercase">
                        Use Cases
                    </span>
                </div>
                <div className="flex items-center gap-4 cursor-default mt-4 md:mt-10">
                    <span className="text-white/95 font-bold opacity-30 select-none tracking-tighter arrow-span">
                        <MoveRight />
                    </span>
                    <span className="font-mono text-xs tracking-[0.4em] uppercase">
                        Use Cases
                    </span>
                </div>
            </div>

            {/*
              * The stage is full-viewport-height so the pin works correctly.
              * Inside it, cards are centered vertically using flexbox.
              */}
            <div className="cards-stage relative w-full h-auto md:h-screen overflow-hidden">
                <div
                    className="
                        relative
                        flex flex-col gap-8 px-4 py-12
                        md:flex md:items-center md:justify-center
                        md:mx-20 lg:mx-24
                        md:h-screen
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

    const handleMouseEnter = () => {
        gsap.to(videoRef.current, { scale: 1.05, duration: 1.5, ease: "power2.out" });
        gsap.to(contentRef.current, { x: 10, duration: 0.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        gsap.to(videoRef.current, { scale: 1, duration: 1.5, ease: "power2.inOut" });
        gsap.to(contentRef.current, { x: 0, duration: 0.5, ease: "power2.inOut" });
    };

    /*
     * Desktop layout: cards are absolutely positioned, centred in the stage.
     * We leave a small top offset so the edge of the card below peeks out
     * (the "gap" illusion) before GSAP slides it fully into view.
     *
     * On mobile the cards just stack naturally in the flex column.
     */
    const desktopStyles: React.CSSProperties = {
        // Height is a fraction of the viewport
        height: `${cardHeightVh}vh`,
        // Vertically centre the card in the 100vh stage
        top: `calc(50vh - ${cardHeightVh / 2}vh + ${stackIndex === 0 ? 0 : cardGapPx}px)`,
        left: 0,
        right: 0,
        zIndex: stackIndex + 1,
    };

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="
                stacked-card
                relative overflow-hidden
                rounded-[2.5rem] md:rounded-[3rem]
                bg-zinc-950
                border border-white/10
                shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]
                flex flex-col
                mb-10 md:mb-0
                md:absolute
            "
            style={desktopStyles}
        >
            {/* Background video */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover brightness-50 grayscale hover:grayscale-0 transition-[filter] duration-1000"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={video} type="video/mp4" />
                </video>
                <div className={`absolute inset-0 ${overlayColor} mix-blend-overlay opacity-50`} />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div
                ref={contentRef}
                className="relative z-10 mt-auto p-6 md:p-10 lg:p-12 w-full flex justify-between items-end"
            >
                <div>
                    <span className={`${accentColor} text-xl md:text-2xl tracking-widest mb-3 block`}>
                        {index}
                    </span>
                    <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};