"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" className="relative py-24 md:py-40 px-4 transition-colors duration-1000">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                    <div>
                        <span className="text-blue-600 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">Get In Touch</span>
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-black">
                            Let's build the future together.
                        </h2>
                        <p className="text-xl text-zinc-600 mb-12 max-w-lg leading-relaxed">
                            Whether you have a specific inquiry or just want to learn more about our technology, our team is ready to connect.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-zinc-900">
                                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-mono text-zinc-500 uppercase">Email</p>
                                    <p className="text-lg font-semibold">hello@armatrix.io</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-zinc-900">
                                <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-mono text-zinc-500 uppercase">HQ</p>
                                    <p className="text-lg font-semibold">Silicon Valley, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border border-zinc-100">
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-zinc-900 transition-all font-sans"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-zinc-900 transition-all font-sans"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 ml-1">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us about your project..."
                                    className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-zinc-900 transition-all font-sans resize-none"
                                />
                            </div>
                            <Button className="w-full rounded-2xl py-8 text-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300">
                                Send Message <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
