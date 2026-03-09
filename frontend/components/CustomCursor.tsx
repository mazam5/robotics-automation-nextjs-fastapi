"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
    const pathname = usePathname();

    // Create array for trail elements
    const trailCount = 12;

    useEffect(() => {
        if (typeof window === "undefined" || !cursorRef.current || !dotRef.current) return;

        // Quick setters for performance
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power2.out" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power2.out" });

        const dotXTo = gsap.quickTo(dotRef.current, "x", { duration: 0.05, ease: "power3" });
        const dotYTo = gsap.quickTo(dotRef.current, "y", { duration: 0.05, ease: "power3" });

        // Arrays to store trailing tweens
        const trailSetters = trailRefs.current.map((trail, index) => {
            if (!trail) return null;
            // Stagger the duration slightly for each trailing element to create a liquid/water wave effect
            return {
                el: trail,
                xTo: gsap.quickTo(trail, "x", { duration: 0.1 + index * 0.05, ease: "power2.out" }),
                yTo: gsap.quickTo(trail, "y", { duration: 0.1 + index * 0.05, ease: "power2.out" })
            };
        });

        const onMouseMove = (e: MouseEvent) => {
            // Center the cursors
            xTo(e.clientX);
            yTo(e.clientY);
            dotXTo(e.clientX);
            dotYTo(e.clientY);

            // Animate the water/liquid trails
            trailSetters.forEach((setter, i) => {
                if (!setter) return;
                setter.xTo(e.clientX);
                setter.yTo(e.clientY);

                // Add a slight scale pop effect on fast movement to simulate ripples
                const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
                if (speed > 10) {
                    gsap.to(setter.el, {
                        scale: 1 + (speed * 0.01),
                        opacity: Math.max(0.1, 0.4 - (i * 0.03)),
                        duration: 0.2,
                        onComplete: () => {
                            gsap.to(setter.el, { scale: 1 - (i * 0.05), opacity: 0.1, duration: 0.5 });
                        }
                    });
                }
            });
        };


        // Make cursor visible on first move
        gsap.set([cursorRef.current, dotRef.current, ...trailRefs.current], { opacity: 0 });
        const showCursor = () => {
            gsap.to([cursorRef.current, dotRef.current], { opacity: 1, duration: 0.3 });
            window.removeEventListener('mousemove', showCursor);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousemove", showCursor);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousemove", showCursor);
        };
    }, [pathname]);

    useEffect(() => {
        if (isHovering) {
            gsap.to(cursorRef.current, { scale: 3, backgroundColor: "rgba(255,255,255,1)", mixBlendMode: 'difference', duration: 0.3 });
            gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
            gsap.to(trailRefs.current, { opacity: 0, duration: 0.2 });
        } else {
            gsap.to(cursorRef.current, { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.05)", mixBlendMode: 'normal', duration: 0.3 });
            gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
            gsap.to(trailRefs.current, { opacity: (i) => 0.1 - (i * 0.008), duration: 0.2 });
        }
    }, [isHovering]);

    return (
        <div className="hidden md:block">
            {/* Liquid trails (CSS blob/gooey effect can be applied via SVG filter) */}
            <svg className="hidden">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            <div className="fixed inset-0 pointer-events-none z-9999 filter-[url(#goo)]">
                {/* The Trail Elements mimicking water droplets */}
                {Array.from({ length: trailCount }).map((_, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            trailRefs.current[i] = el;
                        }}
                        className="absolute top-0 left-0 w-8 h-8 rounded-full bg-white/10 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                        style={{
                            scale: 1 - (i * 0.05),
                            opacity: 0.2 - (i * 0.015),
                            zIndex: 9998 - i
                        }}
                    />
                ))}

                {/* Main Outer Cursor Ring */}
                <div
                    ref={cursorRef}
                    className="absolute top-0 left-0 w-12 h-12 border border-white/20 rounded-full pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10000 backdrop-blur-[1px]"
                >
                    {isHovering && (
                        <ArrowUpRight className="w-4 h-4 text-black opacity-100 transition-opacity duration-300 pointer-events-none" />
                    )}
                </div>

                {/* Inner Dot */}
                <div
                    ref={dotRef}
                    className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-10001"
                />
            </div>
        </div>
    );
}
