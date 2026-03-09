"use client";

import { Github, Linkedin, Twitter, Waves } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative py-20 px-4 bg-zinc-50 border-t border-zinc-200 transition-colors duration-1000">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <Waves className="w-8 h-8 text-blue-600" />
                            <span className="text-2xl font-bold tracking-tighter text-black">ARMATRIX</span>
                        </div>
                        <p className="text-zinc-500 leading-relaxed mb-6">
                            Engineering the next generation of robotic solutions for the world's most challenging environments.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                <Github className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-black mb-6 uppercase tracking-widest text-sm font-mono">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link href="/team" className="text-zinc-500 hover:text-blue-600 transition-colors">Career</Link></li>
                            <li><Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">Press Kit</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-black mb-6 uppercase tracking-widest text-sm font-mono">Technology</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">Robotic Arms</Link></li>
                            <li><Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">AI Perception</Link></li>
                            <li><Link href="#" className="text-zinc-500 hover:text-blue-600 transition-colors">Hazard Systems</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-black mb-6 uppercase tracking-widest text-sm font-mono">Newsletter</h4>
                        <p className="text-zinc-500 mb-6 text-sm">Stay updated with our latest breakthroughs.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 px-4 py-3 rounded-xl bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-black text-sm transition-all"
                            />
                            <button className="px-5 py-3 rounded-xl bg-black text-white font-bold text-sm hover:bg-zinc-800 transition-all">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-400 text-sm">
                        © {new Date().getFullYear()} Armatrix Robotics Inc. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-zinc-400">
                        <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
