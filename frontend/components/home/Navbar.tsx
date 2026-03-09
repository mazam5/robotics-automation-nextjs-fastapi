"use client";

import { useTheme } from "@/lib/ThemeContext";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { isLightMode } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Team", href: "/team" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <nav
            className={cn(
                "absolute top-0 left-0 right-0 z-100 px-6 py-4 my-16 w-3/4 mx-auto",
                isLightMode ? "text-black" : "text-white"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <Image src="https://armatrix.in/assets/images/logo/Logo_2_white.webp" alt="Logo" width={120} height={120} />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-xl font-medium transition-all hover:underline uppercase hover:opacity-70",
                                isLightMode ? "text-zinc-600 hover:text-black" : "text-zinc-400 hover:text-white"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
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
                className={cn(
                    "fixed inset-0 top-[72px] z-90 transition-transform duration-500 md:hidden",
                    isLightMode ? "bg-white" : "bg-zinc-950",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
