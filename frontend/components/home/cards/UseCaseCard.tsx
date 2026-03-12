import { CardData } from "@/lib/types";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
// Hook: returns true when window width ≥ breakpoint (default 768px / "md")
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

export default UseCaseCard;