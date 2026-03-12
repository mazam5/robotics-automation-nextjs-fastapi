import { CardData } from "@/lib/types";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";
import React, { useRef } from "react";
import UseCaseCard from "./cards/UseCaseCard";

gsap.registerPlugin(ScrollTrigger);


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