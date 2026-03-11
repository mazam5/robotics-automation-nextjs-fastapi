"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

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
            className="border-t border-current/10 bg-transparent py-20 px-8 md:px-24 transition-colors duration-1000"
        >
            <div ref={contentRef} className="max-w-7xl mx-auto opacity-0">
                {/* Top: Logo + Links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <Image
                            src="https://armatrix.in/assets/images/logo/registered_logo.png"
                            alt="Logo"
                            width={140}
                            height={140}
                            className="mb-8 transition-all invert dark:invert-0"
                        />
                        <p className="text-lg max-w-sm leading-relaxed opacity-50">
                            Building the future of hyper-redundant robotics for the world's most challenging environments.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-mono text-xs uppercase tracking-[0.3em] mb-4 opacity-40">
                            Company
                        </h4>
                        {["Media Kit", "Privacy Policy", "Terms of Service"].map((link) => (
                            <Link
                                key={link}
                                href="#"
                                onMouseEnter={handleLinkHover}
                                onMouseLeave={handleLinkLeave}
                                className="opacity-40 text-sm tracking-wide transition-all no-underline hover:opacity-100"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-mono text-xs uppercase tracking-[0.3em] mb-4 opacity-40">
                            Social
                        </h4>
                        {["LinkedIn", "Twitter", "Instagram"].map((link) => (
                            <Link
                                key={link}
                                href="#"
                                onMouseEnter={handleLinkHover}
                                onMouseLeave={handleLinkLeave}
                                className="opacity-40 text-sm tracking-wide transition-all no-underline hover:opacity-100"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-current opacity-10 mb-10" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm font-light opacity-40 flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 border border-current/30 rounded-full text-[10px]">
                            ©
                        </span>
                        Armatrix 2026 All Rights Reserved
                    </div>
                    <div className="font-mono text-xs uppercase tracking-widest opacity-30">
                        Products under development, currently not for sale
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;