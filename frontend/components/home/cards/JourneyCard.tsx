import { Milestone } from '@/lib/types';
import { gsap } from 'gsap';
import { useRef } from 'react';
const JourneyCard = ({ ms, index }: { ms: Milestone; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    const handleHover = () => {
        gsap.to(cardRef.current, {
            borderColor: "rgba(234, 179, 8, 0.4)",
            y: ms.position === "top" ? -15 : 15,
            scale: 1.02,
            duration: 0.6,
            ease: "power2.out",
        });
        gsap.to(glowRef.current, {
            opacity: 0.3,
            scale: 1.4,
            duration: 1,
            ease: "power2.out",
        });
        gsap.to(iconRef.current, {
            scale: 1.15,
            rotate: 8,
            duration: 0.4,
            ease: "power2.out",
        });
        gsap.to(titleRef.current, {
            color: "#EAB308",
            duration: 0.4,
        });
        gsap.to(indicatorRef.current, {
            backgroundColor: "#EAB308",
            opacity: 1,
            scaleY: 1.2,
            duration: 0.4,
        });
    };

    const handleLeave = () => {
        gsap.to(cardRef.current, {
            borderColor: "rgba(234, 179, 8, 0.1)",
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.inOut",
        });
        gsap.to(glowRef.current, {
            opacity: 0.1,
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
        });
        gsap.to(iconRef.current, {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: "power2.inOut",
        });
        gsap.to(titleRef.current, {
            color: "#ffffff",
            duration: 0.4,
        });
        gsap.to(indicatorRef.current, {
            backgroundColor: "rgba(234, 179, 8, 0.2)",
            opacity: 0.5,
            scaleY: 1,
            duration: 0.4,
        });
    };

    return (
        <div
            className={`relative journey-item flex flex-col items-center shrink-0 w-[18rem] md:w-[24rem] ${ms.position === "top" ? "mb-40 md:mb-72" : "mt-40 md:mt-72"
                }`}
        >
            {/* Simple Vertical Indicator */}
            <div
                ref={indicatorRef}
                className={`absolute w-0.5 bg-yellow-500/20 left-1/2 -translate-x-1/2 ${ms.position === "top" ? "top-full" : "bottom-full"
                    } h-10 origin-${ms.position === 'top' ? 'top' : 'bottom'} transition-none`}
            />

            <div
                ref={cardRef}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                className="journey-card w-full p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-950 border border-yellow-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col cursor-default group"
            >
                <div ref={glowRef} className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-[80px] opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-6 z-10">
                    <div className="text-yellow-500/40 font-mono text-sm tracking-widest font-bold group-hover:text-yellow-500/80 transition-colors">
                        {ms.date}
                    </div>
                    <div ref={iconRef} className="p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/20 group-hover:border-yellow-500/40 transition-colors">
                        {ms.icon}
                    </div>
                </div>

                <h4 ref={titleRef} className="text-white text-lg md:text-xl font-bold mb-3 tracking-tight z-10 transition-colors">
                    {ms.title}
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed font-light z-10 group-hover:text-zinc-400 transition-colors">
                    {ms.description}
                </p>
            </div>
        </div>
    );
};
export default JourneyCard
