"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MoveRight, SquareArrowOutUpRight } from "lucide-react";
import { useRef } from "react";

export default function ContactSection() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
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
    }, { scope: containerRef });

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative md:py-16 px-4 transition-colors duration-1000 overflow-hidden"
        >

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
                    <div>
                        <div className="flex items-center gap-4 cursor-default mb-4">
                            <span className="text-black/95 font-bold opacity-30 select-none tracking-tighter arrow-span">
                                <MoveRight />
                            </span>
                            <span className="font-mono text-xs tracking-[0.4em] uppercase">
                                Contact
                            </span>
                        </div>

                        <h2 className="text-6xl md:text-9xl font-bold mb-12 tracking-tighter leading-none transition-colors duration-700">
                            Get In <br />
                            <span className="opacity-50">Touch</span>
                        </h2>

                        <div className="space-y-12">
                            <div>
                                <h3 className="opacity-40 font-mono text-xs uppercase tracking-widest mb-4">
                                    Email Us
                                </h3>
                                <a
                                    href="mailto:contact@armatrix.in"
                                    className="text-3xl md:text-5xl font-light hover:text-blue-600 transition-colors underline decoration-current/20 underline-offset-8"
                                >
                                    contact@armatrix.in
                                </a>
                            </div>

                            <div>
                                <h3 className="opacity-40 font-mono text-xs uppercase tracking-widest mb-4">
                                    Visit Us
                                </h3>
                                <p className="text-xl md:text-2xl font-light leading-relaxed text-wrap max-w-md opacity-70">
                                    4th Floor, 444 Jai Tower
                                    Sri Balaji Krupa Layout, RK Hegde Nagar
                                    Bengaluru - 560077
                                </p>
                            </div>

                            <div className="pt-4">
                                <a
                                    href="https://maps.app.goo.gl/rrSmTCiuJjS2ZrEm7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        inline-flex items-center gap-2
                                        px-8 py-4 rounded-full
                                        border border-current
                                        opacity-70 hover:opacity-100
                                        hover:bg-current/10
                                        transition-all group
                                    "
                                >
                                    View on Map
                                    <SquareArrowOutUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}