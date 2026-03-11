"use client";

import { useTheme } from "@/lib/ThemeContext";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Navbar() {
    const { isLightMode } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isMobileMenuOpen) {
            gsap.to(menuRef.current, {
                x: 0,
                duration: 0.5,
                ease: "power3.out",
            });
        } else {
            gsap.to(menuRef.current, {
                x: "100%",
                duration: 0.5,
                ease: "power3.in",
            });
        }
    }, [isMobileMenuOpen]);

    const handleLinkMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, {
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleLinkMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.in",
        });
    };

    const navLinks = [
        { name: "Use Cases", href: "#use-cases" },
        { name: "Team", href: "#team" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            ref={navRef}
            className={cn(
                "absolute top-0 left-0 right-0 z-100 py-3 md:py-5 my-6 md:my-8 lg:my-12 xl:my-16 w-[92%] md:w-4/5 mx-auto",
                isLightMode ? "text-black" : "text-white"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <Image
                        src={isLightMode
                            ? "https://armatrix.in/assets/images/logo/registered_logo.png"
                            : "https://armatrix.in/assets/images/logo/Logo_2_white.webp"
                        }
                        alt="Logo"
                        width={isLightMode ? 120 : 100}
                        height={isLightMode ? 120 : 100}
                        className="transition-all duration-700 w-[100px] md:w-[140px] h-auto"
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onMouseEnter={handleLinkMouseEnter}
                            onMouseLeave={handleLinkMouseLeave}
                            className={cn(
                                "text-xl font-medium uppercase transition-colors duration-700 hover:underline underline-offset-8",
                                isLightMode ? "text-zinc-600 hover:text-black" : "text-zinc-400 hover:text-white"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 transition-colors duration-700"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={isLightMode ? "text-black" : "text-white"} />
                    ) : (
                        <Menu className={isLightMode ? "text-black" : "text-white"} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={cn(
                    "fixed inset-0 top-30 z-90 md:hidden translate-x-full",
                    isLightMode ? "bg-white" : "bg-zinc-950"
                )}
            >
                <div className="flex flex-col items-center justify-center h-full gap-12 text-2xl font-bold">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={isLightMode ? "text-black" : "text-white"}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
