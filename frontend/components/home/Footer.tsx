"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%",
                },
            }
        );
    });

    const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, { color: "#2563eb", x: 5, duration: 0.3 });
    };

    const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, { color: "currentColor", x: 0, duration: 0.3 });
    };

    return (
        <footer
            ref={footerRef}
            className="border-t border-current/10 bg-transparent
                       py-8 sm:py-10
                       px-4 sm:px-8 md:px-16 lg:px-24
                       transition-colors duration-1000"
        >
            <div ref={contentRef} className="max-w-7xl mx-auto opacity-0">

                {/* ── Top: Logo + Link columns ── */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10">

                    {/* Brand blurb — full width on mobile, 2-col span on md+ */}
                    <div className="col-span-2 md:col-span-2">
                        <Image
                            src="https://armatrix.in/assets/images/logo/registered_logo.png"
                            alt="Armatrix Logo"
                            width={120}
                            height={120}
                            className="mb-6 sm:mb-8 transition-all invert dark:invert-0 w-24 sm:w-32 md:w-36 h-auto"
                        />
                        <p className="text-sm sm:text-base lg:text-lg max-w-xs sm:max-w-sm leading-relaxed opacity-50">
                            Building the future of hyper-redundant robotics for the world's most challenging environments.
                        </p>
                    </div>

                    {/* Company links */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <h4 className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-2 sm:mb-4 opacity-40">
                            Company
                        </h4>
                        {["Media Kit", "Privacy Policy", "Terms of Service"].map((link) => (
                            <Link
                                key={link}
                                href="#"
                                onMouseEnter={handleLinkHover}
                                onMouseLeave={handleLinkLeave}
                                className="opacity-40 text-xs sm:text-sm tracking-wide transition-all no-underline hover:opacity-100"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>

                    {/* Social links */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <h4 className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-2 sm:mb-4 opacity-40">
                            Social
                        </h4>
                        {["LinkedIn", "Twitter", "Instagram"].map((link) => (
                            <Link
                                key={link}
                                href="#"
                                onMouseEnter={handleLinkHover}
                                onMouseLeave={handleLinkLeave}
                                className="opacity-40 text-xs sm:text-sm tracking-wide transition-all no-underline hover:opacity-100"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ── Separator ── */}
                <div className="w-full h-px bg-current opacity-10 mb-6 sm:mb-8 md:mb-10" />

                {/* ── Bottom bar ── */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                    <div className="text-xs sm:text-sm font-light opacity-40 flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 border border-current/30 rounded-full text-[9px] sm:text-[10px]">
                            ©
                        </span>
                        Armatrix 2026 All Rights Reserved
                    </div>
                    <div className="font-mono text-[9px] sm:text-xs uppercase tracking-widest opacity-30 text-left sm:text-right">
                        Products under development, currently not for sale
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;