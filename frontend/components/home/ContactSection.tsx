"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, SquareArrowOutUpRight } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const items = containerRef.current?.querySelectorAll(".contact-animate");

        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        if (items?.length) {
            gsap.fromTo(
                items,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.12,
                    duration: 0.9,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, { scope: containerRef });

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-1000 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-32 items-start md:items-center">

                    {/* ── Left column ── */}
                    <div>
                        {/* Label */}
                        <div className="contact-animate flex items-center gap-3 sm:gap-4 cursor-default mb-4 sm:mb-6">
                            <span className="text-black/95 font-bold opacity-30 select-none tracking-tighter">
                                <MoveRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </span>
                            <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.4em] uppercase">
                                Contact
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="contact-animate text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-10 md:mb-12 tracking-tighter leading-none transition-colors duration-700">
                            Get In <br />
                            <span className="opacity-50">Touch</span>
                        </h2>

                        {/* Info blocks */}
                        <div className="space-y-8 sm:space-y-10 md:space-y-12">

                            {/* Email */}
                            <div className="contact-animate">
                                <h3 className="opacity-40 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-4">
                                    Email Us
                                </h3>
                                <a
                                    href="mailto:contact@armatrix.in"
                                    className="
                                        text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
                                        font-light hover:text-blue-600 transition-colors
                                        underline decoration-current/20 underline-offset-8
                                        break-all leading-tight
                                    "
                                >
                                    contact@armatrix.in
                                </a>
                            </div>

                            {/* Address */}
                            <div className="contact-animate">
                                <h3 className="opacity-40 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-4">
                                    Visit Us
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xs sm:max-w-sm opacity-70">
                                    4th Floor, 444 Jai Tower<br />
                                    Sri Balaji Krupa Layout, RK Hegde Nagar<br />
                                    Bengaluru – 560077
                                </p>
                            </div>

                            {/* Map CTA */}
                            <div className="contact-animate">
                                <a
                                    href="https://maps.app.goo.gl/rrSmTCiuJjS2ZrEm7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        inline-flex items-center gap-2
                                        px-6 sm:px-8 py-3 sm:py-4
                                        text-sm sm:text-base
                                        rounded-full border border-current
                                        opacity-70 hover:opacity-100
                                        hover:bg-current/10
                                        transition-all group
                                    "
                                >
                                    View on Map
                                    <SquareArrowOutUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ── Right column (placeholder / future form slot) ── */}
                    {/* Uncomment and fill in when a form or map embed is ready */}
                    {/* <div className="hidden md:block"> ... </div> */}
                </div>
            </div>
        </section>
    );
}